/**
 * Web Worker
 */

 onmessage = function(msg) {
  console.log('Message received from main script');
   console.log(msg.data);
   postMessage('I am worker script');
 }

 onerror = function(error) {
   console.log(error);
   throw error;
 }