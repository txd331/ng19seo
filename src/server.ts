
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createProxyMiddleware } from 'http-proxy-middleware';



const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');



const app = express();

// 创建 Angular SSR 应用引擎
const angularApp = new AngularNodeAppEngine();
const serverUrl = 'http://localhost:3000';
/**
 * 配置API代理
 * 将/api/*路径的请求代理到同一端口的后端服务
 */
app.use('/api', createProxyMiddleware({
  target: `${serverUrl}/api`,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api' // 保持路径不变
  },
}));

// /**
//  * 配置API代理
//  * 将/api/*路径的请求代理到同一端口的后端服务
//  */
// app.use('/sitemap', createProxyMiddleware({
//   target: `${serverUrl}/sitemap`,
//   changeOrigin: true,
//   pathRewrite: {
//     '^/sitemap': '/sitemap' // 保持路径不变
//   },
// }));

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
// API endpoint for /api/getData
// app.get('/api/getData', (req, res) => {
//   res.json({ msg: 'getData from express API! time=' + new Date().toISOString() });
// });

// app.post('/api/postData', (req, res) => {
//   res.json({ msg: 'postData from express API! time=' + new Date().toISOString() });
// });

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);


/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req: any  , res: any, next: any) => {

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
  
    // HTTP模式启动
    const port = 4000;
    app.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 * 使用底层的 Express 实例来创建请求处理器
 */
export const reqHandler = createNodeRequestHandler(app);
