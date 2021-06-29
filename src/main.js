import program from 'commander'
import create from './create'

program
  .command('create')
  .description('创建一个新项目')
  .alias('c')
  .action(() => {
    create(...process.argv.slice(3))
  })

program.parse(process.argv)

//命令后不带参数的时候，输出帮助信息
if (!process.argv.slice(2).length) {
  program.outputHelp()
}