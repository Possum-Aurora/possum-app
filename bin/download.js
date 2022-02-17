const { promisify } = require("util");

module.exports.clone = async function (repo, dest) {
  const download = promisify(require("download-git-repo"));
  // 下载项目模板过程中展示loading
  const ora = require("ora");
  const process = ora(`下载ing......${repo}`);
  process.start();
  await download(repo, dest);
  process.succeed();
}