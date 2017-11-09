var TRANSLATION = 'CRTB';
var USFM_FILE = 'usfm/' + TRANSLATION.toLowerCase() + '.usfm';
var JSON_FILE = 'json/' + TRANSLATION.toLowerCase() + '.json';
var HEADERS = ['book', 'chapter', 'verse', 'text'];

var bookRefs = require('./lib/en/bookRefs').bookRefs;
var bookNames = require('./lib/en/bookNames').bookNames;

var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({
  delimiter: '\t',
  constructResult: false,
  headers: HEADERS
});

converter.transform = function(json, row, index) {
  json['translation_id'] = TRANSLATION;
  json['book_id'] = bookRefs[json['book']];
  json['book_name'] = bookNames[json['book']];
  delete json['book'];
};

var readStream = fs.createReadStream(USFM_FILE);
var writeStream = fs.createWriteStream(JSON_FILE);

readStream.pipe(converter).pipe(writeStream);
