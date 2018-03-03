var request = require('request');
var iconv = require('iconv-lite');
var scrapeIt = require('scrape-it');
var cheerio = require('cheerio');
var fs = require('fs');
var jsonfile = require('jsonfile');



function scrape(i) {
    var url = 'https://freelance.ru/projects/?spec=4&page=' + i;
    request({
        url: url,
        encoding: null
    }, function (error, response, body) {
        // console.log('error:', error);
        // console.log('statusCode:', response && response.statusCode);
        body = iconv.decode(body, 'windows-1251'); // document.charset
        // console.log('body:', body);
        callback(error, response, body, i);
    });
}

function callback(error, response, body, i) {
    if (!error && response.statusCode == 200) {
        namecena = scrapeIt.scrapeHTML(body, {
            data: {
                listItem: 'div.p_title',
                data: {
                    name: 'a.ptitle span',
                    cena: 'a.btn.btn-default.btn-block.hidden-xs'
                }
            }
        })
        jsonfile.writeFile("dbx.json", namecena, { flag: 'a' },
            function (err) {
                if (err) throw err;
            });
        console.log(i + " Page is scraped!!!");
    }
}

function scraperloop(i) {
    setTimeout(function () {
        if (i > 5) {
            joiner();
            return
        }
        scrape(i)
        scraperloop(++i)
    }, 2000)
}
function joiner() {
    acc = [];
    var text = fs.readFileSync('dbx.json', 'utf-8');
    lines = text.split(/\r?\n/);
    for (var i in lines) {
        if (lines[i]){
        var data = JSON.parse(lines[i]);

        }
        // console.log(data.data.length)
        acc.push(...data.data);
    }
    // console.log(acc.length)

    jsonfile.writeFile('db.json', acc, { spaces: 2 },
        function (err) {
            if (err) throw err;
            console.log("All is normal!!!");
        });
}
scraperloop(1)