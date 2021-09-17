# LinkedIN Learning Scraper

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)



## Table of Contents

- [Background](#background)
- [Technical Breif](#technical-brief)
- [Usage](#usage)
- [Sample Output](#sample-output)
- [Resources](#Resources)
- [License](#license)

## Background

In the age of COVID-19, a lot of organization had switched to virtual Learning & Development platforms. LinkedIN Learning is one of the fastly growing and widly adopted L&D mediums in the corporate world.
This utility script ingests a list of LinkedIn URL Courses and collect details related to, Course Name, Description, Level, Duration, Content Sections, and Author Details.
The fetched data is saved to XLSX file, where L&D Specialists can review it to decide on what courses shold be adopted fo the organization.

## Technical Breif
This code base is built using Node.js and will require node and npm to be avaible on your machine. The script uses Puppeteer to control a headless browser instance to fetch the required data. No LinkedIn logging credentials are required.

## Usage
1. Clone this repo to your machine.

```sh
$ git clone https://github.com/Ozeidi/Recursive-Tree.git
```
2. cd into the cloned dirctory:

```sh
$ cd LiL_Scraper
```
3. Install the required packages:
```sh
$ npm install
```
4. Launch the script as following. The first parameter is the link to flat file containing the courses URLS. The second parameter is the output file name. Output will be saved in the folder `data`

```sh
$ node  scraper.js  "data/LiL_URLs.csv"  "courses2.xlsx"

0 out of 91
Database Foundations: Database Management 
1 out of 91
Database Foundations: Intro to Databases 
2 out of 91
Database Foundations: Administration 
.....
```

## Sample Output
![Sample Output](img/sample.png?raw=true "Sample Output")
##  Resources
- [Puppeteer Documentation](https://pptr.dev/)
- [Aron Jack Tutorial on Scraping with JS](https://www.youtube.com/watch?v=TzZ3YOUhCxo&t=9s)

## License

[MIT](LICENSE) © Omar Al Zeidi
{"mode":"full","isActive":false}