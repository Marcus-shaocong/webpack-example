const path = require('path')

module.exports={
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
            //   {
            //   loader:'tee-loader',
            //   options:{
            //   label:'before'
            //   }
            // },
            {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env',{debug:false,
                    modules:false,
                    targets:{
                        // browsers:['last 2 chrome versions']
                        browsers:['>1%']

                    },
                    useBuiltIns:'usage' // can also use 'entry' option
                }]],
                babelrc:false
              }
            }
          ]
          }
        ]
    },
    resolveLoader:{
      alias:{
        'tee-loader':path.resolve(__dirname, 'tee-loader.js')
      }
    }
}