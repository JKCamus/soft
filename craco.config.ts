const path = require("path");
const CracoLessPlugin = require("craco-less");
const CracoSwcPlugin = require("craco-swc");
const cracoPluginStyleResourcesLoader = require("craco-plugin-style-resources-loader");
const babelPluginStyledComponents = require("babel-plugin-styled-components");
const resolve = (dir) => path.resolve(__dirname, dir); //dirname 目录路径
// 确实去除了sourceMap
process.env.GENERATE_SOURCEMAP = "false";
// 添加webpack速度分析,在webpack那边假如smp
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// 编译进度条
const WebpackBar = require("webpackbar");
// 压缩js
const TerserPlugin = require("terser-webpack-plugin");
// 打包信息配置
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const { whenProd } = require("@craco/craco");



// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  webpack: smp.wrap({
    alias: {
      "@": resolve("src"),
      components: resolve("src/components"),
      pages: resolve("src/pages"),
      common: resolve("src/common"),
      services: resolve("src/services"),
      store: resolve("src/store"),
      utils: resolve("src/utils"),
    },

    configure: {
      /*在这里添加任何webpack配置选项: https://webpack.js.org/configuration */
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ["cache-loader", "babel-loader"],
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            // 本质上是依赖于typescript(typescript compiler)
            use: ["cache-loader", "babel-loader"],
          },
        ],
      },
      resolve: {
        modules: [
          // 指定以下目录寻找第三方模块，避免webpack往父级目录递归搜索
          resolve("src"),
          resolve("node_modules"),
        ],
        // 配置匹配文件后缀名eg:对于引入jsx文件，可以不填写后缀名也可以找到
        // extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".ts", ".vue"],
        alias: {
          "@": resolve("src"), // 缓存src目录为@符号，避免重复寻址
          pages: resolve("./src/pages"),
        },
      },
    },
    plugins: [
      // webpack进度条
      new WebpackBar({ color: "green", profile: true }),
      // 打包时，启动插件
      ...whenProd(
        () => [
          // 压缩js 同时删除console debug等
          new TerserPlugin({
            parallel: true,
            extractComments: false,
            terserOptions: {
              ie8: true,
              // 删除注释
              output: {
                comments: false,
              },
              //删除console 和 debugger  删除警告
              compress: {
                drop_debugger: true,
                drop_console: true,
              },
            },
          }),
          // 打包分析
          new BundleAnalyzerPlugin(),
        ],
        []
      ),
    ],
  }),
  // 插件相关配置，一个plugin一个对象
  plugins: [
    // 配置less
    // 按需引入antd
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          // 配置主题或者说是标志颜色
          lessOptions: {
            // modifyVars: { "@primary-color": "#1DA57A" },
            modifyVars: { "@primary-color": "#43a3ef" },
            javascriptEnabled: true,
          },
        },
      },
    },

    {
      plugin: babelPluginStyledComponents,
      options: {
        fileName: false,
      },
    },
  ],
  devServer: {
    hot: true,
    proxy: {
      "/api": {
        target: "http://43.139.66.115:8000", // 开发路由代理
        // ws: false, // websocket
        changeOrigin: true, //是否跨域
        secure: false, // 如果是https接口，需要配置这个参数
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
};
