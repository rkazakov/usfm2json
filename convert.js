#!/usr/bin/env node

if(!process.argv[2]) return console.log("Error: Must provide a filename as a parameter");

var TRANSLATION = process.argv[2];
var USFM_FILE =  TRANSLATION;

if(!/(\w+)\.usfm$/.test(TRANSLATION)) return console.log("Error: must be a file with .ufsm extension");

var JSON_FILE = TRANSLATION.toLowerCase().match(/(\w+)\.usfm$/)[1] + ".json";

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
var writeStream = fs.createWriteStream('./json/' + JSON_FILE);

readStream.pipe(converter).pipe(writeStream);
