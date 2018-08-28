
var mongoose = require('mongoose');
var NodeSchema = require('../schemas/Node');

// 生成表模型
module.exports = mongoose.model('Node', NodeSchema);