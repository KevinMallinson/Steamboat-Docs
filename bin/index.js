#!/usr/bin/env node

const program = require('commander');


const about = require('../lib/about');
const serve = require('../lib/serve');


program
    .command('about').description('Show information about Steamboat Docs').action(() => about());

program
    .command('serve').description('Create a debug server for testing.').action(() => serve());

program.parse(process.argv);