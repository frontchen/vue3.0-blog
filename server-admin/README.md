# vue3.0-blog

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build
```

### Run your preview

```
yarn run serve
```

## 文件目录

├── README.md
├── babel.config.js
├── index.html
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   └── images
│   ├── 401.gif
│   ├── 404.png
│   ├── 404_cloud.png
│   ├── bg.png
│   ├── ch.png
│   ├── en.png
│   ├── green.png
│   ├── login.png
│   ├── welcome\ -\ ?\211??\234?.png
│   └── welcome.png
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── iconfont
│   │   ├── images
│   │   └── style
│   ├── common //公用页面
│   │   ├── Login.vue
│   │   ├── Main.vue
│   │   ├── MainFooter.vue
│   │   ├── MainHeader.vue
│   │   ├── MainHome.vue
│   │   ├── MainLayout.vue
│   │   ├── MainScreenFull.vue
│   │   ├── MainSetting.vue
│   │   ├── NotFound.vue
│   │   ├── Panel.vue
│   │   ├── Register.vue
│   │   └── menu
│   ├── components //公用组件
│   │   ├── breadCrumb
│   │   └── hamBurger
│   ├── config.js
│   ├── data
│   │   ├── index.js
│   │   └── storeKey.js
│   ├── locales //语言包
│   │   ├── ch.json
│   │   └── en.json
│   ├── main.js //主入口文件
│   ├── pages
│   │   ├── account
│   │   └── article
│   ├── router
│   │   └── index.js
│   ├── services //工具类
│   │   ├── progress
│   │   ├── storage.js
│   │   └── unit.js
│   ├── settings.js //项目主题设置
│   └── store //全局状态管理
│   ├── getters.js
│   ├── index.js
│   └── modules
├── vite.config.js //vite 配置
└── yarn.lock
