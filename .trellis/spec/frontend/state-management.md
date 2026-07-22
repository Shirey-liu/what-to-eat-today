# State Management

> 本项目状态管理规范 —— Pinia Setup Store。

---

## 技术选型

- **Pinia** (`^2.1.7`)：Vue 官方推荐的状态管理库。
- **Setup Store 风格**：使用 Composition API 风格编写 Store，而非 Options Store。

---

## Store 结构

```ts
// src/stores/appStore.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Vegetable, Theme, Recipe, HistoryItem } from '@/types'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { matchRecipes } from '@/utils/recipeMatcher'

const STORAGE_KEYS = {
  selected: 'veggie-blind-box:selected',
  history: 'veggie-blind-box:history',
  favorites: 'veggie-blind-box:favorites',
}

export const useAppStore = defineStore('app', () => {
  // State (ref)
  const selectedVegetables = useLocalStorage<Vegetable[]>(STORAGE_KEYS.selected, [])
  const history = useLocalStorage<HistoryItem[]>(STORAGE_KEYS.history, [])
  const favorites = useLocalStorage<string[]>(STORAGE_KEYS.favorites, [])
  const currentTheme = ref<Theme | null>(null)
  const currentRecipe = ref<Recipe | null>(null)

  // Getter (computed)
  const hasSelectedVegetables = computed(() => selectedVegetables.value.length > 0)

  // Actions (functions)
  function addVegetable(vegetable: Vegetable) { /* ... */ }
  function removeVegetable(id: string) { /* ... */ }
  function generateRecipe(excludeId?: string) { /* ... */ }
  // ...

  return {
    selectedVegetables, history, favorites, currentTheme, currentRecipe,
    hasSelectedVegetables, addVegetable, removeVegetable, generateRecipe,
    // ...
  }
})
```

---

## 状态分类

| 类别 | 实现方式 | 示例 |
|------|----------|------|
| **本地组件状态** | 组件内 `ref` / `computed` | 表单临时输入、UI 开关 |
| **全局共享状态** | Pinia Store (`ref`) | `selectedVegetables`, `history` |
| **持久化状态** | `useLocalStorage` + Pinia | `history`, `favorites` |
| **派生状态** | Store 内 `computed` | `hasSelectedVegetables` |

---

## 持久化策略

- 使用 `useLocalStorage` Composable 封装 `localStorage` 读写，实现自动同步。
- `STORAGE_KEYS` 常量集中管理，避免 key 名分散在多处。
- 数据格式变化时需考虑兼容性（当前未做版本控制，未来可扩展）。

---

## 何时使用全局状态

| 情况 | 建议 |
|------|------|
| 多个页面共享的数据 | ✅ 使用 Pinia Store |
| 仅单个组件使用的数据 | ❌ 组件内 `ref` |
| 需要持久化的用户偏好 | ✅ Store + `useLocalStorage` |
| 路由参数/查询 | ❌ 使用 Vue Router |

---

## 常见错误

- 在 Store 外直接修改 `ref` 的值（应通过 Store 提供的 action 修改）。
- 在组件中过度使用 Store，将本应局部的状态提升为全局。
- 忘记在 `useLocalStorage` 中处理 `JSON.parse` 的异常（当前未处理，未来应补充）。
