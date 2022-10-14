import mysql from 'mysql'
import parseCsv from './modules/parseCsv.js'
import generateSqlInsertString from './modules/generateSqlString.js';



class QueryObject {
    constructor(destTab, colNames, colTypes, filePath) {
        this.destTab = destTab;
        this.colNames = colNames;
        this.colTypes = colTypes;
        this.filePath = filePath;
    }
}

const allCandidates = new QueryObject(
    'all_candidates', 
    ['CAND_ID', 'CAND_NAME', 'CAND_ICI', 'PTY_CD', 'CAND_PTY_AFFILIATION', 'TTL_RECEIPTS', 'TRANS_FROM_AUTH', 'TTL_DISB', 'TRANS_TO_AUTH', 'COH_BOP', 'COH_COP', 'CAND_CONTRIB', 'CAND_LOANS', 'OTHER_LOANS', 'CAND_LOAN_REPAY', 'OTHER_LOAN_REPAY', 'DEBTS_OWED_BY', 'TTL_INDIV_CONTRIB', 'CAND_OFFICE_ST', 'CAND_OFFICE_DISTRICT', 'SPEC_ELECTION', 'PRIM_ELECTION', 'RUN_ELECTION', 'GEN_ELECTION', 'GEN_ELECTION_PERCENT' ,'OTHER_POL_CMTE_CONTRIB', 'POL_PTY_CONTRIB', 'CVG_END_DT', 'INDIV_REFUNDS','CMTE_REFUNDS'], 
    ['string','string','string','string','string','float','float','float','float','float','float','float','float','float','float','float','float','float','string','string','string','string','string','string','float','float','float','date','float','float'],
    '../raw_data/all_candidates/weball22.txt'
    )
console.log(allCandidates)
console.log(allCandidates.colNames.length)
console.log(allCandidates.colTypes.length)




//function to parse and then insert CSV into an SQL database
//

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

    //generate string of values for SQL INSERT Statement

   

    //insert the parsed file contents into MySQL
    for(let i = 0; i < parsedFile.length; i++) {
        // sql = "INSERT INTO "+queryObj.destTab+"("+queryObj.colNames+") VALUES('"+parsedFile[i]['0']+"','"+parsedFile[i]['1']+"','"+parsedFile[i]['2']+"','"+parsedFile[i]['3']+"','"+parsedFile[i]['4']+"','"+parsedFile[i]['5']+"','"+parsedFile[i]['6']+"','"+parsedFile[i]['7']+"','"+parsedFile[i]['8']+"','"+parsedFile[i]['9']+"','"+parsedFile[i]['10']+"','"+parsedFile[i]['11']+"','"+parsedFile[i]['12']+"','"+parsedFile[i]['13']+"','"+parsedFile[i]['14']+"','"+parsedFile[i]['15']+"','"+parsedFile[i]['16']+"','"+parsedFile[i]['17']+"','"+parsedFile[i]['18']+"','"+parsedFile[i]['19']+"','"+parsedFile[i]['20']+"','"+parsedFile[i]['21']+"','"+parsedFile[i]['22']+"','"+parsedFile[i]['23']+"','"+parsedFile[i]['25']+"','"+parsedFile[i]['26']+"','"+parsedFile[i]['28']+"','"+parsedFile[i]['29']+"');"
        // sql = `INSERT INTO ${queryObj.destTab}(${queryObj.colNames}) VALUES(${rowData});`
        sql = await generateSqlInsertString(parsedFile, i, queryObj.colNames, queryObj.colTypes, queryObj.colNames.length, queryObj.destTab)
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

insertData(allCandidates)