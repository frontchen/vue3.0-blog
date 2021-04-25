module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //把px单位转换为vw、vh、vmin或者vmax这样的视窗单位，也是vw适配方案的核心插件之一。
      unitToConvert: "px", // 要转化的单位
      viewportWidth: 1920, //UI设计稿的宽度
      viewportHeight: 1080, //UI设计稿的高度
      unitPrecision: 3, //将px转化为视窗单位值的小数位数
      propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vw", //指定要转换成的视窗单位值
      selectorBlackList: ['navbar','hamburger-container','breadcrumb-container','hamburger','resetTop','right-panel','scrollbar-wrapper'], //指定不转换视窗单位值得类，可以自定义，可以无限添加
      minPixelValue: 1, //小于等于1px不转换为视窗单位
      mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false // 是否处理横屏情况
    },
    "postcss-viewport-units": {}, //给vw、vh、vmin和vmax做适配的操作,这是实现vw布局必不可少的一个插件
    cssnano: {
      //主要用来压缩和清理CSS代码。在Webpack中，cssnano和css-loader捆绑在一起，所以不需要自己加载它。
      preset: "advanced", //重复调用
      autoprefixer: false, //cssnext和cssnano都具有autoprefixer,事实上只需要一个，所以把默认的autoprefixer删除掉，然后把cssnano中的autoprefixer设置为false。
      "postcss-zindex": false, //只要启用了这个插件，z-index的值就会重置为1
    },
  },
};
