
//https://github.com/webpack/webpack.js.org/issues/1268#issuecomment-313513988
//custimize the loader
// see val-loader for a robust code gen

const Module = require("module");
function loadModule(code, loaderContext) {
  const filename = loaderContext.resource;
  console.log('code', code)
  console.log('loaderContext.context', loaderContext.context)
  const module = new Module(filename, loaderContext);
  module.paths = Module._nodeModulePaths(loaderContext.context);
  module.filename = filename;
  console.log('modulelog', module)
  module._compile(code, filename);
  return module.exports;
}


module.exports = async function (compileTimeModule){
    const loaderContext = this;
    /* the loadModule function is just like the require funciton
    const codeGenerator = require('./buildInformation.gen')
    */
   //console.log("code", compileTimeModule)
   //console.log("context", loaderContext)
    const CodeGenerator = loadModule(compileTimeModule, loaderContext)

    //console.log("code2", CodeGenerator)
    const codeGeneration = CodeGenerator()
    const generateRuntimeModule = await codeGeneration;
    return generateRuntimeModule.code;
}


