import getAbsPath from "../getAbsPath"
import fs from 'fs'
import { readFile, open } from 'node:fs/promises';
import { parseCsvFile } from "../modules/parseCsv";


const file = await open('./raw_data/individual_contributions/by_date/itcont_2022_20011001_20210220.txt')
console.log('opened')

for await (const line of file.readLines()) {
  console.log(line);
}
file.close()
console.log('closed')
// const fileString = fileData + ''
// let contents = await fileString.replaceAll("'", " ")
// contents = await fileString.replaceAll("*", " ")
// let json = await parseCsvFile(contents)