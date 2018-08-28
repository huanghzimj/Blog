
var mongoose = require('mongoose');
var WebcontentSchema = require('../schemas/Webcontent');

// 生成表模型
module.exports = mongoose.model('Webcontent', WebcontentSchema);