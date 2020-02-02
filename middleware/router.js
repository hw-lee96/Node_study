const urlParser = require('url');

// 페이지가 많아짐에 따라 코드 복잡도가 높아지며, 복잡도를 낮추기 위해 라우팅을 한다.

module.exports = {
    init : function (req, res) {
        var path = urlParser.parse(req.url).pathname.split('/');
        var dir = path.reduce( (acc, current,idx, arr) => {
            if (arr.length-1 == idx) return acc;
            return acc+"/"+current;
        });

        var contPrefix = path[path.length-2] == '' ? 'index' : path[path.length-2];     
        var funcNm = path[path.length-1] == '' ? 'index' : path[path.length-1];     
        var GETParam = this.processingJson(urlParser.parse(req.url).query);        // querystring을 json으로 변환
        
        console.log(req);

        var data = {
            dir : dir,                                  // 파일 경로
            contPrefix : contPrefix,                    // Controller 앞에 붙일 접두사
            funcNm : funcNm,                            // 호출 할 함수명
            GETParam : GETParam,                        // querystring으로 전달된 값
            method : req.method                         // 요청 method 타입
        }
        this.routing(req, res, data);
    },

    processingJson : function (querystring) {
        if ( querystring == '' || querystring == null ) return '';
        var param = querystring
                    .split('&')                                 // '&'로 스플릿
                    .map(v=>v.split('='))                       // map으로 각 원소를 '='로 스플릿
                    .map( ([k,...vs]) => [k, vs.join('=')])     //join함수로 key가 아닌 value에 split된 '='을 다시 합쳐줌
                    .reduce((acc, [k,v]) => {                   // reduce로 key = value형태로 변환
                        acc[k.trim()] = decodeURIComponent(v);
                        return acc;
                    }, {});
        return param;
    },

    routing : function (req, res, data) {
        try {
            let controller = require(`../view${data.dir}/${data.contPrefix}/${data.contPrefix}Controller`);
            controller.init(req, res, data);
        } catch(e) {
            console.log(e);
        }
    }
}