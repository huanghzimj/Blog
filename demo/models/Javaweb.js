/**
 * Created by Administrator on 2018/3/27 0027.
 */

var mongoose = require('mongoose');
var JavawebSchema = require('../schemas/Javaweb');

// 生成表模型
module.exports = mongoose.model('Javaweb', JavawebSchema);