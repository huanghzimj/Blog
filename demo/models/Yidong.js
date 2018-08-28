
var mongoose = require('mongoose');
var YidongSchema = require('../schemas/Yidong');

// 生成表模型
module.exports = mongoose.model('Yidong', YidongSchema);