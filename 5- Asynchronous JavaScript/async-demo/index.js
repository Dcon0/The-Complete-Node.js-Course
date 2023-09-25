console.log('[main @' + new Date().toLocaleTimeString() + '] before');

getUser(1, (user, err) => {
    if (user) {
        console.log('[main @' + new Date().toLocaleTimeString() + '] User:', user);
        getGitHubRepo(user.id, (repo, error) => {
            console.log('[main @' + new Date().toLocaleTimeString() + '] User: "' + user.name + '" has these repos:', repo);
        })
    }
    else
        console.log('There was an error!');
})

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