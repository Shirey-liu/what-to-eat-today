# Quality Guidelines

> 代码质量标准与审查清单。

---

## ESLint 配置

项目已配置 ESLint，包含以下插件：

- `eslint`（核心规则）
- `@typescript-eslint/eslint-plugin` / `@typescript-eslint/parser`（TypeScript）
- `eslint-plugin-vue`（Vue 单文件组件）

**常用命令：**

```bash
npm run lint      # 检查
npm run lint:fix  # 自动修复
```

---

## 禁用模式

| 模式 | 原因 | 替代方案 |
|------|------|----------|
| `any` | 破坏类型安全 | 使用具体类型或 `unknown` |
| Options API | 项目统一使用 `<script setup>` | `<script setup>` |
| 内联样式 | 与 Tailwind 体系冲突 | Tailwind 原子类 + `cn()` |
| `<style>` / `<style scoped>` | 样式分散难以维护 | 全部通过 Tailwind 处理 |
| 直接操作 DOM | 违背 Vue 响应式原则 | 使用 Vue 的 `ref` 和生命周期 |
| `console.log` 提交 | 生产环境残留 | 开发时调试，提交前移除 |

---

## 必须遵循的模式

1. **TypeScript 严格模式**：所有组件和逻辑必须有类型。
2. **Props 显式声明**：使用 `defineProps<Props>()` 和 `defineEmits<...>()`。
3. **组件名 PascalCase**：文件名和组件名一致。
4. **常量集中管理**：如 `STORAGE_KEYS`、`vegetableColorMap`。
5. **工具函数纯函数化**：如 `matchRecipes`、`normalize`，不依赖外部状态。

---

## 代码审查清单

- [ ] 新组件是否使用了 `<script setup lang="ts">`？
- [ ] Props 是否正确定义了 TypeScript 类型？
 - [ ] 是否有不必要的 `any`？
- [ ] 样式是否全部通过 Tailwind 处理，没有新增 `<style>` 块？
- [ ] 工具函数是否放在 `src/utils/` 或 `src/lib/`？
- [ ] 新数据是否已添加到 `src/types/index.ts`？
- [ ] `npm run lint` 是否通过？
- [ ] `npm run build` 是否成功？
