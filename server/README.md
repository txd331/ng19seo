# NestJS Server for Angular 19 SSR Project

这是一个在Angular 19 SSR模式项目中独立运行的NestJS服务器。

## 功能

- 在3000端口独立运行
- 提供API接口
- 支持静态文件服务

## 安装依赖

```bash
cd server
npm install
```

## 运行服务器

### 开发模式

```bash
npm run start:dev
```

### 生产模式

```bash
npm run build
npm run start:prod
```

## API端点

- GET /api/getData - 获取数据
- POST /api/postData - 提交数据
