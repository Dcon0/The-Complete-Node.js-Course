console.log('[main @' + new Date().toLocaleTimeString() + '] before');
getUser(1, showUserAndReposCallback);
console.log('[main @' + new Date().toLocaleTimeString() + '] after');

function getUser(id, callback) {
    console.log('[getUser Function @' + new Date().toLocaleTimeString() + '] Fetching user');
    setTimeout(() => {
        console.log('[getUser Function @' + new Date().toLocaleTimeString() + '] User Found!');
        callback({ id: id, name: 'User with id ' + id }, null);
    }, 2000)
}

function getGitHubRepo(userId, callback) {
    console.log('[getGitHubRepo Function @' + new Date().toLocaleTimeString() + '] Calling GitHub API');
    setTimeout(() => {
        console.log('[getGitHubRepo Function @' + new Date().toLocaleTimeString() + '] Repo Contents Retrieved Successfully');
        callback(['Repo1', 'Repo2', 'Repo3'], null);
    }, 2000);
}

function showUserReposCallback(repos, error) {
    if (repos) {
        console.log('[showUserReposCallback Function @' + new Date().toLocaleTimeString() + '] Repos:', repos);
    }
    else
        console.log('There was an error!');
}

function showUserAndReposCallback(user, err) {
    if (user) {
        console.log('[showUserAndReposCallback @' + new Date().toLocaleTimeString() + '] User:', user);
        getGitHubRepo(user.id, showUserReposCallback);
    }
    else
        console.log('There was an error!');
}