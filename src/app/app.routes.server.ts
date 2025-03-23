/*
 * @Author: xdtian xdtian@kland.com.cn
 * @Date: 2025-03-18 13:59:44
 * @LastEditors: xdtian xdtian@kland.com.cn
 * @LastEditTime: 2025-03-18 15:40:24
 * @FilePath: \ng192ssr\src\app\app.routes.server.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%A
 */
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'page1',
    renderMode: RenderMode.Server,
  },
  {
    path: 'page2',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
