const path = require('path');
const PKG = require('./package');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
//  whenTest,  whenDev,
const {when, whenProd, removePlugins, pluginByName, getLoader, loaderByName} = require('@craco/craco');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CracoLessPlugin = require('craco-less');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');


const pathResolve = pathUrl => path.join(__dirname, pathUrl);

module.exports = ({env}) => {
  console.log('webpack env:', env);
  return {
    reactScriptsVersion: 'react-scripts',
    style: {},
    babel: {
      plugins: [
        [
          'import',
          {
            'libraryName': 'antd',
            'libraryDirectory': 'es',
            'style': true //设置为true即是less 这里用的是css
          }
        ]
      ]
    },
    devServer: (devServerConfig, {env, paths, proxy, allowedHost}) => {
      /**
       * 该配置项已弃用，以支持 devServer.setupMiddlewares。
       */
      delete devServerConfig.onAfterSetupMiddleware;
      delete devServerConfig.onBeforeSetupMiddleware;
      // devServerConfig.client.progress = true;
      return devServerConfig;
    },
    webpack: {
      alias: {
        '@': pathResolve('src')
      },
      configure: (webpackConfig, {env, paths}) => {

        // console.log(webpackConfig);
        // webpackConfig.module.rules[0].oneOf.forEach((i)=>{
        //   console.log(i)
        // });
        //引入src目录外的的文件
        webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter((plugin) => {
          return !(plugin instanceof ModuleScopePlugin);
        });
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
        webpackConfig.stats = 'errors-only';
        webpackConfig.ignoreWarnings = [/Failed to parse source map/];
        whenProd(() => {
          webpackConfig.devtool = false;
          // 关闭协议
          webpackConfig.optimization.minimizer[0].options.extractComments = false;
          // 删除asset-manifest.json
          removePlugins(webpackConfig, pluginByName('WebpackManifestPlugin'));
        });
        webpackConfig.output = {
          ...webpackConfig.output,
          path: paths.appBuild
        };
        return webpackConfig;
      },
      // webpack的plugins
      plugins: {
        add: [
          ...when(!!process.env.REACT_APP_ZIP, () => {
            return [new FileManagerPlugin({
              events: {
                onEnd: {
                  delete: [
                    `./dist/${PKG.name}_*.zip`
                  ],
                  archive: [
                    {source: './dist/', destination: `./dist/${PKG.name}_${PKG.version}.zip`}
                  ]
                }
              }
            })];
          }, []),
          new AntdDayjsWebpackPlugin(),
          new webpack.DefinePlugin({
            AUTHOR: 'sss_fan@126.com',
            VERSION: JSON.stringify(PKG.version)
          }),
          new webpack.BannerPlugin({
            banner: 'sss_fan@126.com'
          })
        ]
      }
    },
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: {
                '@primary-color': '#107BF5'
                // '@link-color': '#1DA57A',
                // '@border-radius-base': '2px'
              },
              sourceMap: false,
              javascriptEnabled: true
            }
          },
          modifyLessRule(lessRule, context) {
            lessRule.use.push({
              loader: 'style-resources-loader',
              options: {
                patterns: [
                  path.join(__dirname, 'src/assets/style/variable_less.less')
                ]
              }
            });
            return lessRule;
          },

          modifyLessModuleRule: (lessModuleRule, context) => {
            lessModuleRule.use.push({
              loader: 'style-resources-loader',
              options: {
                patterns: [
                  path.join(__dirname, 'src/assets/style/variable_less.less')
                ]
              }
            });
            return lessModuleRule;
          }
        }
      }
    ]
  };
};