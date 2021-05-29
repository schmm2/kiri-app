/* craco.config.js */
/* https://ant.design/docs/react/use-with-create-react-app */

const CracoLessPlugin = require('craco-less');
const CracoEsbuildPlugin = require('craco-esbuild');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin, CracoEsbuildPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#019bbd'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};