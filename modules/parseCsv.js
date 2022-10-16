import neatCSV from 'neat-csv'
import fs from 'fs'
import { readFile } from 'node:fs/promises';
import { builtinModules } from 'module';



//Parse a txt file containing CSV entries

async function parseCsv(queryObj) {

    //read the txt file, store in variable named contents
    //resul will be raw text data
    let contents
    let result
    try {
        const filePath = new URL(queryObj.filePath, import.meta.url);
        contents = await readFile(filePath, { encoding: 'utf8'});
        result = contents.replaceAll("'", " ")
        } 
    catch (err) {
        console.error(err.message);
    }



    //parse csv file into JSON objects
    let parsedFile = await neatCSV(result, { headers: false, separator: '|'})



    //return raw data and text
    return  parsedFile
}

export default parseCsv