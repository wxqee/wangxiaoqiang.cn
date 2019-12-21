[![Build Status](https://secure.travis-ci.org/wxqee/wangxiaoqiang.cn.png)](http://travis-ci.org/wxqee/wangxiaoqiang.cn)
## Description

Let's say my site is deployed on AliYun OSS, and can be accessed from AliYun CDN.

## Available scripts

### `yarn build`

will build source files in `src/` and `public/`, and output into `build/`.

### `yarn deploy`

before this, you need to create an env file `.env` by copy from `.env.example`.

This script will deploy whole sites onto AliYun OSS.
