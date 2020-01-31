const http = require('http');
const router = require('./middleware/router');

var port = (process.argv[2] == null ? 8080 : parseInt(process.argv[2]));

http.createServer( (req, res) => {
    router.init(req, res);
}).listen(port, () => {
    console.log(`${port} start!`);
});



// http.createServer( (req, res) => {
//     if ( req.url ) {

//         fs.readFile( './index', (err, data) => {
//             if (err) throw err;
//             res.end(data);
//         });
//     }
// }).listen(port, () => {
//     console.log(`node web server start! : ${port}`);
// });

