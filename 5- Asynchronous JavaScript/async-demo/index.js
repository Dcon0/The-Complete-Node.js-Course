console.log('[main @' + new Date().toLocaleTimeString() + '] before');

getGitHubReposAsync(1);

console.log('[main @' + new Date().toLocaleTimeString() + '] after');

async function getGitHubReposAsync(userId) {
    try {
        const user = await getUserPromiseFunction(1);
        const repos = await getGitHubReposPromiseFunction(user.id);
        console.log('[getGitHubReposAsync Async Function @' + new Date().toLocaleTimeString() + '] User:', user);
        console.log('[getGitHubReposAsync Async Function @' + new Date().toLocaleTimeString() + '] Repos:', repos);
    } catch (error) {
        console.error(error);
    }
}

function getUserPromiseFunction(id) {
    console.log('[getUser Promise Function @' + new Date().toLocaleTimeString() + '] Fetching user');
    return new Promise((resolve, reject) => {
        console.log('[getUser Promise @' + new Date().toLocaleTimeString() + '] Fetching user ');
        setTimeout(() => {
            console.log('[getUser Promise @' + new Date().toLocaleTimeString() + '] User Found!');
            resolve({ id: id, name: 'User with id ' + id });
            reject(new Error('There has been an error retrieving user!'));
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
            reject(new Error('There has been an error retrieving repos!'));
        }, 2000);
    });
}