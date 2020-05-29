const Koa = require('koa' );
const router = require('./routers/index');
const app = new Koa();



app.use(router.routes());   /*启动路由*/

app.listen( 3000);
console.log("服务已启动，请访问:http://192.168.1.101:3000/")