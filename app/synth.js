'use strict';
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const mime = require('mime-types');
const fs = require('fs');
const path = require('path');

const c = require('./config');
let config = c.config;
const options = require('./options');

let textToSpeech = undefined;

function initTTS() {
  if (textToSpeech === undefined) {
    if (options.config) {
      config = c.initConfigFromFile(options.config);
    }
    textToSpeech = new TextToSpeechV1({
      authenticator: new IamAuthenticator({
        apikey: options.apikey || config.api.key
      }),
      url: options.apiurl || config.api.url,
      headers: {
        'X-Watson-Learning-Opt-Out': 'true' // prevent data collection
      }
    });
  }
}

function getVoice(lang) {
  if (config.languageVoices[lang] === undefined) {
    throw 'Unsupported langague from configuration';
  }
  return config.languageVoices[lang];
}

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

function synthText(text, output, lang) {
  initTTS();
  process.stdout.write(`STARTED to process - "${text} >> ${output} "\r`);
  const regex = /["']/g;
  const pars = {
    text,
    voice: getVoice(lang.replace(regex, '')),
    accept: config.output.fileType
  };
  return new Promise((resolve, reject) => {
    textToSpeech
      .synthesize(pars)
      .then((response) => {
        const audio = response.result;
        return config.output.fileType === 'audio/wav'
          ? textToSpeech.repairWavHeaderStream(audio)
          : audio;
      })
      .then((repairedFile) => {
        const extension = mime.extension(config.output.fileType);
        if (extension === undefined) {
          throw new Error('Unsupported media type from configuration');
        }
        ensureDirectoryExistence(`./${output}.${extension}`);
        const tempFile = fs.writeFileSync(
          `./${output}.${extension}`,
          repairedFile
        );
        process.stdout.clearLine();
        process.stdout.write(`DONE - "${text} >> ${output} "\r`);
        resolve(`./${output}.${extension}`);
      })
      .catch((err) => {
        reject(err);
        throw new Error(err);
      });
  });
}

module.exports.synthText = synthText;
