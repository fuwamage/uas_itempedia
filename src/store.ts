export const getHeader = function() {
    const tokenData = JSON.parse(window.localStorage.getItem('dataUser') as any);
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + window.atob(tokenData.access_token)
    }

    return headers;
}