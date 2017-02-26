module.exports = {
	entry: {
		app: './src/js/app.js',
		content: './src/js/content.js',
	},
	output: {
		filename: '[name].bundle.js',
		path: __dirname + '/dist/js/'
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