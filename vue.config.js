/*
 * @Author: zhilutianji
 * @Date: 2022-01-02 22:46:56
 * @LastEditors: zhilutianji
 * @LastEditTime: 2022-01-02 22:48:39
 * @Description: file content
 * @FilePath: \shops_frontend_web\vue.config.js
 */
module.exports = {
    devServer: {
        // true 则热更新，false 则手动刷新，默认值为 true
        // inline: true,
        // development server port 8000
        // port: 8080,
        // 代理服务器解决跨域
        proxy: {
            // 会把请求路径中的/api换为后面的代理服务器
            '/api': {
                // 提供数据的服务器地址
                changeOrigin: true,
                target: 'http://101.35.79.150:9090',
                // 会在后面加/api,除非,重写去掉
                pathRewrite: { '^/api': '' }

            },
            '/mock': {
                target: 'http://127.0.0.1:4523'
            },
            '/test': {
                target: 'http://39.98.123.211',
                pathRewrite: { '^/test': '' }
            }

        }
    }
}
