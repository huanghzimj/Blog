var mongoose = require('mongoose');

// 用户表结构
// 真正操作数据库的时候不接触表，而是操作更抽象一层的表模型
module.exports = new mongoose.Schema({
    username: String,
    password: String,
    avatarUrl:String,//头像url
    niceng:String,
    signature:String,
    sex:String,
    datetime:String,
    telephone:String,
    gexing:String,
    email:String,
    name:String,
    intro:String,
    xuexing:String,
    biyexuexiao:String,
    address:String,
    mibao:String,
    xingqu:String,
    weixin:String,
    beijing:String,
    qq:String,
    // 浏览量
       fanwen: {
        type: Number,
        default: 0
    },
    yuanchuang: {
        type: Number,
        default: 0
    },   fensi: {
        type: Number,
        default: 0
    },   xihuan: {
        type: Number,
        default: 0
    },
    huida: {
        type: Number,
        default: 0
    },
    paiming: {
        type: Number,
        default: 0
    },
    jifen: {
        type: Number,
        default: 0
    },
    isAdmin: {
    type: Boolean,
    default: false
  }
});
