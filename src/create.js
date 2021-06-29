import chalk from 'chalk'
import symbol from 'log-symbols'
import { 
  foldNotExist,
  prompt,
  gitCloneTemplate,
  templateRespository,
  updateJsonFile
} from './utils'
/**
 * 创建项目总共分成两大步骤：
 * 1. 选择项目路径和项目文件夹名称（项目名称不能与其他文件夹名称重复）
 * 2. 问询用户项目预装选项
 * 3. 拉去远程模版到本地
 * 4. 用户输入个性化的package.json信息，并同步到本地的package.json中
 */

const create = function (projectName) { 
  if(projectName === undefined) {
    console.log(symbol.error, chalk.red('创建项目的时候，必须输入项目名'))
  } else {
    // TODO 有个问题：如果真实环境，projectName是一个绝对路径会有问题吗？
    foldNotExist(projectName).then(res => {
      prompt().then((answer) => {
        if(answer.frame === 'react'){
          console.log(symbol.warning, chalk.yellow('暂时只支持vue哦，react已经在路上了，以帮您选择了vue'))
        }
        // 拉取远程仓库模版
        let respository = templateRespository.vue
        gitCloneTemplate(respository, projectName).then(() => {
          console.log('开始改写package.json')
          // 下载完成后，根据用户输入更新配置
          const fileName = `${projectName}/package.json`
          updateJsonFile(fileName, answer)
          .then(() => {
            console.log(symbol.success, chalk.green('配置文件更新完成。'))
          })
        }).catch(err => {
          console.log(symbol.error, chalk.red('项目克隆失败'))
        })
      })
    })
  }
}

module.exports = create