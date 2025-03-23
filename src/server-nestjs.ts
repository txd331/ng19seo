
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AppModule } from '../server/app.module';
import { NestFactory } from '@nestjs/core';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');


// 创建 NestJS 应用
const nestApp:any = await NestFactory.create(AppModule);

// 获取 NestJS 的底层 Express 实例，这样我们可以用于 SSR
const app = nestApp.getHttpAdapter().getInstance();

// 创建 Angular SSR 应用引擎
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
nestApp.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);


/**
 * Handle all other requests by rendering the Angular application.
 */
nestApp.use('/**', (req: any  , res: any, next: any) => {

  // 检查是否是API请求，如果是则跳过Angular处理
  if (req.originalUrl.startsWith('/api/')) {
    return next();
  }

  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  nestApp.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 * 使用底层的 Express 实例来创建请求处理器
 */
export const reqHandler = createNodeRequestHandler(app);
