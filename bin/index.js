#!/usr/bin/env node 
// 上一行代码指定代码解释环境为node
console.log('auto-cli....')

const {program} = require("commander") //命令行工具
const inquirer = require("inquirer")
const fs = require('fs')
const path = require("path")
const childProcess = require("child_process")

program.version(require("../package.json").version);
program
        .command('init <name>') // 定义init命令
        .description("init project web3-react") // //添加自定的描述
        .action(require('./init'))

//这句话一定要写在末尾，用于解析我们定义的命令 并将node的执行参数代入        
program.parse(process.argv) 