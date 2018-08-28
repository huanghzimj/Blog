
var mongoose = require('mongoose');
var JichuSchema = require('../schemas/Jichu');

// 生成表模型
module.exports = mongoose.model('Jichu', JichuSchema);