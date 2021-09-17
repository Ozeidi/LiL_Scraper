
const fs = require('fs');
var json2xls = require('json2xls');

exports.toXlsx = function(data, xlsxfile) {
    // let rawdata = fs.readFileSync(jsonfile);
    // let data = JSON.parse(rawdata);

    var xls = json2xls(data);

    fs.writeFileSync(xlsxfile, xls, 'binary', (err) => {
        if (err) {
            console.log("writeFileSync :", err);
        }
    console.log( xlsxfile+" file is saved!");
 });
}


// convert(student, 'test2.xlsx');