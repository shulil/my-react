module.exports= { //webpack本身不能做babel的转换，所以使用node的标准写config
    entry:{
        main:'./main.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        plugins:[['@babel/plugin-transform-react-jsx', {pragma:'createElement'}]]
                    }
                }
            }
        ]
    },
    mode:'development',
    optimization:{
        minimize:false
    }
}