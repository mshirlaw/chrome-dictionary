module.exports = {
	entry: {
		app: './js/app.js',
		content: './js/content.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/build'
	},
	module: {
		loaders: [
			{ 
				test: /\.js$/, 
				exclude: /node_modules/, 
				loader: 'babel-loader'
			}
		]
	}
};