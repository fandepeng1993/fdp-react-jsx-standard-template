const path = require('path');
const PKG = require('./package');
const {when, whenDev, whenProd, whenTest, removePlugins, pluginByName} = require('@craco/craco');
const CracoLessPlugin = require('craco-less');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const webpack = require('webpack');


const pathResolve = pathUrl => path.join(__dirname, pathUrl);
module.exports = ({env}) => {
  console.log('webpack env:', env);
  // console.log('process.env.REACT_APP_ZIP:',process.env.REACT_APP_ZIP)
  return {
    reactScriptsVersion: 'react-scripts' /* (default value) */,
    style: {},
    babel: {},
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
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
        webpackConfig.stats= 'errors-only';

        whenProd(() => {
          // console.log(webpackConfig.plugins);
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
          new webpack.DefinePlugin({
            AUTHOR: 'sss_fan@126.com'
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
                '@primary-color': '#1DA57A',
                '@link-color': '#1DA57A',
                '@border-radius-base': '2px'
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
            // console.log(lessModuleRule.use);
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