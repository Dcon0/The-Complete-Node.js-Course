console.log('[main @' + new Date().toLocaleTimeString() + '] before');

getGitHubReposAsync(1)
    .then(result => console.log('[main @' + new Date().toLocaleTimeString() + '] Result:', result))
    .catch(error => console.log('[main @' + new Date().toLocaleTimeString() + ']', error));

console.log('[main @' + new Date().toLocaleTimeString() + '] after');

//It seems, this way the async function acts as Promise.all() method, 
//that is, all promises used (awaited) have to be resolved.
async function getGitHubReposAsync(userId) {
    const user = await getUserPromiseFunction(1);
    const repos = await getGitHubReposPromiseFunction(user.id);
    return { user: user, userRepos: repos };
}

function getUserPromiseFunction(id) {
    console.log('[getUser Promise Function @' + new Date().toLocaleTimeString() + '] Fetching user');
    return new Promise((resolve, reject) => {
        console.log('[getUser Promise @' + new Date().toLocaleTimeString() + '] Fetching user ');
        setTimeout(() => {
            console.log('[getUser Promise @' + new Date().toLocaleTimeString() + '] User Found!');
            resolve({ id: id, name: 'User with id ' + id });
            reject(new Error('There has been an error when retrieving user!'));
        }, 2000);
    });
}

function getGitHubReposPromiseFunction(userId) {
    console.log('[getGitHubRepo Promise Function @' + new Date().toLocaleTimeString() + '] Calling GitHub API');
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('[getGitHubRepo Promise @' + new Date().toLocaleTimeString() + '] Calling GitHub API');
            console.log('[getGitHubRepo Promise @' + new Date().toLocaleTimeString() + '] Repo Contents of user with id ' + userId + ' Retrieved Successfully');
            // resolve(['Repo1', 'Repo2', 'Repo3']);
            reject(new Error('There has been an error when retrieving repos!'));
        }, 2000);
    });
}