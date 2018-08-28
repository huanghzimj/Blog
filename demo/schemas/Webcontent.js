
var mongoose = require('mongoose');

// 用户表结构
// 真正操作数据库的时候不接触表，而是操作更抽象一层的表模型
module.exports = new mongoose.Schema({
    category:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'Web'
},
    title:String,
    content:String,
    jianjie:String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addTime: {
        type: Date,
        default: new Date()
    },

   // 评论
    comments: {
        type: Array,
        default: []
    },

    dianzan:{
    type: Number,
default: 0
},    yuedu:{
    type: Number,
default: 0
}, shoucang:{
    type: Number,
default: 0
},

});