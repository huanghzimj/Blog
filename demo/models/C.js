
var mongoose = require('mongoose');
var CSchema = require('../schemas/C');

// 生成表模型
module.exports = mongoose.model('C', CSchema);