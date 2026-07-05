# 宝塔面板部署步骤

以下步骤适合一台已安装宝塔面板的 Linux 服务器，使用 Nginx + MySQL + Node.js 部署九江信息网。

## 1. 宝塔安装环境

在宝塔面板的软件商店安装：

- Nginx
- MySQL 8.x 或 MySQL 5.7+
- Node.js 版本管理器
- PM2 管理器

建议 Node.js 使用 20 LTS 或更高版本。

## 2. 创建网站和数据库

1. 在宝塔「网站」中添加站点，例如：`jjxxw.com`。
2. PHP 版本选择「纯静态」。
3. 在宝塔「数据库」中新建 MySQL 数据库，例如：
   - 数据库名：`jjxxw`
   - 用户名：`jjxxw`
   - 密码：使用强密码

记录数据库连接信息，后面要写入 `.env`。

## 3. 拉取代码

进入站点目录，例如：

```bash
cd /www/wwwroot/jjxxw.com
```

如果目录为空，执行：

```bash
git clone https://github.com/dpooooo/jjxxw.git .
```

如果已经拉取过代码，后续更新执行：

```bash
git pull origin main
```

## 4. 安装依赖

在项目根目录执行：

```bash
npm install
```

## 5. 配置后端环境变量

复制环境变量模板：

```bash
cp backend/.env.example backend/.env
```

编辑 `backend/.env`：

```env
DATABASE_URL="mysql://jjxxw:你的数据库密码@127.0.0.1:3306/jjxxw"
PORT=4000
CORS_ORIGIN="https://你的域名"
```

如果暂时没有 HTTPS，可先写：

```env
CORS_ORIGIN="http://你的域名"
```

## 6. 初始化数据库

宝塔创建的数据库用户通常只有当前数据库权限，没有创建 shadow database 的权限。
因此服务器生产环境不要执行 `prisma migrate dev`，否则可能报 `P3014`。

首次部署直接把 Prisma schema 同步到当前数据库：

```bash
npm run prisma:generate --workspace backend
npm run prisma:push --workspace backend
npm run prisma:seed --workspace backend
```

如果数据库已有正式数据，更新代码时不要随意重复执行 seed。

如果后续项目开始提交 `backend/prisma/migrations` 目录里的正式迁移文件，生产环境再改用：

```bash
npm run prisma:deploy --workspace backend
```

不要在宝塔生产环境运行：

```bash
npm run prisma:migrate --workspace backend
```

`prisma:migrate` 只适合本地开发环境。

## 7. 构建前端

```bash
npm run build
```

构建产物会生成在：

```text
frontend/dist
```

## 8. 启动后端服务

使用 PM2 启动 Express 后端：

```bash
cd /www/wwwroot/jjxxw.com
pm2 start backend/src/server.js --name jjxxw-api
pm2 save
```

检查后端是否正常：

```bash
curl http://127.0.0.1:4000/api/health
```

正常会返回：

```json
{"ok":true,"name":"九江信息网 API"}
```

## 9. 配置 Nginx

在宝塔「网站」中打开站点设置，网站目录设置为：

```text
/www/wwwroot/jjxxw.com/frontend/dist
```

然后在「配置文件」中加入或调整为类似配置：

```nginx
server {
    listen 80;
    server_name 你的域名;

    root /www/wwwroot/jjxxw.com/frontend/dist;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:4000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

保存后重载 Nginx。

## 10. 开启 HTTPS

在宝塔站点设置里申请 Let's Encrypt 证书。开启 HTTPS 后，把 `backend/.env` 里的 `CORS_ORIGIN` 改为：

```env
CORS_ORIGIN="https://你的域名"
```

然后重启后端：

```bash
pm2 restart jjxxw-api
```

## 11. 后续更新代码

每次更新部署：

```bash
cd /www/wwwroot/jjxxw.com
git pull origin main
npm install
npm run build
npm run prisma:generate --workspace backend
pm2 restart jjxxw-api
```

如果 Prisma schema 有数据库结构变更，再执行：

```bash
npm run prisma:push --workspace backend
```

如果已经改为正式 migration 流程，则改用：

```bash
npm run prisma:deploy --workspace backend
```

## 12. 常见检查

查看后端日志：

```bash
pm2 logs jjxxw-api
```

检查端口：

```bash
ss -lntp | grep 4000
```

检查 Nginx 配置：

```bash
nginx -t
```

重载 Nginx：

```bash
nginx -s reload
```
