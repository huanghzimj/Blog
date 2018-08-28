/**
 * Created by Administrator on 2017/12/24 0024.
 */
var mongoose = require('mongoose');
var WebmokuaiSchema = require('../schemas/Web');

// 生成表模型
module.exports = mongoose.model('Web', WebmokuaiSchema);