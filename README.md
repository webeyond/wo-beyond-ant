
<h1 align="center">wo-beyond</h1>

<div align="center">

沃超越项目，主要用于地推销售联通卡业务，本项目为前台部分      [此版本是未安装类库版]。。

<h5 align="center">下面是部分项目运行图：</h5>

大屏展示：
![](https://images.gitee.com/uploads/images/2018/1021/160619_0b25eddd_1326542.jpeg)
热门分析：
![](https://images.gitee.com/uploads/images/2018/1021/160723_5d45d0a1_1326542.jpeg)
指标仪表盘：
![](https://images.gitee.com/uploads/images/2018/1021/160821_880cc7b0_1326542.jpeg)
漏斗分析：
![](https://images.gitee.com/uploads/images/2018/1021/160908_c861a425_1326542.jpeg)
潜在客户地址：
![](https://images.gitee.com/uploads/images/2018/1021/160943_84d9ec89_1326542.jpeg)
地推专员管理：
![](https://images.gitee.com/uploads/images/2018/1021/161056_6521a4d5_1326542.jpeg)

</div>

- 预览：http://preview.pro.ant.design
- 首页：http://pro.ant.design/index-cn
- 使用文档：http://pro.ant.design/docs/getting-started-cn
- 更新日志: http://pro.ant.design/docs/changelog-cn
- 常见问题：http://pro.ant.design/docs/faq-cn
- 国内镜像：http://ant-design-pro.gitee.io



## 使用

### 使用命令行
```bash
$ git clone https://github.com/webeyond/wo-beyond-ant-clean.git --depth=1
$ cd wo-beyond-ant-clean
$ npm install
$ npm install --save jquery
$ npm install echarts --save
$ npm install echarts-for-react --save
$ npm start         # 访问 http://localhost:8000
```


### 国内建议使用cnpm效率更高
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org --save
$ cnpm -v            # 检查是否安装成功
$ cnpm install
$ cnpm install --save jquery
$ cnpm install echarts --save
$ cnpm install echarts-for-react --save
$ cnpm start         # 访问 http://localhost:8000
```


### Git常用命令
```bash
$ git add -A
$ git commit -m "first commit"
$ git remote add origin https://github.com/webeyond/wo-beyond-ant-clean.git
$ git push -u origin master

【修改远程仓库】
$ git remote set-url --push origin https://github.com/webeyond/wo-beyond-ant-clean.git  
【[remote rejected] master -> master (shallow update not allowed)错误时使用】
$ git fetch --unshallow origin  
【拉取远程仓库并重命名】
git clone --depth=1 https://github.com/webeyond/wo-beyond-ant-clean.git my-project
【还原到历史提交节点】
$ git reset  --hard commit_id  
$ git reset  --hard 0dc1ec4c37d13bb7f846305cfc90ac57c61f4852  
$ git commit -m"something change..."  -n 
【出现这个错误时：pre-commit hook failed (add –no-verify to bypass)】 
$ git commit -m "something..." -n
 
```

### 使用 docker

```bash
// dev 
$ npm run docker:dev

// build 
$ npm run docker:build


// production dev 
$ npm run docker-prod:dev

// production build 
$ npm run docker-prod:build
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

