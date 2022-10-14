import neatCSV from 'neat-csv'
import fs from 'fs'
import { readFile } from 'node:fs/promises';
import { builtinModules } from 'module';
// const neatCSV = require('neat-csv')
// const fs = require('fs')
// const { readFile } = require('node:fs/promises')
// const {builtinModules} = require('module')

async function parseCsv(queryObj) {
    //read the csv file, store in contents
    let contents

    try {
    const filePath = new URL(queryObj.filePath, import.meta.url);
    // const filePath = new URL(queryObj.filePath);
    contents = await readFile(filePath, { encoding: 'utf8' });
    console.log('finished parsing csv')
    } catch (err) {
    console.error(err.message);
    }


    //parse csv file into JSON
    let parsedFile = await neatCSV(contents, { headers: false, separator: '|'})
    //return raw data and text
    return  parsedFile
}

export default parseCsv