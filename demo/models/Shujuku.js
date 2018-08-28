
var mongoose = require('mongoose');
var ShujukuSchema = require('../schemas/Shujuku');

// 生成表模型
module.exports = mongoose.model('Shujuku', ShujukuSchema);