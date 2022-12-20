export const getHeader = function(uToken: string) {    
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + uToken
    }

    return headers;
}