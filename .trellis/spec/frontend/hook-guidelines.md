# Composable (Hook) Guidelines

> Vue 3 Composables 的编写与使用规范。

---

## 概述

本项目使用 Vue 3 Composition API 的 **Composables** 来封装可复用的状态逻辑。虽然 Vue 社区常称其为 "Composables"，但功能上与 React 的 "Hooks" 等价。

---

## 命名规范

- **文件名**：camelCase，必须以 `use` 开头，如 `useTheme.ts`。
- **导出函数**：与文件名一致，如 `export function useTheme() { ... }`。

---

## 现有 Composables

| 文件 | 用途 | 关键 API |
|------|------|----------|
| `useLocalStorage.ts` | 响应式 localStorage 持久化 | `ref`, `watch`, `localStorage` |
| `useTheme.ts` | 暗色/亮色主题切换 | `ref`, `watchEffect`, `onMounted` |

---

## 编写模式

### useLocalStorage

```ts
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const stored = localStorage.getItem(key)
  const initialValue: T = stored ? (JSON.parse(stored) as T) : defaultValue
  const value = ref<T>(initialValue) as Ref<T>

  watch(
    value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return value
}
```

### useTheme

```ts
import { ref, watchEffect, onMounted, computed } from 'vue'

type Theme = 'light' | 'dark'

export function useTheme() {
  const theme = ref<Theme>('light')

  const getPreferredTheme = (): Theme => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const applyTheme = (t: Theme) => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(t)
    localStorage.setItem('theme', t)
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  onMounted(() => {
    theme.value = getPreferredTheme()
    applyTheme(theme.value)
  })

  watchEffect(() => {
    applyTheme(theme.value)
  })

  return { theme, toggleTheme, isDark: computed(() => theme.value === 'dark') }
}
```

---

## 设计原则

1. **单一职责**：每个 Composable 只封装一块独立的状态逻辑。
2. **显式依赖**：在 Composable 内部使用 Vue 的响应式 API，不隐藏副作用。
3. **返回响应式对象**：返回包含 `ref`/`computed` 的对象，方便组件解构使用。
4. **生命周期安全**：在 `onMounted` 等生命周期钩子内处理 DOM 相关逻辑，避免 SSR 问题。

---

## 常见错误

- 将 Composable 命名为非 `use` 前缀的函数。
- 在 Composable 内忘记返回响应式引用，导致组件失去响应性。
- 在 Composable 内滥用 `watch` 而不考虑性能影响（如没有 `deep` 但对象深层变化时）。
