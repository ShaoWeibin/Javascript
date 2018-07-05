/**
 * Web Worker
 */

function fibonacci(n) {
  if(n === 0 || n === 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}


onmessage = function(msg) {
  console.log('Message received from main script');
  console.log(msg.data);
  //  postMessage('I am worker script');
  
  const date = new Date().getTime();
  var result = fibonacci(parseInt(msg.data));
  postMessage({
    input: msg.data,
    output: result,
    cost: new Date().getTime() - date
  });
}

onerror = function(error) {
  console.log(error);
  throw error;
}