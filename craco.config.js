/* craco.config.js */
/* https://ant.design/docs/react/use-with-create-react-app */

const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
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