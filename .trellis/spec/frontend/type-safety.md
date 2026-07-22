# Type Safety

> TypeScript 类型规范与组织方式。

---

## 类型系统

- **TypeScript** ~5.3.3，使用严格模式。
- 组件使用 `<script setup lang="ts">`，全部类型安全。

---

## 类型组织

全局类型统一放在 `src/types/index.ts`：

```ts
export interface Vegetable {
  id: string
  name: string
  emoji?: string
}

export interface Theme {
  id: string
  name: string
  emoji: string
  description: string
  color: string
  bgColor: string
}

export interface Ingredient {
  name: string
  amount: string
  isRequired: boolean
}

export interface Recipe {
  id: string
  name: string
  themeIds: string[]
  time: string
  difficulty: 'easy' | 'medium' | 'hard'
  ingredients: Ingredient[]
  steps: string[]
  tags?: string[]
}

export interface HistoryItem {
  id: string
  recipeId: string
  recipeName: string
  themeName: string
  createdAt: number
  isFavorite: boolean
}
```

---

## Props 类型化

组件 Props 必须使用 TypeScript 接口定义：

```ts
interface Props {
  recipe: Recipe
  selectedVegetables: Vegetable[]
}

const props = defineProps<Props>()
```

可选 Props 使用 `withDefaults`：

```ts
withDefaults(defineProps<Props>(), {
  removable: true,
})
```

---

## 工具类型

- `Ref<T>`：Vue 的响应式引用类型，在 Composables 中显式使用。
- `ClassValue`：来自 `clsx`，用于 `cn()` 工具函数。

---

## 禁用模式

| 模式 | 说明 |
|------|------|
| `any` | 禁止使用，失去类型保护 |
| 类型断言（`as`） | 尽量避免，除非从 `localStorage` 解析数据等必要场景 |
| 隐式 `any` | 函数参数必须有类型注解 |

---

## Vite 类型声明

`src/vite-env.d.ts` 已包含 Vite 客户端类型声明，无需手动维护。

```ts
/// <reference types="vite/client" />
```
