const fs = require('fs');

module.exports = {
    init : function (req, res, data) {
        var path = __dirname.replace(/\\/gi,'/');
        eval(`this.${data.funcNm}(req, res, data, path);`);
    },

    index : function (req, res, data, path) {
        fs.readFile(`${path}/index.html`, (err, page) => {
            if (err) {
                res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
                res.end('페이지가 존재하지 않습니다.');     //404페이지로 변경해야함
            };
            res.end(page);
        });
    },
    
    insertEx : function (req, res) {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            var post = qs.parse(body);
            console.log(post);

            var userData = [[post.userID, post.userPW]];
            console.log(userData);

            conn.query('insert into user(userID, userPW) values(?)', userData, (err, results, fields) => {
                if(err) throw err;

                console.log(results);

                res.writeHead(301,
                    {Location: '/index'}
                );
                res.end();
            });

        });
    }
}