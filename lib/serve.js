let Vue =  require('vue');
const fs = require('fs');
const path = require('path')
const { fork } = require('child_process');
require('colors');

steamboatPath = path.join(__dirname, '../')
entryPoint = path.join(steamboatPath, 'boot', 'src', 'index.js');


//Output of the command `serve`:
module.exports = function() {

    // This will be the root folder of the project we're bootstrapping.
    let folder = process.cwd();
    let subFolders = fs.readdirSync(folder).filter((file) => fs.statSync(folder + path.sep + file).isDirectory());
    let docsIndex = subFolders.findIndex(x => x.toLowerCase().trim() == 'docs')
    let docsDir = '';

    //If we don't have required folders, then terminate.
    if (docsIndex < 0) {
        console.log('Error: Could not find the required `docs` folder.'.red);
        process.exit(1);
    } else {
        docsDir = folder + path.sep + subFolders[docsIndex];
        console.log(`Found Docs at this folder: ${docsDir}`);
    }

    //We need to pass the documentation directory to vue-cli. vue-cli-service doesn't pass any variables that don't start with `VUE_APP_`
    process.env.VUE_APP_DOCS_DIRECTORY = docsDir;
    let cli = path.join(steamboatPath, 'node_modules/@vue/cli-service/bin/vue-cli-service.js');
    fork(cli, ['serve', entryPoint], {...process.env, cwd: steamboatPath });
};