var promise = function(num) {
    return new Promise((resolve, reject) => {
        if (num % 2) {
            return resolve(num);
        }
        else {
            return reject(-num);
        }
    }).then((num) => {
        console.log(`resolve1: ${num}`);
        return Promise.resolve(num * 2);
    }, (num) => {
        console.log(`reject1: ${num}`);
        return Promise.reject(num * 2);
    }).then((num) => {
        console.log(`resolve2: ${num}`);
    }, (num) => {
        console.log(`reject2: ${num}`);
        throw new Error('reject');
    }).then((num) => {
        console.log(num);
    }).catch(err => {
        console.log(err)
    });
};

var doSomething = () => {
    console.log('doSomething', 'doSomething');
    return Promise.resolve('doSomething');
}

var doSomethingElse = (msg) => {
    console.log('doSomethingElse', msg);
    return Promise.resolve('doSomethingElse');
}

var finalHandler = (msg) => {
    console.log('finalHandle', msg);
}

// 1
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);

// doSomething
// |-----------------|
//                   doSomethingElse(undefined)
//                   |------------------|
//                                      finalHandler(resultOfDoSomethingElse)
//                                      |------------------|

// 2
doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);

// doSomething
// |-----------------|
//                   doSomethingElse(undefined)
//                   |------------------|
//                   finalHandler(undefined)
//                   |------------------|


// 3
doSomething().then(doSomethingElse())
    .then(finalHandler);

// doSomething
// |-----------------|
// doSomethingElse(undefined)
// |---------------------------------|
//                   finalHandler(resultOfDoSomething)
//                   |------------------|

// 4
doSomething().then(doSomethingElse)
    .then(finalHandler);

// doSomething
// |-----------------|
//                   doSomethingElse(resultOfDoSomething)
//                   |------------------|
//                                      finalHandler(resultOfDoSomethingElse)
//                                      |------------------|