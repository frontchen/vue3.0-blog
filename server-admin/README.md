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

├─.env.development
├─.env.production
├─README.md
├─babel.config.js
├─index.html
├─package.json
├─postcss.config.js
├─vite.config.js //vite 配置
├─yarn.lock
├─src
| ├─App.vue
| ├─config.js
| ├─main.js //主入口文件
| ├─settings.js //项目主题设置
| ├─store //全局状态管理
| | ├─getters.js
| | ├─index.js
| | ├─modules
| | | ├─app.js
| | | ├─common.js
| | | └settings.js
| ├─services //工具类
| | ├─storage.js
| | ├─unit.js
| | ├─progress
| | | └index.js
| ├─router //路由
| | └index.js
| ├─pages
| ├─locales //语言包
| | ├─ch.json
| | └en.json
| ├─data
| | ├─index.js
| | └storeKey.js
| ├─components //公用组件
| | ├─hamBurger
| | | └index.vue
| | ├─breadCrumb
| | | └index.vue
| ├─common //公用页面
| | ├─Login.vue
| | ├─Main.vue
| | ├─MainFooter.vue
| | ├─MainHeader.vue
| | ├─MainHome.vue
| | ├─MainLayout.vue
| | ├─MainScreenFull.vue
| | ├─MainSetting.vue
| | ├─Panel.vue
| | ├─Register.vue
| | ├─menu
| | | ├─Link.vue
| | | ├─SidebarItem.vue
| | | └index.vue
| ├─assets
