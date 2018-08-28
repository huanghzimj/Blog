
var mongoose = require('mongoose');
var PhpSchema = require('../schemas/Php');

// 生成表模型
module.exports = mongoose.model('Php', PhpSchema);