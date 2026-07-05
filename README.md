# 九江信息网

现代版九江本地生活信息平台。前台提供本地分类信息展示、搜索、分类浏览、详情页和发布页；后台提供信息审核、置顶、删除、分类管理、区域管理和公告管理。

## 技术栈

- 前端：Vue 3 + Vite + Tailwind CSS
- 后端：Node.js + Express
- 数据库：MySQL + Prisma

## 本地启动

```bash
npm install
copy backend\.env.example backend\.env
npm run dev
```

配置 MySQL 后执行：

```bash
npm run prisma:migrate --workspace backend
npm run prisma:seed --workspace backend
```

前端默认地址：`http://127.0.0.1:5173`

后端默认地址：`http://127.0.0.1:4000`

## 生产部署

宝塔面板部署步骤见 [DEPLOY_BAOTA.md](./DEPLOY_BAOTA.md)。
