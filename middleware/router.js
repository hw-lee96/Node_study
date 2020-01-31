const fs = require('fs');
const urlParser = require('url');

// 관리하는 페이지가 많아짐에 따라서 코드의 복잡도가 급격히 높아지게 됩니다. 복잡도를 낮추는 방법이 라우터입니다.  
// 출처 : 생활코딩

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