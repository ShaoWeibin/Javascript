/**
 * Web Worker.
 */

let worker;

export function createWorker() {
  if (window.Worker) {
    worker = new Worker('worker.js');

    worker.postMessage('I am main script');

    worker.onmessage = function(msg) {
      console.log('Message received from worker script');
      console.log(msg.data);
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
  }
}