const resolvedPromise = Promise.resolve("Resolved :)");
const rejectedPromise = Promise.reject(new Error('Rejected :('));

resolvedPromise.then(result => console.log(result))
    .catch(error => console.error(error));
rejectedPromise.then(result => console.log(result))
    .catch(error => console.error(error));