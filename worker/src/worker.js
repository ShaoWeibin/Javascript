/**
 * Web Worker.
 */

let worker;
let listeners = {};

export function createWorker() {
  if (window.Worker) {
    worker = new Worker('/worker.js');

    // worker.postMessage('I am main script');

    worker.onmessage = function(msg) {
      console.log('Message received from worker script');
      console.log(msg.data);

      // 触发 listener 回调
      if (listeners.message) {
        for (let i = 0, n = listeners.message.length; i < n; i++) {
          listeners.message[i](msg);
        }
      }
    }
    
    worker.onerror = function(error) {
      console.log(error.filename, error.lineno, error.message);
      throw error;
    }
  }
  else {
    console.log('Sorry, your browser does not support Web Workers...');
  }
}

export function terminateWorker() {
  if (worker) {
    worker.terminate();
    listeners = {};
  }
}

export function postMessage(msg) {
  if (worker) {
    worker.postMessage(msg);
  }
}

export function addEventListener(event, callback) {
  if (event && typeof callback === 'function') {
    if (listeners[event]) {
      listeners[event].push(callback);
    } else {
      listeners[event] = [callback];
    }
  }
}