const http = require('http');
const router = require('./middleware/router');

var port = (process.argv[2] == null ? 8080 : parseInt(process.argv[2]));

http.createServer( (req, res) => {
    router.init(req, res);
}).listen(port, () => {
    console.log(`${port} start!`);
});