#!/usr/bin/env node
'use strict';
const meow = require('meow');
// const csvTtsGenerator = require('./');
const yargs = require('yargs');
const options = require('./options');
const synth = require('./synth');
const csvparse = require('./csvparse');
const { forEach } = require('p-iteration');

const cli = meow(`
Usage
  $ csv-tts-generator [input]

Options
  --text (--t) To generate from text. [Default: false]
  --file (--csv)  The path to the CSV file. [Default: false]
  --output (--o)  File or folder name (extendsion not required) [Default: sample]
  --lang (--l)  Output language [Default: en]
  --config (--c)  Path to the config file
  --apikey (--a)  The apikey for wattson
  --apiurl (--u)  The apiurl for wattson

(Either text or file is required!)

Examples
  $ csv-tts-generator --text "Hello World!"
  >> sample.wav ✔
  $ csv-tts-generator -csv input-1.csv -o "lesson-1"
  >> lesson-1/*.wav  (42 file generated) ✔
`);

// console.log('args', config);
function app() {
  console.log(`Staring process`);
  if (options.text) {
    synth
      .synthText(options.text, options.output, options.lang)
      .then((output) => {
        console.log(
          `----------------------------------------------------------------------------------------------------`
        );
        console.log(`${output} ✔`);
      });
  }
  if (options.csv) {
    csvparse.readCSV(options.csv).then((csv) => {
      // console.log(csv);
      const loop = forEach(csv, async (sentence) => {
        if (sentence.text === undefined || sentence.filename === undefined) {
          throw new Error('Missing text or filename column');
        }
        const row = await synth.synthText(
          sentence.text,
          `${options.output}/${sentence.filename}`,
          options.lang
        );
      }).then(() => {
        console.log(
          `----------------------------------------------------------------------------------------------------`
        );
        console.log(`${options.output}/*.* (${csv.length} file generated) ✔`);
      });
    });
  }
}

app();
