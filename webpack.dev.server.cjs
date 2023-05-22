const webpack = require("webpack");
const path = require("path");

module.exports = {
	devtool: "source-map",
	mode: "development",
	entry: [path.join(__dirname, "src", "server.js")],
	target: "node",
	output: {
		path: __dirname + "/dist/",
		filename: "server.cjs",
	},
	node: {
		__filename: false,
		__dirname: false,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: [],
						},
					},
				],
			},
		],
	},
};
