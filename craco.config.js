const { when } = require('@craco/craco');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	webpack: {
		plugins: [
			...when(
				Boolean(process.env.ANALYZE),
				() => [new BundleAnalyzerPlugin()],
				[]
			)
		],
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat'
		}
	}
};
