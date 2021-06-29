'use strict';

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 创建项目总共分成两大步骤：
 * 1. 选择项目路径和项目文件夹名称（项目名称不能与其他文件夹名称重复）
 * 2. 问询用户项目预装选项
 * 3. 拉去远程模版到本地
 * 4. 用户输入个性化的package.json信息，并同步到本地的package.json中
 */

const create = function (projectName) {
  if (projectName === undefined) {
    console.log(_logSymbols2.default.error, _chalk2.default.red('创建项目的时候，必须输入项目名'));
  } else {
    // TODO 有个问题：如果真实环境，projectName是一个绝对路径会有问题吗？
    (0, _utils.foldNotExist)(projectName).then(res => {
      (0, _utils.prompt)().then(answer => {
        if (answer.frame === 'react') {
          console.log(_logSymbols2.default.warning, _chalk2.default.yellow('暂时只支持vue哦，react已经在路上了，以帮您选择了vue'));
        }
        // 拉取远程仓库模版
        let respository = _utils.templateRespository.vue;
        (0, _utils.gitCloneTemplate)(respository, projectName).then(() => {
          console.log('开始改写package.json');
          // 下载完成后，根据用户输入更新配置
          const fileName = `${projectName}/package.json`;
          (0, _utils.updateJsonFile)(fileName, answer).then(() => {
            console.log(_logSymbols2.default.success, _chalk2.default.green('配置文件更新完成。'));
          });
        }).catch(err => {
          console.log(_logSymbols2.default.error, _chalk2.default.red('项目克隆失败'));
        });
      });
    });
  }
};

module.exports = create;