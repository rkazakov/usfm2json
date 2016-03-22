#!/usr/bin/env node
var TRANSLATION = process.argv[2] || 'KJV';
var USFM_FILE = TRANSLATION.toLowerCase() + '.usfm';
var JSON_FILE = TRANSLATION.toLowerCase() + '.json';
var HEADERS = ['book', 'chapter', 'verse', 'subverse', 'order', 'text'];

var bookRefs = require('./bookRefs').bookRefs;
var bookNames = require('./bookNames').bookNamesEN;

var fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({
  delimiter: '\t',
  constructResult: false,
  headers: HEADERS
});

converter.transform = function(json, row, index) {
  // adding columns
  json['tran'] = TRANSLATION;
  json['bookRef'] = bookRefs[json['book']];
  json['bookName'] = bookNames[json['book']];
  json['book'] = Number(json['book'].slice(0, -1));
  // columns to delete
  delete json['subverse'];
  delete json['order'];
};

var readStream = fs.createReadStream(USFM_FILE);
var writeStream = fs.createWriteStream(JSON_FILE);

readStream.pipe(converter).pipe(writeStream);
