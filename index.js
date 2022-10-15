import mysql from 'mysql'
import parseCsv from './modules/parseCsv.js'
import generateSqlInsertString from './modules/generateSqlString.js';



//create a class called QueryOject. This will represent the data types, column names,
//and file path for the relevant .txt file containing the row data for this table type

class QueryObject {
    constructor(destTab, colNames, colTypes, filePath) {
        this.destTab = destTab;
        this.colNames = colNames;
        this.colTypes = colTypes;
        this.filePath = filePath;
    }
}




//create a new object using QueryObject class this new 
//object is specifically for the 'all candidates' datasheet

const allCandidates = new QueryObject(
    'all_candidates', 
    ['CAND_ID', 'CAND_NAME', 'CAND_ICI', 'PTY_CD', 'CAND_PTY_AFFILIATION', 'TTL_RECEIPTS', 'TRANS_FROM_AUTH', 'TTL_DISB', 'TRANS_TO_AUTH', 'COH_BOP', 'COH_COP', 'CAND_CONTRIB', 'CAND_LOANS', 'OTHER_LOANS', 'CAND_LOAN_REPAY', 'OTHER_LOAN_REPAY', 'DEBTS_OWED_BY', 'TTL_INDIV_CONTRIB', 'CAND_OFFICE_ST', 'CAND_OFFICE_DISTRICT', 'SPEC_ELECTION', 'PRIM_ELECTION', 'RUN_ELECTION', 'GEN_ELECTION', 'GEN_ELECTION_PERCENT' ,'OTHER_POL_CMTE_CONTRIB', 'POL_PTY_CONTRIB', 'CVG_END_DT', 'INDIV_REFUNDS','CMTE_REFUNDS'], 
    ['string','string','string','string','string','float','float','float','float','float','float','float','float','float','float','float','float','float','string','string','string','string','string','string','float','float','float','date','float','float'],
    '../raw_data/all_candidates/weball22.txt'
    )




//function to parse and then insert CSV into an SQL database
//THIS IS THE MAIN FUNCTIO OF THIS FILE

async function insertData(queryObj) {

    //get a parsed csv file
    const parsedFile = await parseCsv(queryObj)
    console.log(parsedFile)


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



    //
    //insert the parsed file contents into MySQL

    for(let i = 0; i < parsedFile.length; i++) {
        
        //use function to generate an INSERT statement for each row entry of the stream of csv data
        sql = await generateSqlInsertString(parsedFile, i, queryObj.colNames, queryObj.colTypes, queryObj.colNames.length, queryObj.destTab)
        
        //execute the SQL INSERT query
        con.query(sql, (error, results, fields) => {
            if(error) {
                return console.error(error.message)
            }
            console.log(results)
        })
    }


    //terminate db connection
    con.end()
    console.log('finished')


}



//Actually run this function
insertData(allCandidates)