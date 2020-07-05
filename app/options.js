'use strict';
const yargs = require('yargs');

module.exports = yargs
  .usage('Usage: -t <text>')
  .option('text', {
    alias: 't',
    describe: 'The text to transcode',
    type: 'string'
  })
  .option('file', {
    alias: 'csv',
    describe: 'The input file to transcode',
    type: 'string'
  })
  .option('output', {
    alias: 'o',
    describe: 'The output file or folder',
    type: 'string',
    default: 'sample'
  })
  .option('lang', {
    alias: 'l',
    describe: 'The output language',
    type: 'string',
    default: 'en'
  })
  .option('apikey', {
    alias: 'a',
    describe: 'The apikey for Watson',
    type: 'string'
  })
  .showHelpOnFail(false, 'Specify --help for available options')
  .check((argv) => {
    if (!(argv.text || argv.file)) {
      throw new Error('Either text or file is required!');
      return false;
    }
    return true;
  })
  .conflicts('text', 'file').argv;
