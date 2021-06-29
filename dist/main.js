'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _create = require('./create');

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.command('create').description('创建一个新项目').alias('c').action(() => {
  (0, _create2.default)(...process.argv.slice(3));
});

_commander2.default.parse(process.argv);

//命令后不带参数的时候，输出帮助信息
if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp();
}