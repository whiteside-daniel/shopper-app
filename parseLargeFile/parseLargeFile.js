import fs from 'fs'
import { parseCsvFile } from "../modules/parseCsv.js";
import readline from "readline";
import stream, { Duplex, PassThrough } from "stream";
import { insertData } from "../insertSql.js";

class Throttle extends Duplex {
    
    constructor(ms) {
        super()
        this.delay = ms
    }

    _read() {

    }

    _write(chunk, encoding, callback) {
        this.push(chunk)
        setTimeout(callback, this.delay)
    }

    _final() {
        this.push(null)
    }
}


//MAIN FUNCTION
export function parseLargeFile(filePath, encoding, queryObj) {
    //create streams
    var instream = fs.createReadStream(filePath, {encoding: encoding, highWaterMark: 8})

    var outstream = new stream()
    
    const throttle = new Throttle(50)
    
    instream.pipe(throttle)
    
    var rl = readline.createInterface(throttle,outstream)
    
    rl.on('line', async (line) => {
        let contents = await line.replaceAll("'", " ")
        const json = await parseCsvFile(contents)
        console.log(json)
        insertData(json, queryObj)
    })
}

// const fileString = fileData + ''
// let contents = await fileString.replaceAll("'", " ")
// contents = await fileString.replaceAll("*", " ")
// let json = await parseCsvFile(contents)