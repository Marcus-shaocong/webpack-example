module.exports={
    presets: [['@babel/preset-env',{debug:false,
                    modules:false,
                    targets:{
                        browsers:['> 1%']
                    },
                    useBuiltIns:true
                }]],
    plugins:[
        ["@babel/plugin-transform-runtime",{
            helpers:true,
            corejs:2,
            regenerator:true
        }]
    ]
}            