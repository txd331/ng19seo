import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { provideServerRouting } from '@angular/ssr';

// 确保正确配置 NgZone
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    // 添加其他服务端特定的提供者
    provideServerRouting(serverRoutes)
  ]
};

// 合并客户端和服务端配置
export const config = mergeApplicationConfig(appConfig, serverConfig);
