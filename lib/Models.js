const db = require('mongoose');
const Schema = db.Schema;
const postSchema = new Schema({
    title:{type:String},
    contents:{
        img:{type:Buffer},
        string:{type:String}
    },
    comments:[{
        writer:{type:String},
        content:{type:String},
        date:{type:Date,Default:Date.now()}
    }]
});
exports.postModel = db.model('Post',postSchema);