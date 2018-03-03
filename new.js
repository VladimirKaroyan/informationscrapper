var request = require('request');
var iconv = require('iconv-lite');
var scrapeIt = require('scrape-it');
var cheerio = require('cheerio');
var fs = require('fs');
var jsonfile = require('jsonfile');

var file = "db28.json";
jsonfile.readFile(file, function(err, obj) {
    if(err) throw err;
    console.log(obj)
    jsonfile.writeFile("data.json", JSON.stringify(obj));
});
 