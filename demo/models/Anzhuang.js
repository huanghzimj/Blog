
var mongoose = require('mongoose');
var AnzhuangSchema = require('../schemas/Anzhuang');

// 生成表模型
module.exports = mongoose.model('Anzhuang', AnzhuangSchema);