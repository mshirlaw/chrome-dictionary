module.exports = {
	"extends": "eslint:recommended",
	"rules": {
		"semi": ["error", "always"],
	},
	"env": {
		"browser": true,
		"node": true,
	},
	"globals": {
		"document": true,
		"chrome": true
	}
};