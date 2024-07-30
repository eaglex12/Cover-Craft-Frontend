// config-overrides.js
const webpack = require("webpack");

module.exports = function override(config) {
	config.resolve.fallback = {
		util: require.resolve("util/"),
	};

	return config;
};
