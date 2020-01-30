const fs = require('fs');
const urlParser = require('url');

module.exports = {
    init : function (req, res) {
        var path = urlParser.parse(req.url).pathname.split('/');
        var dir = path.reduce( (acc, current,idx, arr) => {
            if (arr.length-1 == idx) return acc;
            return acc+"/"+current;
        });

        var fileName = path[path.length-1] == '' ? 'index' : path[path.length-1];

        var data = {
            dir : dir,
            fileName : fileName,
            param : urlParser.parse(req.url).query                      //querystring으로 전달된 값
        }
        
        this.routing(req, res, data);
    },
    routing : function (req, res, data) {
        fs.readFile(`./view${data.dir}/${data.fileName}.html`, (err, page) => {
            if (err) {
                res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
                res.end('페이지가 존재하지 않습니다.');     //404페이지로 변경해야함
            };
            //data 넘기는 내용 추가해야함
            res.end(page);
        });
    }
}