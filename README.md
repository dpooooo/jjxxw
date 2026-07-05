# 九江信息网

现代版九江本地生活信息平台。功能模型参考分类信息站，视觉风格采用清爽的信息卡片与表格布局。

## 技术栈

- 前端：Vue 3 + Vite + Tailwind CSS
- 后端：Node.js + Express
- 数据库：MySQL + Prisma

## 本地启动

```bash
npm install
copy backend\\.env.example backend\\.env
npm run dev
```

配置 MySQL 后执行：

```bash
npm run prisma:migrate --workspace backend
npm run prisma:seed --workspace backend
```

前端默认地址：`http://127.0.0.1:5173`

后端默认地址：`http://127.0.0.1:4000`
