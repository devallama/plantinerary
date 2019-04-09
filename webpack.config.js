const path = require('path');

let CONFIG = {
    mode: 'development',
    entry: {
        app: './src/js/index.js'
    },
    output: {
        filename: './public/assets/js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

// if(environemt == 'production') {
//     CONFIG.mode = 'production';
// }

module.exports = CONFIG;