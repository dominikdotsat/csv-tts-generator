'use strict';
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

function readCSV(pathToFile) {
  const result = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathToFile)
      .pipe(csv.parse({ headers: true }))
      .on('error', (err) => {
        reject(err);
        throw new Error(err);
      })
      .on('data', (row) => {
        result.push(row);
      })
      .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(result);
      });
  });
}

module.exports.readCSV = readCSV;
