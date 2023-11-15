const path = require('path');
const webpack = require('webpack');
const PKG = require('./package');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const CracoLessPlugin = require('craco-less');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const pathResolve = pathUrl => path.join(__dirname, pathUrl);

const {when, whenDev, whenProd, removePlugins, getPlugin, pluginByName, getLoader, addAfterLoader, addPlugins, loaderByName, addBeforeLoader,addAfterAssetModules, assetModuleByName } = require('@craco/craco');
module.exports = function ({ env }) {
    console.log('env:',env)
    return {
        reactScriptsVersion: 'react-scripts',
        style:{},
        eslint:{},
        babel:{},
        typescript:{},
        webpack:{
            alias:{
                '@': pathResolve('src'),
            },
            
            configure: (webpackConfig, { env, paths }) => {
                webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter((plugin) => {
                    return !(plugin instanceof ModuleScopePlugin);
                });
                // 参见环境变量
                paths.appBuild = path.join(path.dirname(paths.appBuild), `dist/${PKG.name}`);
                webpackConfig.stats = 'errors-only';
                webpackConfig.ignoreWarnings = [/Failed to parse source map/];
                whenDev(() => {
                    webpackConfig.output.filename = 'static/js/[name].js';
                });
                whenProd(() => {
                        // 生产环境排除bundle
                        // webpackConfig.externals = {
                        //     'react': 'React',
                        //     'react-dom': 'ReactDOM'
                        //     // 'socket.io-client':'io'
                        //
                        // };

                        webpackConfig.devtool = false;
                        // 抽离公共代码
                        webpackConfig.optimization.splitChunks = {
                            chunks: 'all',
                            minSize: 20000,
                            minRemainingSize: 0,
                            minChunks: 1,
                            maxAsyncRequests: 30,
                            maxInitialRequests: 30,
                            enforceSizeThreshold: 50000,
                            automaticNameDelimiter: '~',
                            cacheGroups: {
                                base: { // 基本框架
                                    chunks: 'all',
                                    test: /(react|react-dom|react-dom-router)/,
                                    name: 'base',
                                    priority: 100,
                                },
                                commons: {
                                    chunks: 'all',
                                    // 将两个以上的chunk所共享的模块打包至commons组。
                                    minChunks: 2,
                                    name: 'commons',
                                    priority: 80,
                                },
                                defaultVendors: {
                                    name: 'chunk-vendors',
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: -10,
                                    reuseExistingChunk: true,
                                },
                                default: {
                                    name: 'chunk-default',
                                    minChunks: 2,
                                    priority: -20,
                                    reuseExistingChunk: true,
                                },
                            }
                        };
                        // 关闭注释
                        webpackConfig.optimization.minimizer[0].options.extractComments = false;
                        // 删除asset-manifest.json
                        removePlugins(webpackConfig, pluginByName('WebpackManifestPlugin'));

                        // removePlugins(webpackConfig.resolve.plugins, pluginByName('ModuleScopePlugin'));
                    }
                );

                webpackConfig.output = {
                    ...webpackConfig.output,
                    path: paths.appBuild
                };
                return webpackConfig;
            },
             // webpack的plugins
             plugins:{
                add:[
                    ...when(!!process.env.REACT_APP_ZIP, () => {
                        return [new FileManagerPlugin({
                            events: {
                                onEnd: {
                                    delete: [
                                        `./dist/${PKG.name}/${PKG.name}_*.tar.gz`
                                    ],
                                    archive: [
                                        {
                                            source: `./dist/${PKG.name}/`,
                                            destination: `./${PKG.name}/${PKG.name}_${PKG.version}.tar.gz`,
                                            options:{
                                                gzip: true,
                                                gzipOptions: {
                                                level: 1,
                                                },
                                                globOptions: {
                                                    // https://github.com/Yqnn/node-readdir-glob#options
                                                    dot: true,
                                                },
                                            }
                                        }
                                    ]
                                }
                            }
                        })];
                    }, []),
                    ...when(!!process.env.REACT_APP_ANALYZER, () => {
                        return [new BundleAnalyzerPlugin()]
                    }, []),
                    new webpack.DefinePlugin({
                        AUTHOR: `${PKG.author}`,
                        VERSION: JSON.stringify(PKG.version)
                    }),
                    new webpack.BannerPlugin({
                        banner: `${PKG.author}`
                    })
                ]
            },
        },
        jest:{},
        devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
            return devServerConfig;
        },
        // craco的plugins
        plugins:[
            {
                plugin: CracoLessPlugin,
                options: {
                    lessLoaderOptions: {
                        lessOptions: {
                            // 自定义less变量
                            modifyVars: {
                                '@primary-color': '#107BF5',
                                '@font-night-color':'#776633'
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
            },
            {
                plugin:{
                    overrideCracoConfig: ({ cracoConfig, pluginOptions, context }) => {
                        return cracoConfig;
                    },
                    overrideWebpackConfig: ({webpackConfig,cracoConfig,pluginOptions,context}) => {
                        const {isFound, match} = getPlugin(webpackConfig, pluginByName("HtmlWebpackPlugin"));
                        if (isFound) {
                            let newOptions = {...match.userOptions, ...pluginOptions};
                            whenDev(() => {
                                newOptions.cdns = [];
                            });
                            removePlugins(webpackConfig, pluginByName("HtmlWebpackPlugin"));
                            addPlugins(webpackConfig, [[new HtmlWebpackPlugin(newOptions), "prepend"]]);
                        }
                        return webpackConfig;
                    },
                    overrideDevServerConfig: ({devServerConfig,cracoConfig,pluginOptions,context}) => {
                        return devServerConfig;
                    },
                    overrideJestConfig: ({ jestConfig, cracoConfig, pluginOptions, context }) => {
                        return jestConfig;
                    },
                },
                options:{
                    title: 'Desktron',
                    cdns: [
                        // cdn 打包优化
                        // "https://unpkg.com/react@18/umd/react.production.min.js",
                        // "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
                    ]
                }
            },
            {
                plugin: {
                    overrideWebpackConfig: ({webpackConfig, cracoConfig, pluginOptions, context: {env, paths}}) => {
                        whenProd(()=>{
                            const {isFound, match} = getPlugin(webpackConfig, pluginByName("MiniCssExtractPlugin"));
                            if (isFound) {
                                let newOptions = {...match.userOptions, ...pluginOptions};
                                removePlugins(webpackConfig, pluginByName("MiniCssExtractPlugin"));
                                addPlugins(webpackConfig, [[new MiniCssExtractPlugin(newOptions), "append"]]);
                            }
                        });
                        return webpackConfig;
                    },
                },
                options: {
                    ignoreOrder: true,
                }
            }
        ]
    }
}