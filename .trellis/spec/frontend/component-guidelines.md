# Component Guidelines

> 本项目组件编写规范 —— Vue 3 `<script setup>` 单文件组件。

---

## 组件结构

```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { Vegetable } from '@/types'

interface Props {
  vegetable: Vegetable
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  removable: true,
})

defineEmits<{
  (e: 'remove', id: string): void
}>()
</script>

<template>
  <!-- template 内容 -->
</template>
```

**约束：**
- 始终使用 `<script setup lang="ts">`，不使用 Options API。
- 组件内不编写 `<style>` 块，样式完全由 Tailwind 原子类处理。
- Props 使用 TypeScript `interface` 定义，通过 `defineProps<Props>()` 声明。
- Emits 使用 `defineEmits<...>()` 显式声明。
- 可选 Props 使用 `withDefaults(defineProps<...>(), { ... })` 提供默认值。

---

## Props 约定

- **类型定义**：在组件文件顶部定义 `Props` interface，从 `@/types` 导入类型。
- **默认值**：布尔型 Prop 默认 `false`；复杂对象默认在 `withDefaults` 中处理。
- **命名**：Prop 名使用 camelCase（如 `selectedVegetables`）。

**示例**（来自 `src/components/VeggieTag.vue`）：

```ts
interface Props {
  vegetable: Vegetable
  removable?: boolean
}

withDefaults(defineProps<Props>(), {
  removable: true,
})
```

---

## 样式模式

- **Tailwind 原子类**：所有样式通过 Tailwind 类名直接在 `template` 中编写。
- **自定义颜色**：在 `tailwind.config.js` 中定义了项目主题色，如 `chalkboard`、`paper`、`tomato`、`mustard` 等。
- **类名合并**：使用 `cn()` 工具函数（`src/lib/utils.ts`）合并条件类名，避免类名冲突。
- **动画**：在 `tailwind.config.js` 中注册了自定义 keyframes，如 `animate-pop-in`、`animate-fade-up`。

**示例**（条件类名）：

```vue
<span
  class="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium animate-pop-in"
  :class="getVegetableColor(vegetable.id)"
>
```

---

## 组件分类

| 目录 | 用途 | 命名规范 |
|------|------|----------|
| `src/components/` | 可复用 UI 组件 | PascalCase (e.g. `VeggieTag.vue`) |
| `src/pages/` | 页面级路由组件 | PascalCase + `Page` 后缀 (e.g. `HomePage.vue`) |

---

## 常见错误

- 在组件内直接修改 Props（应通过 `emit` 通知父组件）。
- 使用 `<style scoped>` 或 `<style>` 块（样式应通过 Tailwind 处理）。
- Props 定义不使用 TypeScript 接口（失去类型安全）。
