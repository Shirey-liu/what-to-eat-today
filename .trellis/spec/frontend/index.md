# Frontend Development Guidelines

> 本项目（vegetable-blind-box）的前端开发规范。

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Vue 3 | ^3.4.15 |
| 构建工具 | Vite | ^5.0.12 |
| 语言 | TypeScript | ~5.3.3 |
| 路由 | Vue Router | ^4.2.5 (Hash 模式) |
| 状态管理 | Pinia | ^2.1.7 |
| 样式 | Tailwind CSS | ^3.4.1 |
| 图标 | lucide-vue-next | ^0.511.0 |
| 类名工具 | clsx + tailwind-merge | ^2.1.1 / ^3.3.0 |
| 代码检查 | ESLint + @typescript-eslint + eslint-plugin-vue | — |

---

## Guidelines Index

| Guide | Description | Status |
|-------|-------------|--------|
| [Directory Structure](./directory-structure.md) | 模块组织与文件布局 | ✅ Filled |
| [Component Guidelines](./component-guidelines.md) | 组件模式、Props、样式约定 | ✅ Filled |
| [Hook Guidelines](./hook-guidelines.md) | Composables、状态逻辑复用 | ✅ Filled |
| [State Management](./state-management.md) | Pinia Store、本地状态、持久化 | ✅ Filled |
| [Quality Guidelines](./quality-guidelines.md) | 代码标准、禁用模式 | ✅ Filled |
| [Type Safety](./type-safety.md) | TypeScript 模式、类型组织 | ✅ Filled |

---

## 项目特点

- **纯前端应用**：无后端 API，所有数据为静态 JSON（`src/data/`）。
- **Hash 路由**：使用 `createWebHashHistory`，适合静态部署（Vercel / Cloudflare Pages）。
- **单文件组件**：所有组件均为 `.vue` 单文件，使用 `<script setup lang="ts">`。
- **Tailwind 原子类**：几乎全部样式通过 Tailwind 原子类实现，极少自定义 CSS。
- **Pinia Setup Store**：状态管理使用 Composition API 风格的 Setup Store。
- **暗色模式**：通过 `darkMode: 'class'` 实现手动切换。
