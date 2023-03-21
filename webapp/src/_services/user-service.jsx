import { authHeader } from '../_helpers/auth-header';

import { Buffer } from 'buffer';

export const userService = {
    login,
    logout,
    getServers,
    getServerInfo,
    deleteServer,
    updateServer,
    createServer/*,
    getAll*/
};

const apiUrl = process.env.REACT_APP_API_URL

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
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

/*unction getAll() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(`http://localhost:5160/users`, requestOptions).then(handleResponse);
}*/

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

function getServers() {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(apiUrl+`/servers`, requestOptions).then(handleResponse);
}

function getServerInfo(id) {
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(apiUrl+`/server/`+id, requestOptions).then(handleResponse);
}

function deleteServer(id){
    const requestOptions = {
        method: 'DELETE',
        mode: 'cors',
        headers: authHeader()
    };

    return fetch(apiUrl+`/server/`+id, requestOptions).then(handleResponse);
}

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
