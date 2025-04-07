Language : 🇺🇸 | [🇨🇳](./README.zh-CN.md)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
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
# Vue3 + NestJS Full-Stack Development for Enterprise-Level Management Backend  

## Code Structure  
```bash  
├── src # Project source code  
|  ├── exception # Exception handling  
|  ├── modules # Module source code  
|  |  ├── auth # Login module  
|  |  ├── book # E-book module  
|  |  ├── menu # Menu module  
|  |  └── user # User module  
|  └── utils # Utility methods  
``` 

## Features to implement:
- Login  
- File upload  
- EPUB ebook parsing  
- Add/Edit ebooks  
- Ebook list  
- Delete ebooks  

## Technical points involved:  
- JWT authentication  
- EPUB ebook parsing  
- XML parsing  
- ZIP decompression  
- MULTER file upload  
- MySQL database operations

## Feature

- **State of The Art Development**：Use front-end front-end technology development such as Vue3/vite2
- **TypeScript**: Application-level JavaScript language
- **Theming**: Configurable themes
- **International**：Built-in complete internationalization program
- **Mock Server** Built-in mock data scheme
- **Authority** Built-in complete dynamic routing permission generation scheme.
- **Component** Multiple commonly used components are encapsulated twice


## Environment Setup and Data Preparation  
First, ensure you have installed [Docker](https://docs.docker.com/engine/install) on your Mac. You can download Docker for Mac from Docker's official website.  

## 1. Docker Installation of MySQL 8 and Nginx Server (Option 1, choose between Option 1 and Option 2)  

### 1.1.1 Install Nginx  

```sh  
$ docker pull nginx:latest  // Pull the Nginx image  
$ docker run -d -p 4000:80 --name my-nginx nginx  // Run the Nginx container  
$ docker run -d -p 4000:80 --name my-nginx nginx  // Run the Nginx container  
```  

### 1.1.2 Access Nginx  
Visit http://127.0.0.1:4000 in your browser.  

### Enter the Nginx Container (Skip this step if the above succeeds)  
```sh  
docker exec -it my-nginx bash  
```  

### 1.1.3 Mount Local Files  
```sh  
$ mkdir -p ~/docker/nginx/{conf,html,logs} // Create local folders  
$ // Copy files from the Nginx container to the local machine  
docker cp my-nginx:/etc/nginx/nginx.conf ~/docker/nginx/conf/nginx.conf  
docker cp my-nginx:/usr/share/nginx/html ~/docker/nginx/html  
docker cp my-nginx:/var/log/nginx ~/docker/nginx/logs  
```  

### 1.1.4 Modify the Nginx Configuration File  
```sh  
# Local nginx.conf file, modify as needed  
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
```  

### 1.1.5 Restart and Mount Files (Multi-line command for one-click input)  
```sh  
docker run --name my-nginx -p 4000:80 \  
-v ~/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \  
-v ~/docker/nginx/html:/usr/share/nginx/html \  
-v ~/docker/nginx/logs:/var/log/nginx -d nginx  
```  

### 1.1.6 Error Prompt  
If my-nginx is already running, simply restart it.  

### 1.2 Install MySQL and Start  
```sh  
$ docker pull mysql:8  // Pull the image  
```
## 2. Standalone Installation (Option 2, choose between Option 1 and Option 2)  
### MySQL 8 Installation Guide  

- Installation Tutorial:  
[https://blog.csdn.net/rbx508780/article/details/127176754](https://blog.csdn.net/rbx508780/article/details/127176754)  
- Official Download:  
[https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)  

### Nginx Server Setup  
http://www.youbaobao.xyz/admin-docs/guide/exercise/prepare.html  

## 3. SQL Scripts  

- Directory: `/sql/initSql`  

## 4. E-book Links  
- What is an EPUB e-book? Reference:  
https://www.imooc.com/video/17776  

- Unzipped e-books:  
Link: [https://pan.baidu.com/s/1kl8KFSSs21tqJPjk5vKZ7g](https://pan.baidu.com/s/1kl8KFSSs21tqJPjk5vKZ7g)  
Extraction code: d44s  

- Extracted e-books:  
Link: [https://pan.baidu.com/s/1kh_BS_oZS8GQMZkgplK_GA](https://pan.baidu.com/s/1kh_BS_oZS8GQMZkgplK_GA)  
Extraction code: 8p6d  

## 5、Project Startup  

```bash  
$ npm install  
```  

## 6、Compilation and Execution  

```bash  
# development  
$ npm run start  

# watch mode  
$ npm run start:dev  

# production mode  
$ npm run start:prod  
```  

## 7、Testing  

```bash  
# unit tests  
$ npm run test  

# e2e tests  
$ npm run test:e2e  

# test coverage  
$ npm run test:cov  
```  

## 8、Deployment  

When you're ready to deploy your NestJS application to production, follow these key steps to ensure it runs efficiently. For more information, refer to the [Deployment Documentation](https://docs.nestjs.com/deployment).  

If you're looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com)—our officially provided AWS deployment platform. Mau makes deployment simple and fast, requiring just a few easy steps:  

```bash  
$ npm install -g mau  
$ mau deploy  
```  

With Mau, you can deploy your application in just a few clicks, allowing you to focus on feature development rather than infrastructure management.  

## 9、Resources  

The following resources may be helpful for working with NestJS:  

- Visit the [NestJS Documentation](https://docs.nestjs.com) to dive deeper into the framework.  
- For questions or support, join our [Discord Channel](https://discord.gg/G7Qnnhy).  
- Want to learn in-depth and gain hands-on experience? Check out our official video [courses](https://courses.nestjs.com/).  
- Deploy your app to AWS with one click using [NestJS Mau](https://mau.nestjs.com).  
- Visualize your application's dependency graph and interact in real-time with [NestJS DevTools](https://devtools.nestjs.com).  
- Need project assistance (part-time to full-time)? Explore our official [Enterprise Support](https://enterprise.nestjs.com).  
- Follow us on [X (Twitter)](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs) for the latest updates.  
- Job hunting or hiring? Visit the official [Job Board](https://jobs.nestjs.com).  

## 10、Support  

Nest is an MIT-licensed open-source project, and its development relies on contributions from sponsors and supporters. If you'd like to join them, [click here to learn more](https://docs.nestjs.com/support).  

## 11、Stay Connected  

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)  
- Official Website - [https://nestjs.com](https://nestjs.com/)  
- Twitter - [@nestframework](https://twitter.com/nestframework)  

## 12、License  

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).  

## 13、Browser Support  

Modern browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                  | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           |

#