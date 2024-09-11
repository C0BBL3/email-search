chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {    
    if (request.contentScriptQuery == 'GET') {
        fetch(request.url, { method: 'GET', headers: request.headers }).then(
            response => response.json()
        ).then(
            response => sendResponse(response)
        ).catch(
            error => console.log('Error:', error)
        );
        return true;
    }
    
    if (request.contentScriptQuery == 'POST') {
        fetch(request.url, {method: 'POST', headers: request.headers, body: request.body}).then(
            response => response.json()
        ).then(
            response => sendResponse(response)
        ).catch(
            error => console.log('Error:', error)
        );
        return true;
    }
});