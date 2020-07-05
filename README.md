# csv-tts-generator [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

>

A command line probram that generates audio files with IBM Watson's TTS service, from csv or text input.

## Installation

From the folder:

```sh
  npm install -g .
```

or

```sh
$ npm install --g csv-tts-generator
```

## Usage

```
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
  $ csv-tts-generator --text "Consciente de su patrimonio espiritual y moral"  --output "spanish" --config config.json --lang es
  >> ./spanish.wav ✔
  $ csv-tts-generator --output "lesson-1-jp" --config config.json --lang jp --csv jp-sample.csv
```

## Configuration

You can create a `config.json` file and load with the `--config path/to/config.json` paramter, which looks the following:

```json
 "api": {
    "url": "url-to-your-ibm-watson-text-to-speech-api",
    "key": "your-apikey"
  },
  "languageVoices": {
    "en": "en-US_AllisonVoice",
    "jp": "ja-JP_EmiV3Voice"
  },

```

(in the `languageVoices` object, you can provider language-voice pairs, which can be used later for speech synthesis)

## License

Apache-2.0 © [Dominik Sz.]()

[npm-image]: https://badge.fury.io/js/csv-tts-generator.svg
[npm-url]: https://npmjs.org/package/csv-tts-generator
[travis-image]: https://travis-ci.com/dominikdotsat/csv-tts-generator.svg?branch=master
[travis-url]: https://travis-ci.com/dominikdotsat/csv-tts-generator
[daviddm-image]: https://david-dm.org/dominikdotsat/csv-tts-generator.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/dominikdotsat/csv-tts-generator
