// node自带的工具库util
// promisify可以将普通的方法包装成promise风格
const { promisify } = require("util");

// figlet可以在命令行输出类似logo的海报，用于打印欢迎页面，是一个异步过程
const figlet = promisify(require("figlet"));
// 清屏
const clear = require("clear");
// chalk可以修改命令行输出的字符颜色
const chalk = require("chalk");
// 载项目模板
const { clone } = require("./download");

const log = (content) => console.log(chalk.green(content));

// 开启子进程
const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((resolve) => {
    const proc = spawn(...args);
    // spwan开启的子进程返回两个标准输出 stdout 和 stderr 的流对象
    // 通过管道将pipe将子进程的流对象导入到主进程process
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    proc.on("close", () => {
      resolve();
    });
  });
};

module.exports = async (name) => {
  clear();
  const welcomeContent = await figlet(`kai yang Welcome`);
  log(welcomeContent);

  // 下载项目模板
  // 利用download-git-repo库下载项目，地址要求做一定的修改
  const repoName = "git@github.com:keven0403/web3-react.git";
  log("创建项目：");
  clone(repoName, name);

  // 安装依赖
  log("安装依赖");
  await spawn("cnpm", ["install"], { cwd: `./${name}` });
  log(`
  👌安装完成
  To get Start:
  =================
  cd ${name}
  npm run start
  =================
  `);
};

