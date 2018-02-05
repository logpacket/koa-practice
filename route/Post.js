const postModel = require('../lib/Models').postModel;
exports.postUpload = async function postUpload(ctx,next){
    const body = ctx.request.body;
    console.log(body.title);
    const post = new postModel({
        title: body.title,
        contents: {
            img: body.img,
            string: body.string
        }
    });
    await post.save(()=>console.log('save success'));
    await ctx.response.redirect('/');
    await next();
};
exports.postDelete = async function postDelete(ctx,next){
    const title = ctx.params.title;
    postModel.remove({title:title})
        .then(()=>console.log('delete success title:'+title))
        .catch(err=>console.error(err));
    await ctx.response.redirect('/');
    await next();
};
exports.postEdit = async function postEdit(ctx,next){
    const id = ctx.params;
    const body = ctx.request.body;
    const post = {
        title:body.title,
        content:{
            img:body.img,
            string:body.string
        },
        comment:[]
    };
    postModel.updateOne({title:body.title},post)
        .then(()=>console.log('update success id:'+id))
        .catch(err=>console.error(err));
    await next();
};
exports.postList = async function postList(ctx,next){
    await postModel.find({})
      .then(async result=> {
          await ctx.render('index',{posts:result});
      })
      .catch(err=>console.error(err));
    await next();
};
exports.postOne = async function postOne(ctx,next){
    const title = ctx.params.title;
    await postModel.findOne({title:title})
        .then(async result =>{
            await ctx.render('post',{post:result})
        })
        .catch(err=>console.error(err));
    await next();
};