# PRD: 提交并推送减脂餐改动

## 需求概述

将刚刚添加的减脂餐主题和菜谱改动提交到 Git 仓库，并推送到 GitHub 远程仓库。

## 提交范围

只提交与减脂餐相关的文件，避免将其他本地修改或未跟踪文件混入本次提交：

- `src/data/themes.ts` — 新增 5 个减脂餐主题
- `src/data/recipes.ts` — 新增 15 道减脂餐菜谱

## 验收标准

- [ ] 只提交 `src/data/themes.ts` 和 `src/data/recipes.ts`
- [ ] 提交信息清晰描述改动
- [ ] 成功推送到 `origin main`
- [ ] GitHub 仓库中能看到新提交

## 约束

- 不提交 `.claude/`、`.cursor/`、`.trellis/`、`.vercel/`、`AGENTS.md` 等本地配置
- 不提交 `index.html`、`vite.config.ts`、`src/router/index.ts` 等其他本次未涉及的修改
- 提交信息以英文动词开头，符合项目现有风格
