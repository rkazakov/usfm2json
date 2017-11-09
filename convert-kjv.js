const fs = require('fs');
const csv = require('csvtojson');

const bookRefs = require('./lib/en/bookRefs').bookRefs;
const bookNames = require('./lib/en/bookNames').bookNames;

const TRANSLATION = 'KJV';
const HEADERS = ['book', 'chapter', 'verse', 'subverse', 'order', 'text'];
const USFM_FILE = 'usfm/' + TRANSLATION.toLowerCase() + '.usfm';
const JSON_FILE = 'json/' + TRANSLATION.toLowerCase() + '.json';

const csvStream = csv({ delimiter: '\t', headers: HEADERS })
.transf(json => {
  json.translation_id = TRANSLATION;
  json.chapter = Number(json.chapter);
  json.verse = Number(json.verse);
  json.book_id = bookRefs[json.book];
  json.book_name = bookNames[json.book];
  delete json['book'];
  delete json['subverse'];
  delete json['order'];
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
readStream.pipe(csvStream).pipe(writeStream);
