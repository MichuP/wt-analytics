// npm install socket.io
// execute this on the bottom of the page, so the page is loaded before the call to node is made (or )
var server = io.connect('http://localhost:8080');
var pageData = wt.track();