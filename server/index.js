const request = require('request')

class myServer {
    constructor() { }




    getWeiXinCode({ code }) {
        let url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx1a78863248bcba9b&secret=8b80e1f52f1db57f8fbdf3db4bea7629&js_code=${code}&grant_type=authorization_code`
        var options = {
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'  // 需指定这个参数 否则 在特定的环境下 会引起406错误
            }
        }
        return new Promise((resole,reject)=>{
            request(options, function (err, res, body) {
                if (err) {
                    throw err
                } else {
                    resole(body)
                }
            })
        })
    }
}

module.exports = new myServer()