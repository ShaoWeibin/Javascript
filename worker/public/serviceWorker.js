/**
 * Service Worker
 */

 // test

const CACHE_NAME = 'sw-v1';
const urlsToCache = [
  '/',
  'static/js/bundle.js',
  '/worker.js',
  '/serviceWorker.js'
];

/**
 * install
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  console.log('Service Worker install success!');
  postMessage();
});

/**
 * activate
 */
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );

  console.log('Service Worker activate success!');
  postMessage();
});

/**
 * 自动更新 serviceWoker
 */
/*
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
  console.log('Service Worker install success!');
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    Promise.all([
      // 更新所有客户端
      self.clients.claim(),
      // 清理旧版本缓存
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (cacheWhitelist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        }));
      })
    ])
  );
  console.log('Service Worker activate success!');
});
*/

/**
 * fetch
 */
self.addEventListener('fetch', event => {
  const { request } = event;
  
  event.respondWith(
    caches.match(request).then(response => {
      // return matched.
      if (response) {
        return response;
      }

      // fetch and save it into cache.
      fetch(request).then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(request, response.clone());
          return response;
        });
      });
    }).catch(e => {
      console.log('fetch error');
      return e;
    })
  );
});

/**
 * message
 * 监听 message 事件获取页面发送的消息
 */
self.addEventListener('message', event => {
  console.log('Recieve message from main script');
  console.log(event.data);
});

self.addEventListener('online', () => {
  console.log('online');
});

self.addEventListener('offline', () => {
  console.log('offline');
});

/**
 * serviceWorker 发送消息给页面
 * 页面句柄从 self.clients 中得到
 */

function postMessage(msg) {
  self.clients.matchAll().then(clientList => {
    clientList.forEach(client => {
      client.postMessage(msg || 'Hi, I am send from Service worker！')
    });
  });
}

/**
 * unhandledrejection
 * Promise 类型的回调发生 reject 却没有 catch 处理, 会触发该事件
 */
self.addEventListener('unhandledrejection', event => {
  console.log(event);
});

/**
 * error 事件
 * JS 执行发生错误, 会触发 error 事件
 * @param {*} errorMessage 
 * @param {*} scriptURI 
 * @param {*} lineNumber 
 * @param {*} columnNumber 
 * @param {*} error 
 */
self.onerror = function(
  errorMessage,
  scriptURI, 
  lineNumber, 
  columnNumber, 
  error
) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(errorMessage, scriptURI, lineNumber, columnNumber);
  }
}