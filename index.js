import fs from 'fs'
import parseCsv from './modules/parseCsv.js'
import getAbsPath from './getAbsPath.js'
import {allCandidates, candidateCommitteeLink, individualContributions} from './tableObjects.js'
import { insertData, openConnection, closeConnection } from './insertSql.js'



let fileNames = []

//get an array list fileNames including all the file paths that should be read/parsed

async function readDirectory(queryObj, con) {
        fs.readdir(queryObj.filePath, function (err, files) {
            if(err) {
                console.log(err)
            }
    
            files.forEach(async function (file) {
                console.log('trying to parse txt data')
                let json = await parseCsv(file, queryObj.filePath)
                await insertData(json, queryObj, con)
            })   
        })
}




//main function

async function readMultipleFiles(queryObj, con) {
    try{ 
        
        console.log('try reading multiple files with ' + queryObj.destTab)
        await readDirectory(queryObj, con)

    } catch(err) {
        console.log('error with ReadMultipleFiles: ' + err.message)
    }
}

const con = openConnection()
await readMultipleFiles(individualContributions, con)


export default readMultipleFiles