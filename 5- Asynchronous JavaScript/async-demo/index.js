const promiseOne = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ promiseId: 1, name: "Promise One" });
    }, 1000);
})

const promiseTwo = new Promise((resolve) => {
    setTimeout(() => {
        resolve({ promiseId: 2, name: "Promise Two" });
    }, 2000);
})

const promiseThree = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve({ promiseId: 3, name: "Promise Three" });
        reject(new Error("This is not on purpose hehe.."));
    }, 2000);
})

Promise.all([promiseOne, promiseTwo]).then(result => console.log('[Promise.all([promiseOne, promiseTwo]).then]', result))
    .catch(error => console.error('[Promise.all([promiseOne, promiseTwo]).catch]', error));

Promise.all([promiseOne, promiseTwo, promiseThree]).then(result => console.log('[Promise.all([promiseOne, promiseTwo, promiseThree]).then]', result))
    .catch(error => console.error('[Promise.all([promiseOne, promiseTwo, promiseThree]).catch]', error));

Promise.race([promiseOne, promiseTwo, promiseThree]).then(result => console.log('[Promise.race([promiseOne, promiseTwo, promiseThree]).then]', result))
    .catch(error => console.error('[Promise.race([promiseOne, promiseTwo, promiseThree]).catch]', error));

Promise.allSettled([promiseOne, promiseTwo, promiseThree]).then(result => console.log('[Promise.allSettled([promiseOne, promiseTwo, promiseThree]).then]', result))
    .catch(error => console.error('[Promise.allSettled([promiseOne, promiseTwo, promiseThree]).catch]', error));