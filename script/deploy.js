require('dotenv').config();

const fs = require('fs');
const path = require('path');
const util = require('util');
const OSS = require('ali-oss');

const promisifyReaddir = util.promisify(fs.readdir);
const promisifyStat = util.promisify(fs.stat);

const client = new OSS({
  bucket: process.env.ALIYUN_BUCKET,
  region: process.env.ALIYUN_OSS_REGION,
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
});

const publicPath = path.resolve(__dirname, '../_book');

async function run(proPath = '') {
  const dir = await promisifyReaddir(`${publicPath}${proPath}`);

  for (let i = 0; i < dir.length; i++) {
    const stat = await promisifyStat(
      path.resolve(`${publicPath}${proPath}`, dir[i])
    );

    if (stat.isFile()) {
      const fileStream = fs.createReadStream(
        path.resolve(`${publicPath}${proPath}`, dir[i])
      );
      console.log(`上传文件: ${proPath}/${dir[i]}`);
      const result = await client.putStream(`${proPath}/${dir[i]}`, fileStream);
    } else if (stat.isDirectory()) {
      await run(`${proPath}/${dir[i]}`);
    }
  }
}

run();
