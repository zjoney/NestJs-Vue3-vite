Language : [🇺🇸](./README.md) | 🇨🇳

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> <a href="http://nodejs.org" target="_blank">Node.js</a> 一个用于构建高效、可扩展服务端应用的渐进式框架。</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 1.0 is out! 🎉🎉🎉
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
# Vue3+NestJS 全栈开发企业级管理后台

## 代码结构
```bash
├── src # 项目源码
|  ├── exception # 异常处理
|  ├── modules # 模块源码
|  |  ├── auth # 登录模块
|  |  ├── book # 电子书模块
|  |  ├── menu # 菜单模块
|  |  └── user # 用户模块
|  └── utils # 工具方法
```

## 实现功能：
- 登录
- 文件上传
- EPUB 电子书解析
- 新增/编辑电子书
- 电子书列表
- 删除电子书
## 涉及技术点包括：
-  JWT 认证
-  EPUB 解析电子书
-  XML 解析
-  ZIP 解压
-  MULTER 文件上传
-  MySQL 数据库操作

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言
- **主题**：可配置的主题
- **国际化**：内置完善的国际化方案
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 环境搭建和数据准备
首先，确保你已经在Mac上安装了[Docker](https://docs.docker.com/engine/install)。你可以从Docker的官方网站下载Docker for Mac。

## 1、Docker 安装MySQL8和Nginx服务器（对比方案2，二选一）

### 1.1.1安装Nginx

```sh
$ docker pull nginx:latest  // 拉取Nginx镜像
$ docker run -d -p 4000:80 --name my-nginx nginx  // 运行Nginx容器
$ docker run -d -p 4000:80 --name my-nginx nginx  // 运行Nginx容器
```
### 1.1.2 访问Nginx
在浏览器中访问http://127.0.0.1:4000

### 进入Nginx容器(上面成功了，可以忽略这一步)
```sh
docker exec -it my-nginx bash
```
### 1.1.3 挂载本地文件
```sh
$ mkdir -p ~/docker/nginx/{conf,html,logs} //创建本地文件夹
$ // 将Nginx容器中的文件复制到本地
docker cp my-nginx:/etc/nginx/nginx.conf ~/docker/nginx/conf/nginx.conf
docker cp my-nginx:/usr/share/nginx/html ~/docker/nginx/html
docker cp my-nginx:/var/log/nginx ~/docker/nginx/logs

```
### 1.1.4 修改Nginx配置文件
```sh
# 本地的nginx.conf文件，根据需要进行修改
server {
listen 8080;
server_name localhost;

location / {
proxy_pass http://127.0.0.1:5000;
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
}
}

server
{ 
  charset utf-8;
  listen 8089;
  server_name http_host;
  root /Users/qingmou/upload/;
  autoindex on;
  add_header Cache-Control "no-cache, must-revalidate";
  location / { 
    add_header Access-Control-Allow-Origin *;
  }
}

```****

### 1.1.5 重启并挂载文件,多行命令一键输入
```sh
docker run --name my-nginx -p 4000:80 \
-v ~/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v ~/docker/nginx/html:/usr/share/nginx/html \****
-v ~/docker/nginx/logs:/var/log/nginx -d nginx
```
### 1.1.6 提示报错
my-nginx 已经启动，这个时候重启就行

### 1.2安装mysql 并且启动
```sh
$ docker pull mysql:8  // 拉取镜像
```

## 2、独立安装（对比方案1，二选一）
### MySQL8 安装教程

- 安装教学：
[https://blog.csdn.net/rbx508780/article/details/127176754](https://blog.csdn.net/rbx508780/article/details/127176754)
- 官网下载：
[https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)

### Nginx服务器搭建
http://www.youbaobao.xyz/admin-docs/guide/exercise/prepare.html


## 3、SQL 脚本

- 存放目录/sql/initSql

## 4、电子书链接
- 什么算epub电子书？可参考：
https://www.imooc.com/video/17776

- 未解压的电子书：
链接: https://pan.baidu.com/s/1kl8KFSSs21tqJPjk5vKZ7g 提取码: d44s

- 解压后的电子书：
链接: https://pan.baidu.com/s/1kh_BS_oZS8GQMZkgplK_GA 提取码: 8p6d


## 5、项目启动

```bash
$ npm install
```

## 6、编译和运行

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 7、测试

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 8、部署

当您准备将 NestJS 应用部署到生产环境时，可以采取以下关键步骤以确保其高效运行。更多信息请查阅[部署文档](https://docs.nestjs.com/deployment)。

如果您正在寻找基于云的平台来部署 NestJS 应用，请查看 [Mau](https://mau.nestjs.com)——我们官方提供的 AWS 部署平台。Mau 使部署变得简单快捷，只需几个简单步骤：

```bash
$ npm install -g mau
$ mau deploy
```

通过 Mau，您只需点击几下即可完成应用部署，从而专注于功能开发而非基础设施管理。

## 9、资源

以下资源可能对使用 NestJS 有所帮助：

- 访问 [NestJS 文档](https://docs.nestjs.com) 深入了解框架。
- 如需提问或支持，请加入我们的 [Discord 频道](https://discord.gg/G7Qnnhy)。
- 想深入学习并获得实践经验？查看我们的官方视频[课程](https://courses.nestjs.com/)。
- 借助 [NestJS Mau](https://mau.nestjs.com) 一键将应用部署至 AWS。
- 使用 [NestJS 开发者工具](https://devtools.nestjs.com) 可视化应用依赖图并实时交互。
- 需要项目协助（兼职到全职）？查看我们的官方[企业支持](https://enterprise.nestjs.com)。
- 关注我们的 [X（推特）](https://x.com/nestframework) 和 [LinkedIn](https://linkedin.com/company/nestjs) 获取最新动态。
- 求职或招聘？访问官方[职位公告板](https://jobs.nestjs.com)。

## 10、支持

Nest 是 MIT 许可的开源项目，其发展离不开赞助者和支持者的贡献。如果您想加入他们，请[点击此处了解详情](https://docs.nestjs.com/support)。

## 11、保持联系

- 作者 - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- 官网 - [https://nestjs.com](https://nestjs.com/)
- 推特 - [@nestframework](https://twitter.com/nestframework)

## 12、许可

Nest 采用 [MIT 许可](https://github.com/nestjs/nest/blob/master/LICENSE)。

## 13、浏览器支持

现代浏览器.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

#