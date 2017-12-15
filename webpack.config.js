'use strict';

const webpack = require('webpack');

module.exports = {
	context: __dirname + '/src/',
	entry: "./index.js",
	output: {
		path: __dirname + '/public/js/',
		filename: "bundle.js",
		library: "index"
	},

	watch: true,

	watchOptions: {
		aggregateTimeout: 100
	},

	plugins: [
		// new webpack.NoEmitOnErrorsPlugin(),
		new webpack.DefinePlugin({
			LANG: JSON.stringify('ru')
		})
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'common'
		// })
	],

	devtool: "inline-source-map",

	resolve: {
		modules: ['node_modules'],
		extensions: ['.js']
	}, 

	resolveLoader: {
	// 	modules: ['node_modules'],
		moduleExtensions: ['-loader'],
		extensions: ['.js']
	},

	module: {

		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader?optional[]=runtime',
				query:
					{
						presets:['es2015', 'stage-0','react']
					}
			},
			{
				test: /\.css$/,
				use: ['style', 'css']
			},
            {
                test: /\.(png|jpg|svg|ttf|oet|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
            }]
	}
};

module.exports.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
			drop_console: true,
			unsafe: true
		}
	}))

