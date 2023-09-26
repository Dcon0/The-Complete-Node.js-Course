console.log('[main @' + new Date().toLocaleTimeString() + '] before');

getUserPromiseFunction(1)
    .then(user => {
        console.log('[main @' + new Date().toLocaleTimeString() + '] User:', user);
        return getGitHubRepoPromiseFunction(user.id);
    })
    .then(repos => console.log('[main @' + new Date().toLocaleTimeString() + '] Repos:', repos))
    .catch(err => console.log(err.message));

console.log('[main @' + new Date().toLocaleTimeString() + '] after');

function getUserPromiseFunction(id) {
    console.log('[getUser Promise Function @' + new Date().toLocaleTimeString() + '] Fetching user');
    return new Promise((resolve, reject) => {
        console.log('[getUser Promise @' + new Date().toLocaleTimeString() + '] Fetching user ');
        setTimeout(() => {
            console.log('[getUser Promise @' + new Date().toLocaleTimeString() + '] User Found!');
            resolve({ id: id, name: 'User with id ' + id });
            reject(new Error('There has been an error'));
        }, 2000);
    });
}

function getGitHubRepoPromiseFunction(userId) {
    console.log('[getGitHubRepo Promise Function @' + new Date().toLocaleTimeString() + '] Calling GitHub API');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('[getGitHubRepo Promise @' + new Date().toLocaleTimeString() + '] Calling GitHub API');
            console.log('[getGitHubRepo Promise @' + new Date().toLocaleTimeString() + '] Repo Contents of user with id ' + userId + ' Retrieved Successfully');
            resolve(['Repo1', 'Repo2', 'Repo3']);
            reject(new Error('There has been an error'));
        }, 2000);
    });
}