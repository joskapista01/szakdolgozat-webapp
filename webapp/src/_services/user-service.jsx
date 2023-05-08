import { authHeader } from '../_helpers/auth-header';

import { Buffer } from 'buffer';

export const userService = {
    login,
    register,
    logout,
    getServers,
    getServerInfo,
    deleteServer,
    updateServer,
    createServer
};

const apiUrl = process.env.REACT_APP_API_URL

// Sends a login request to the server with the recieved parameters to authenticate the user
function login(username, password) {
    const credentials = Buffer.from(username+':'+password).toString('base64')
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 
            'Authorization': 'Basic ' + credentials
         }
    };
    

    return fetch(apiUrl+`/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                // store user details and basic auth credentials in local storage 
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

// Sends a register user request to the server with the parameters recieved
function register(username, password) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    };

    return fetch(apiUrl+`/users/register`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return login(username, password)
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

//handles responses from server
//if successful, then returns the response data, else handles the error
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                window.location.reload(true);
            } else if(response.status == 400) {
                const error = (data && data.message) || response.statusText;
                alert(error)
                return Promise.reject(error);
            } else if(response.status == 500)
            {
                const error = "Something went wrong!"
                alert(error)
                return Promise.reject(error);
            }
            else {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
        }
        return data;
    });
}

// Sends a request to the server to get the list of the users servers
function getServers() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(apiUrl+`/servers`, requestOptions).then(handleResponse);
}

// Sends a request to the server to retrive information about the server with the id recieved in the parameter
function getServerInfo(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(apiUrl+`/server/`+id, requestOptions).then(handleResponse);
}

// Sends a request to the server to delete the server with the id recieved in the parameter
function deleteServer(id){
    const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(apiUrl+`/server/`+id, requestOptions).then(handleResponse);
}
// Sends a request to the server to update the server with the id recieved in the parameter
function updateServer(id){
    const requestOptions = {
        method: 'PUT',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(apiUrl+`/server/`+id, requestOptions).then(handleResponse);
}

function createServer(serverName){
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: authHeader(),
        body: JSON.stringify({
            name: serverName
        })
    };
    requestOptions.headers['Content-Type'] =  'application/json'


    return fetch(apiUrl+`/server`, requestOptions).then(handleResponse);
}
