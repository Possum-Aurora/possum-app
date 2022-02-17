const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)
const CracoLessPlugin = require('craco-less')

module.exports = {
    webpack: {
        alias: {
            "@": resolve('src'),
            "components": resolve('src/components'),
            "images": resolve('src/assets/images'),
            "constants": resolve('src/constants')
        },

        configureWebpack: {
            plugins: []
        },
    },

    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { },
                        javascriptEnabled: true,
                        globalVars: {}
                    }
                },
            }
        }
    ]
}
