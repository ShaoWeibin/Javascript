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
      postMessage('Hi, I am main script');
    })
    .then(() => {
      onMessage();
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
 * 手动更新 serviceWorker
 */
/*
const version = '1.0.1';

navigator.serviceWorker.register('/serviceWorker.js', {scope: '/'})
.then(registration => {
  if (localStorage.getItem('sw_version') !== version) {
    registration.update().then(() => {
      localStorage.setItem('sw_version', version);
    });
  }
});
*/

/**
 * 注销 serviceWorker
 */
export function unregisterServiceWorker() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
      console.log('Service Worker unregister success!');
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
    console.log('post message to Service Worker!');
  }
}

/**
 * 页面从 serviceWorker 接受消息
 */
function onMessage() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.addEventListener('message', event => {
      console.log('Recieve message from serviceWorker');
      console.log(event.data);
    });
  }
}