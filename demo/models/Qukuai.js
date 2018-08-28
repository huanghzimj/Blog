
var mongoose = require('mongoose');
var QukuaiSchema = require('../schemas/Qukuai');

// 生成表模型
module.exports = mongoose.model('Qukuai', QukuaiSchema);