
var mongoose = require('mongoose');
var HoutaiSchema = require('../schemas/Houtai');

// 生成表模型
module.exports = mongoose.model('Houtai', HoutaiSchema);