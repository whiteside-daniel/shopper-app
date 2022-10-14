import neatCSV from 'neat-csv'
import fs from 'fs'
import { readFile } from 'node:fs/promises';
import mysql from 'mysql'


//read the csv file, store in contents
let contents

try {
  const filePath = new URL('./weball22.txt', import.meta.url);
  contents = await readFile(filePath, { encoding: 'utf8' });
  console.log('contents captured');
} catch (err) {
  console.error(err.message);
}


//parse csv file into JSON
const parsedFile = await neatCSV(contents, { headers: false, separator: '|'})
// console.log(parsedFile)


//connect to SQL

var con = mysql.createConnection({
    host: "localhost",
    user: "shopper",
    password: "shopper"
  });
  

  //connect to database
  let sql = 'USE open_fec;'
  con.query(sql, (error, results, fields) => {
    if(error) {
        return console.error(error.message)
    }
    console.log(results)
  })



//insert the parsed file contents into MySQL
  for(let i = 0; i < parsedFile.length; i++) {
    sql = "INSERT INTO all_candidates(CAND_ID, CAND_NAME, CAND_ICI, PTY_CD, CAND_PTY_AFFILIATION, TTL_RECEIPTS, TRANS_FROM_AUTH, TTL_DISB, TRANS_TO_AUTH, COH_BOP, COH_COP, CAND_CONTRIB, CAND_LOANS, OTHER_LOANS, CAND_LOAN_REPAY, OTHER_LOAN_REPAY, DEBTS_OWED_BY, TTL_INDIV_CONTRIB, CAND_OFFICE_ST, CAND_OFFICE_DISTRICT, SPEC_ELECTION, PRIM_ELECTION, RUN_ELECTION, GEN_ELECTION, OTHER_POL_CMTE_CONTRIB, POL_PTY_CONTRIB, INDIV_REFUNDS,CMTE_REFUNDS) VALUES('"+parsedFile[i]['0']+"','"+parsedFile[i]['1']+"','"+parsedFile[i]['2']+"','"+parsedFile[i]['3']+"','"+parsedFile[i]['4']+"','"+parsedFile[i]['5']+"','"+parsedFile[i]['6']+"','"+parsedFile[i]['7']+"','"+parsedFile[i]['8']+"','"+parsedFile[i]['9']+"','"+parsedFile[i]['10']+"','"+parsedFile[i]['11']+"','"+parsedFile[i]['12']+"','"+parsedFile[i]['13']+"','"+parsedFile[i]['14']+"','"+parsedFile[i]['15']+"','"+parsedFile[i]['16']+"','"+parsedFile[i]['17']+"','"+parsedFile[i]['18']+"','"+parsedFile[i]['19']+"','"+parsedFile[i]['20']+"','"+parsedFile[i]['21']+"','"+parsedFile[i]['22']+"','"+parsedFile[i]['23']+"','"+parsedFile[i]['25']+"','"+parsedFile[i]['26']+"','"+parsedFile[i]['28']+"','"+parsedFile[i]['29']+"');"
    // sql = "INSERT INTO all_candidates(CAND_ID, CAND_NAME) VALUES('"+parsedFile[0]['0']+"', '"+parsedFile[0]['1']+"');"
    con.query(sql, (error, results, fields) => {
        if(error) {
            return console.error(error.message)
        }
        console.log(results)
      })
  }
console.log(parsedFile[0]['0'].toString())

  con.end()


  console.log(parsedFile.length)
  console.log('finished')

