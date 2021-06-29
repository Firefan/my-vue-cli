import fs from 'fs'
import inquirer from 'inquirer'
import downloadGit from 'download-git-repo'

const foldNotExist = (foldName) => {
  return new Promise((resolve) => {
    if(fs.existsSync(foldName)) {
      console.log('文件夹名已存在，请更换名字重新创建')
    }else {
      resolve()
    }
  })
}

// 询问用户配置信息
const questionList = [
  {
    type: 'list',
    name: 'frame',
    message: 'please choose a frame for your project',
    choices: ['vue', 'react']
  },
  {
    type: 'input',
    name: 'name',
    message: 'please enter your project name:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'please enter your project description:',
  },
  {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name:',
  }
]

const prompt = () => {
  return new Promise((resolve) => {
    inquirer
      .prompt(questionList)
      .then(answer => {
        resolve(answer)
      })
  })
}

const gitCloneTemplate = (respository, projectPath) => {
  return new Promise((resolve, reject) => {
    downloadGit(respository, projectPath, { clone: true }, (err) => {
      if(err){
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

const templateRespository = {
  vue: 'direct:https://github.com/Firefan/vue-source-code-analysis.git'
}

// 更新json配置文件，fs.writeFileSync写文件，fs.readFileSync读文件
/**
 * 
 * @param {String} fileName 项目名/package.json
 * @param {*} answer promptList配置项的值
 */
 let updateJsonFile = (fileName, answer) => {
  return new Promise(resolve => {
    if(fs.existsSync(fileName)){ //文件夹存在才写
      const json = fs.readFileSync(fileName).toString()
      let data = JSON.parse(json)
      Object.keys(answer).map(key => {
        // 将promptList配置项的值写进package.json中
        data[key] = answer[key]
      })
      fs.writeFileSync(fileName, JSON.stringify(data, null, '\t'), 'utf-8')
      resolve()
    }
  })
}

export {
  foldNotExist,
  prompt,
  gitCloneTemplate,
  templateRespository,
  updateJsonFile
}