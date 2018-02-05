//modules
const koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const body = require('koa-body');
const render = require('./lib/render');
const serve = require('koa-static');
const session = require('koa-session');
const db = require('mongoose');
//create instance
const app = new koa();
const router = new Router();
//CONFIG
const SESSIONCONFIG={ key:'packetracer' };
const MONGOURI = "mongodb://localhost:27017/test";
app.keys = ['Logpacket'];
//connect DB
db.Promise = global.Promise;
db.connect(MONGOURI)
    .then(()=>console.log("connected on mongodb"))
.catch(err => console.error(err));
//route function modules
const {postOne,postList,postDelete,postEdit,postUpload} = require('./route/Post');
const index = require('./route/index');
app.use(session(SESSIONCONFIG,app));
app.use(logger());
app.use(body());
app.use(render);
app.use(serve(__dirname+'/public'));

router.get('/',postList)
    .post('/upload',postUpload)
    .get('/post/:title',postOne)
    .delete('/post/:title',postDelete)
    .put('/post/:title',postEdit);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(80,()=>{console.log('listening on port 80')});
