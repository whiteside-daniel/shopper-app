import neatCSV from 'neat-csv'
import fs from 'fs'
import { readFile } from 'node:fs/promises';
import { builtinModules } from 'module';
import getAbsPath from '../getAbsPath.js';


//Parse a txt file containing CSV entries
async function parseTextFile(path) {
    //read the txt file, store in variable named contents
    //resul will be raw text data
    let contents
    let result
    try {
        contents = await readFile(path, { encoding: 'utf8'});
        return await contents.replaceAll("'", " ")
        } 
    catch (err) {
        console.log('error with parseTextFile function: ' + err.message);
    }
}

async function parseCsvFile(text) {
    //parse csv file into JSON objects
    try {
        let parsedFile = await neatCSV(text, { headers: false, separator: '|'})
        return parsedFile
    } catch(err) {
        console.log('error with ParseCsvFile function: ' + err.message)
    }
}




//MAIN FUNCTION IN THIS FILE

async function parseCsv(path, directory) {
    console.log('file to parse was: ' + path)
    let csvData
    try{
        const filePath = getAbsPath(path, directory);
        console.log('got abs path '  + filePath)
        const textData = await parseTextFile(filePath)
        console.log('parsed txt file '  + path)
        // console.log('text is ' + textData)
        return await parseCsvFile(textData)
        
    } catch(err) {
        console.log('error with ParseCsv function: ' + err.message)
    }
    
}

export default parseCsv