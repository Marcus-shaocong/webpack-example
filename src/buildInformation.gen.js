const util = require('util')
const exec = util.promisify(require('child_process').exec)

const captureBuildInformation = async ()=>{
    const { stdout} = await exec('git rev-parse HEAD')
    const commitSha = stdout.replace('\n', '')
    const compileAt = new Date().toISOString()

    return {
        code:`
            export const compileAt = ${compileAt};
            export const commit = ${commitSha};
        `
    }
}

module.exports = captureBuildInformation;