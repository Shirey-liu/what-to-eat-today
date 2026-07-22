# Directory Structure

> 项目前端代码组织结构。

---

## 目录布局

```
src/
├── components/          # 可复用 UI 组件
│   ├── VeggieTag.vue
│   ├── RecipeCard.vue
│   └── ...
├── pages/               # 页面级组件（对应路由）
│   ├── HomePage.vue
│   ├── ThemePage.vue
│   ├── ResultPage.vue
│   └── HistoryPage.vue
├── router/
│   └── index.ts         # Vue Router 配置（Hash 模式）
├── stores/
│   └── appStore.ts      # Pinia Store（Setup Store 风格）
├── composables/         # Vue Composables
│   ├── useLocalStorage.ts
│   └── useTheme.ts
├── data/                # 静态数据（菜谱、蔬菜、主题）
│   ├── recipes.ts
│   ├── vegetables.ts
│   └── themes.ts
├── utils/               # 工具函数
│   └── recipeMatcher.ts
├── lib/                 # 通用库（与框架无关）
│   └── utils.ts         # cn() 类名合并工具
├── types/
│   └── index.ts         # TypeScript 类型定义
├── assets/              # 静态资源（图片、图标等）
├── style.css            # 全局 Tailwind 入口
├── main.ts              # 应用入口
├── App.vue              # 根组件（仅 <RouterView />）
└── vite-env.d.ts        # Vite 类型声明
```

---

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `VeggieTag.vue`, `HomePage.vue` |
| Composable | camelCase, `use` 前缀 | `useTheme.ts`, `useLocalStorage.ts` |
| Store | camelCase, `use` 前缀 | `appStore.ts` (导出 `useAppStore`) |
| 工具函数 | camelCase | `recipeMatcher.ts` (导出 `matchRecipes`) |
| 类型文件 | camelCase | `index.ts` (导出 interface) |
| 常量/数据 | camelCase | `commonVegetables`, `recipes` |

---

## 模块组织

- **Feature 不拆分目录**：项目较小，按类型分目录（components/pages/data）即可，不需要按 feature 拆分。
- **数据与视图分离**：静态数据统一放在 `src/data/`，通过 import 在组件中使用。
- **无 API 层**：纯前端应用，没有 API client 或请求层。
