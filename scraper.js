/*
    ***************************************************
    ***************************************************
    Script: LinkedIn Learning Scraper
    Author: OZeidi
    Description: JS Puppeteer-based utility to scrap details of LinkedIN Courses
    Version: V1.0
    Last Modification: 17th Sep 2021
    ***************************************************
    ***************************************************

*/

// Required Packages
const puppeteer = require('puppeteer');
const fs = require('fs');
const csv = require('csv-parser');
const { start } = require('repl');
// Utility function to convert JSON file to XLSX
const convert = require('./convert.js')
// Function to sum up array elements
const arrSum = (previousValue, currentValue) => previousValue + currentValue;

// Fetch  Text form page HTML based on XPATH 
async function fetchText(page, xpath){
    const [res] = await page.$x(xpath);
    const txt = await res.getProperty('textContent');
    const rawTxt = await txt.jsonValue();
    return(rawTxt);

}


// Remove repeating whites space/newlines from fetched text
String.prototype.allTrim = String.prototype.allTrim ||
     function(){
        return this.replace(/\s+/g,' ')
                   .replace(/^\s+|\s+$/,'');
     };


// Fucntion used to fetch the data from a course page
 async function scrapeCourse(page, url){
    var res = [];
    await page.goto(url);
    // GET COURST TITLE
    const rawTitle = await fetchText( page, '//*[@id="main-content"]/section[1]/section/div/div/div/h1');

    // Course level
    const rawLevel = await fetchText( page, '//*[@id="main-content"]/section[1]/section/div/div/div/h2/span[2]')

    // Course Details
    const rawDes = await fetchText( page, '//*[@id="course-content-tabs_tab-panel_0"]/section[1]/div/p')

    //TOC
    let rawTOC = await fetchText( page, '//*[@id="main-content"]/section[2]/section/ul')
    //fetch timing of each setion, the Seconds part
    let regex = /\s\d+s/ig;
    let secTotal = rawTOC.match(regex).join( " ").match(/\d+/ig).join(" ").split(' ').map(function(item) {
    return parseInt(item, 10)}).reduce(arrSum)/60;
    //fetch timing of each setion, the Minutes part
    regex = /\s\d+m/ig;
    let minTotal = rawTOC.match(regex).join( " ").match(/\d+/ig).join(" ")
    .split(' ').map(function(item) {
    return parseInt(item, 10)}).reduce(arrSum);
    let durationTotal = Math.round(minTotal+secTotal,1);

    //Make each TOC section at one line    
    regex = /\s\d+s/ig;
    var subst = "$&\n";
    rawTOC= rawTOC.allTrim().replace(regex, subst);

    // Instructer
    const rawInstructer = await fetchText( page, '//*[@id="course-content-tabs_tab-panel_0"]/section[2]')
    
    res= {
        'Title':rawTitle.allTrim(),
        'Duration': durationTotal +"m",
        'Level': rawLevel.allTrim(),
        'TOC': rawTOC,
        'Description':rawDes.allTrim(),
        'Instructer': rawInstructer.allTrim()
    };

    return(res);

}

// Wraper to iterate over lis of courses
async function Crawl(inputFile, outputFile){
    var browser =   await puppeteer.launch();
    var page = await  browser.newPage();
    var urls = fs.readFileSync(inputFile, "utf8");
    urls = urls.split("\n");

    console.log(urls.length);
    
    let len = urls.length;
    let lst = []
    for (const [i, item] of urls.entries()) { 
        console.log(`${i} out of ${len}`)
        //console.log(item);
        
        let res = await scrapeCourse(page, item);
        lst.push(res);
        console.log(res['Title'])
    }
    let data = JSON.stringify(lst);
    fs.writeFileSync(`data/${outputFile}.json`,data,"utf-8");
    convert.toXlsx(lst, `data/${outputFile}`);
    browser.close();
}


let  args = process.argv.slice(2);
console.log(args)

Crawl(args[0], args[1])