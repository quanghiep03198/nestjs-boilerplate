const swcDefaultConfig = require('@nestjs/cli/lib/compiler/defaults/swc-defaults').swcDefaultsFactory().swcOptions;
const NodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = function (options, webpack) {
	return {
		...options,
		module: {
			rules: [
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: {
						loader: 'swc-loader',
						options: swcDefaultConfig,
					},
				},
			],
		},
		entry: ['webpack/hot/poll?100', options.entry],
		externals: [
			NodeExternals({
				allowlist: ['webpack/hot/poll?100'],
			}),
		],
		plugins: [
			...options.plugins,
			new webpack.HotModuleReplacementPlugin(),
			new webpack.WatchIgnorePlugin({
				paths: [/\.js$/, /\.d\.ts$/],
			}),
			new RunScriptWebpackPlugin({
				name: options.output.filename,
				autoRestart: true,
			}),
			new TsconfigPathsPlugin({ baseUrl: path.resolve(__dirname, '.') }),
			new CopyWebpackPlugin({
				patterns: [{ from: 'src/templates', to: 'templates' }],
			}),
		],
	};
};
