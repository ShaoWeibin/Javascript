/**
 * Service Worker.
 */

/**
 * 注册 serviceWorker
 */
export function registerServiceWorker() {
  if (navigator.serviceWorker) {
    // 第二个参数为 scope
    navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'})
    .then(registration => {
      console.log('Service Worker register success! Scope is' + registration.scope);
    })
    .then(() => {
      
    })
    .catch(error => {
      console.log(error);
    });
  }
  else {
    console.log('Sorry, your browser does not support Service Workers...');
  }
}

/**
 * 注销 serviceWorker
 */
export function unregisterServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

/**
 * 页面发送给 serviceWorker
 * @param {*} msg 
 */
export function postMessage(msg) {
  // 获取 ServiceWorker 句柄
  // 只有注册成功后该句柄才会存在
  const controller = navigator.serviceWorker.controller;
  if (controller) {
    controller.postMessage(msg, []);
  }
}