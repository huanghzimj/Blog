
var mongoose = require('mongoose');
var ChengxurenshengSchema = require('../schemas/Chengxurensheng');

// 生成表模型
module.exports = mongoose.model('Chengxurensheng', ChengxurenshengSchema);