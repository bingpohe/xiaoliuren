/*
 * ==================== 小六壬 PWA Service Worker ====================
 *
 * 离线缓存策略：Cache-First (缓存优先)
 *
 * 为什么选择 Cache-First？
 *   - 本应用为纯静态内容（HTML/JS/CSS），不依赖动态数据
 *   - 内容极少变动，可放心使用长久缓存
 *   - 优先返回缓存可实现即时加载（即使网络慢或离线）
 *   - 后台更新缓存确保下次访问获取最新内容
 *
 * 生命周期：
 *   install  → 预缓存所有静态资源
 *   activate → 清理旧版本缓存
 *   fetch    → 缓存优先 + 后台更新
 *
 * 版本号 CACHE_NAME：当资源更新时修改版本号（如 v2），旧缓存自动被清理
 */

const CACHE_NAME = 'xiaoliuren-v1';

/*
 * 需要预缓存的静态资源列表
 * 这些文件在 Service Worker 安装时一次性缓存
 * 注意：'./' 代表应用根路径，对应 index.html
 */
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/LOGO68.png'
];

/*
 * ==================== Install 事件 ====================
 * 触发时机：Service Worker 首次注册或更新时
 *
 * 工作流程：
 *   1. 打开缓存空间
 *   2. 批量下载并缓存所有静态资源
 *   3. 即使个别资源下载失败也继续安装（容错设计）
 *   4. 调用 skipWaiting() 立即激活，不等待旧 SW 释放
 */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 批量缓存所有静态资源
      return cache.addAll(ASSETS).catch(() => {
        /*
         * 容错处理：
         * addAll 是原子操作——一个失败则全部失败
         * 这里捕获错误让安装继续进行（至少部分资源已缓存）
         * 后续 fetch 事件会尝试补充缓存缺失的资源
         */
      });
    }).then(() => self.skipWaiting()) // 立即激活，无需等待用户关闭旧页面
  );
});

/*
 * ==================== Activate 事件 ====================
 * 触发时机：新 SW 激活时
 *
 * 工作流程：
 *   1. 遍历所有缓存空间
 *   2. 删除不属于当前版本的旧缓存（版本清理）
 *   3. 调用 claim() 立即接管所有客户端的请求（无需刷新页面）
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      // 并行删除所有旧版本缓存
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME) // 保留当前版本，删除其余
            .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim()) // 立即接管所有页面
  );
});

/*
 * ==================== Fetch 事件 ====================
 * 触发时机：应用发起任何网络请求时
 *
 * Cache-First 策略流程：
 *   1. 检查缓存中是否有匹配的请求
 *   2. 有 → 立即返回缓存（同时后台更新缓存）
 *   3. 无 → 发起网络请求，成功后缓存响应副本
 *   4. 网络也失败 → 返回缓存的旧版本（如果有）
 *
 * 注意：只处理 GET 请求，POST/PUT 等不缓存
 */
self.addEventListener('fetch', (event) => {
  // 非 GET 请求（如 POST）直接放行，不参与缓存
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      /*
       * 后台更新策略（Stale-While-Revalidate 变体）：
       * 先返回缓存内容给用户（快速响应），
       * 同时在后台发起网络请求更新缓存（下次访问生效）
       */
      const fetchPromise = fetch(event.request).then((response) => {
        // 仅缓存成功的响应（HTTP 200）
        if (response && response.status === 200) {
          const clone = response.clone(); // 克隆响应体（响应只能读取一次）
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone); // 更新缓存
          });
        }
        return response;
      }).catch(() => cached); // 网络失败时回退到旧缓存

      // 优先返回缓存，缓存不存在则等待网络请求
      return cached || fetchPromise;
    })
  );
});
