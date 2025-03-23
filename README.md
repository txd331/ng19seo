# Angular 19 + NestJS 10 SSR Demo

[English](#english) | [中文](#chinese)

<a id="english"></a>
## English

### Overview
This is a demonstration project showcasing Server-Side Rendering (SSR) implementation using Angular 19 and NestJS 10. The project demonstrates how to build a modern web application with improved SEO capabilities, faster initial page loads, and better performance on low-powered devices.

### Technology Stack
- **Frontend**: Angular 19
- **Backend**: NestJS 10
- **Rendering**: Server-Side Rendering (SSR) with Hybrid Rendering
- **API Communication**: HTTP Client with environment-based configuration

### Key Features

#### 1. Hybrid Rendering in Angular 19
Angular 19 introduces a powerful Hybrid Rendering mode that allows developers to configure different rendering strategies for different routes using the `serverRoutes` configuration. This provides significant flexibility:

- **Server-Side Rendering (SSR)**: Renders specified routes on the server for better SEO and faster initial page loads
- **Static Site Generation (SSG)**: Pre-renders routes at build time
- **Client-Side Rendering (CSR)**: Renders routes on the client for dynamic content

Example configuration in the application routing module:
```typescript
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // This route uses server-side rendering
    data: { renderMode: 'server' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // This route uses client-side rendering
    data: { renderMode: 'client' }
  },
  // ...
];
```

#### 2. Separate NestJS Server Deployment
This project follows a separate directory approach for the NestJS server, providing several benefits:

- **Independent TypeScript configurations**: NestJS and Angular have different TypeScript requirements that can conflict if compiled together
- **Flexible development**: Allows working on frontend and backend separately
- **Simplified deployment**: Each part can be deployed independently
- **Easier maintenance**: Clear separation of concerns

### Project Structure
```
├── src/                     # Angular application code
│   ├── app/                 # Angular components
│   ├── environments/        # Environment configuration
│   │   ├── environment.ts           # Development environment
│   │   └── environment.prod.ts      # Production environment
│   ├── main.ts              # Client entry point
│   └── main.server.ts       # SSR entry point
├── server/                  # NestJS server (separate deployment)
│   ├── app.controller.ts    # API Controllers
│   ├── app.module.ts        # NestJS module configuration
│   ├── app.service.ts       # Business logic services
│   ├── main.ts              # NestJS entry point
│   ├── package.json         # NestJS-specific dependencies
│   └── tsconfig.json        # NestJS-specific TypeScript config
└── ... other configuration files
```

### Environment Configuration
The project uses environment files to handle different API endpoints between development and production:

```typescript
// environment.ts (development)
export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000/'
};

// environment.prod.ts (production)
export const environment = {
  production: true,
  baseUrl: '/'
};
```

This approach ensures that API requests work correctly in both development and production environments without code changes.

### Installation

```bash
# Install Angular dependencies
npm install

# Install NestJS server dependencies
cd server
npm install
cd ..
```

### Running the Application

#### Development Mode

```bash
# Start the NestJS server on port 3000
cd server
npm run start:dev

# In another terminal, start the Angular development server
cd ..
npm start
```

Visit http://localhost:4200 to see the application in development mode.

#### Production Build

```bash
# Build Angular application with SSR
npm run build

# Build NestJS server
cd server
npm run build

# Start the NestJS server
npm run start:prod

# In another terminal, start the SSR server
cd ..
npm run serve:ssr
```

### API Communication
The application uses Angular's HttpClient with environment-based configuration to communicate with the NestJS backend:

```typescript
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) {}
  
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/getData');
  }
}
```

---

<a id="chinese"></a>
## 中文

### 概述
这是一个使用 Angular 19 和 NestJS 10 实现服务器端渲染（SSR）的演示项目。该项目展示了如何构建具有改进的 SEO 能力、更快的初始页面加载和在低性能设备上更好表现的现代 Web 应用程序。

### 技术栈
- **前端**: Angular 19
- **后端**: NestJS 10
- **渲染**: 服务器端渲染 (SSR) 与混合渲染
- **API通信**: 基于环境配置的HTTP客户端

### 主要特性

#### 1. Angular 19 的混合渲染（Hybrid Rendering）
Angular 19 引入了强大的混合渲染模式，允许开发者通过 `serverRoutes` 配置为不同路由配置不同的渲染策略。这提供了显著的灵活性：

- **服务器端渲染 (SSR)**: 在服务器上渲染指定路由，提升SEO和初始加载速度
- **静态站点生成 (SSG)**: 在构建时预渲染路由
- **客户端渲染 (CSR)**: 在客户端渲染路由，适用于动态内容

应用路由模块中的配置示例：
```typescript
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // 此路由使用服务器端渲染
    data: { renderMode: 'server' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // 此路由使用客户端渲染
    data: { renderMode: 'client' }
  },
  // ...
];
```

#### 2. NestJS 服务器独立部署
本项目对 NestJS 服务器采用独立目录方法，提供以下几个优势：

- **独立的 TypeScript 配置**: NestJS 和 Angular 的 TypeScript 要求不同，如果一起编译可能产生冲突
- **灵活的开发**: 允许分别独立开发前端和后端
- **简化部署**: 每个部分可以独立部署
- **更容易维护**: 关注点分离清晰

### 项目结构
```
├── src/                     # Angular 应用代码
│   ├── app/                 # Angular 组件
│   ├── environments/        # 环境配置
│   │   ├── environment.ts           # 开发环境
│   │   └── environment.prod.ts      # 生产环境
│   ├── main.ts              # 客户端入口点
│   └── main.server.ts       # SSR 入口点
├── server/                  # NestJS 服务器（独立部署）
│   ├── app.controller.ts    # API 控制器
│   ├── app.module.ts        # NestJS 模块配置
│   ├── app.service.ts       # 业务逻辑服务
│   ├── main.ts              # NestJS 入口点
│   ├── package.json         # NestJS 特定依赖
│   └── tsconfig.json        # NestJS 特定 TypeScript 配置
└── ... 其他配置文件
```

### 环境配置
项目使用环境文件处理开发和生产环境之间的不同API端点：

```typescript
// environment.ts (开发环境)
export const environment = {
  production: false,
  baseUrl: 'http://localhost:3000/'
};

// environment.prod.ts (生产环境)
export const environment = {
  production: true,
  baseUrl: '/'
};
```

这种方法确保API请求在开发和生产环境中都能正确工作，无需代码更改。

### 安装

```bash
# 安装 Angular 依赖
npm install

# 安装 NestJS 服务器依赖
cd server
npm install
cd ..
```

### 运行应用

#### 开发模式

```bash
# 在端口 3000 上启动 NestJS 服务器
cd server
npm run start:dev

# 在另一个终端，启动 Angular 开发服务器
cd ..
npm start
```

访问 http://localhost:4200 查看开发模式下的应用。

#### 生产构建

```bash
# 使用 SSR 构建 Angular 应用
npm run build

# 构建 NestJS 服务器
cd server
npm run build

# 启动 NestJS 服务器
npm run start:prod

# 在另一个终端，启动 SSR 服务器
cd ..
npm run serve:ssr
```

### API 通信
应用使用 Angular 的 HttpClient 结合基于环境的配置与 NestJS 后端通信：

```typescript
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) {}
  
  getData(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'api/getData');
  }
}
```
