'use strict';
const readConfig = require('read-config');
const fs = require('fs');

let config = {
  api: {
    url: 'https://api.eu-de.text-to-speech.watson.cloud.ibm.com',
    key: ''
  },
  languageVoices: {
    en: 'en-US_AllisonVoice',
    de: 'de-DE_DieterV3Voice',
    jp: 'ja-JP_EmiV3Voice'
  },
  output: {
    fileType: 'audio/wav'
  }
};

function initConfigFromFile(path) {
  if (!fs.existsSync(path)) {
    throw new Error(`Provided config file does not exist! (${path})`);
  }
  const user_config = readConfig(path);
  config = { ...config, ...user_config };
  return config;
}

module.exports.config = config;

module.exports.initConfigFromFile = initConfigFromFile;
