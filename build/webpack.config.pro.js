const config = require('./webpack.config.base');
const optimizeCss = require('optimize-css-assets-webpack-plugin');

/*
 * mode = 'production'，会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin,
 * ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
 * */
config.mode = 'production';

config.plugins.push(new optimizeCss()); // 压缩css文件

module.exports = config;