import neatCSV from 'neat-csv'
import fs from 'fs'
import { readFile } from 'node:fs/promises';
import { builtinModules } from 'module';
import getAbsPath from '../getAbsPath.js';




export async function parseCsvFile(text) {
    //parse csv file into JSON objects
    try {
        let parsedFile = await neatCSV(text, { headers: false, separator: '|'}) 
        return parsedFile
    } catch(err) {
        console.log('error with ParseCsvFile function: ' + err.message)
    }
}




// //MAIN FUNCTION IN THIS FILE

// async function parseCsv(file) {
//     console.log('file to parse was: ' + file)
//     let csvData
//     try{
//         //read the txt file, store in variable named contents
//         //resul will be raw text data
//         let contents
//         let result
//         contents = await readFile(file, { encoding: 'utf8'});
//         await contents.replaceAll("'", " ")
        
//         // const textData = await parseTextFile(file)
//         // console.log('text is ' + textData)
//         return await parseCsvFile(textData)
        
//     } catch(err) {
//         console.log('error with ParseCsv function: ' + err.message)
//     }
    
// }

// export default parseCsv