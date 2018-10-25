// Import required libs
const http = require('http');
const url = require('url');

// Create and Configure the Server
const server = http.createServer((req, res) => 
{
    // Get the Url, Path, Method and Headers
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname.replace(/^\/+|\/+$/g, '');
    const { method, headers } = req;

    // Create a new Request Handler and find the Requested Route
    const router = new handlers();
    const currentHandler = router[path] ? router[path] : router.notFound;

    // Prepare the data to be sent 
    const data = { method, url, path, headers };

    // Send the response back for the http request
    currentHandler(data, (statusCode, message) => {
        res.writeHead(statusCode, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(message));
        res.end();
    });
});

// Start the Server on port 3000 and Listen for Incoming Requests.
server.listen(3000, () =>{
    console.log('The server is running and listening on port 3000');
});

// Create Handlers for Incoming Requests.
class handlers
{
    hello(data, callback)
    {
        callback(200, { 'message': 'Hello World. Greetings From Node.js Master Class Assignment 1' });
    }
    notFound(data, callback)
    {
        callback(404, { 'message': 'The requested page was not found.' });
    }
}