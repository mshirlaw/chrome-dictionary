module.exports = {
	"extends": "eslint:recommended",
	"rules": {
		"semi": ["error", "always"],
	},
	"env": {
		"browser": true,
		"node": true,
	},
	"parser": "babel-eslint",
	"globals": {
		"document": true,
		"chrome": true
	}
};