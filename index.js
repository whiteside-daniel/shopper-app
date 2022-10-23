import fs from 'fs'
import getAbsPath from './getAbsPath.js'
import {allCandidates, candidateCommitteeLink, individualContributions} from './tableObjects.js'
import { parseLargeFile } from './parseLargeFile/parseLargeFile.js'



let fileNames = []

//get an array list fileNames including all the file paths that should be read/parsed

async function readDirectory(queryObj) {
        fs.readdir(queryObj.filePath, function (err, files) {
            if(err) {
                console.log(err)
            }
    
            files.forEach(async function (fileName) {
                const filePath = getAbsPath(fileName, queryObj.filePath)
                parseLargeFile(filePath, 'utf8', queryObj)
                // const file = await open(filePath)
                // const fileData = await file.readFile({ encoding: 'utf8'})
                // file.close()
                // const fileString = fileData + ''
                // let contents = await fileString.replaceAll("'", " ")
                // contents = await fileString.replaceAll("*", " ")
                // let json = await parseCsvFile(contents)
                // insertData(json, queryObj)
                // console.log('parsed file looks like ' + json)
                // await insertData(json, queryObj) 
                
            })   
        })
}




//main function
async function readMultipleFiles(queryObj) {
    try{ 
        
        console.log('try reading multiple files with ' + queryObj.destTab)
        await readDirectory(queryObj)

    } catch(err) {
        console.log('error with ReadMultipleFiles: ' + err.message)
    }
}



await readMultipleFiles(individualContributions)


export default readMultipleFiles