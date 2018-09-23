const path = require('path') //node path包
const HtmlwebpackPlugin = require('html-webpack-plugin') // webpack 插件

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js' // 运行时 会自动创建
  },

  module: {
    rules: [{
      test: /\.js?$/, // 检测自己的JS文件
      exclude: /(node_modules)/, // 可以忽略的检测JS文件，第三方的包一般都是可以忽略的
      loader: 'babel-loader' // 对检测出来的文件 进行loader处理 使用babel-loader插件 转换成ES6
    }]
  },
  plugins: [
    new HtmlwebpackPlugin({
      template: './index.html' // 打包出来的bundle.js 会自动打包到模板index.html中
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './release'), 
    // 开发环境 从release中获取文件 path __dirname 从当前文件夹下面 获取 根目录
    open: true, // 自动打开浏览器
    port: 9000
  }
}