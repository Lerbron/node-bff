const HtmlWebpackPlugin = require('html-webpack-plugin');
const MyPlugin = 'InsertHtmlJsPlugin'

class InsertHtmlJsPlugin {
    apply(compiler) {
        // 指定一个挂载到 webpack 自身的事件钩子。
        compiler.hooks.compilation.tap(MyPlugin, compilation => {
            // console.log('🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌🍌')
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(MyPlugin, (data, cb) => {
                // console.log(data.assets)
                const _js = data.assets.js
                const _css = data.assets.css
                let _html = data.html
                let injectJs = ''
                let injectCss = ''
                if (_js.length > 0) {
                    for (let i = 0; i < _js.length; i++) {
                        injectJs += `<script src=${_js[i]}></script>`
                    }
                }
                injectCss = `<link rel="stylesheet" href="${_css}"/>`
                _html = _html.replace("<!--injectjs-->", injectJs)
                _html = _html.replace("<!--injectcss-->", injectCss)
                data.html = _html
                // console.log(_html)
            })
        })
    };
}

module.exports = InsertHtmlJsPlugin