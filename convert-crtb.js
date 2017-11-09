const fs = require('fs');
const csv = require('csvtojson');

const bookRefs = require('./lib/en/bookRefs').bookRefs;
const bookNames = require('./lib/en/bookNames').bookNames;

const TRANSLATION = 'CRTB';
const HEADERS = ['book', 'chapter', 'verse', 'text'];
const USFM_FILE = 'usfm/' + TRANSLATION.toLowerCase() + '.usfm';
const JSON_FILE = 'json/' + TRANSLATION.toLowerCase() + '.json';

const stream = csv({ delimiter: '\t', constructResult: false, headers: HEADERS })
.transf(json => {
  json.translation_id = TRANSLATION;
  json.chapter = Number(json.chapter);
  json.verse = Number(json.verse);
  json.book_id = bookRefs[json.book];
  json.book_name = bookNames[json.book];
  delete json['book'];
})
.on('done', error => {
  if (error) {
    console.error('Error parsing file: ', error);
  }
  else {
    console.log('Parsing finished sucessfully.');
  }
});

const readStream = fs.createReadStream(USFM_FILE);
const writeStream = fs.createWriteStream(JSON_FILE);
readStream.pipe(stream).pipe(writeStream);
