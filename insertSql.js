import mysql from 'mysql'
import parseCsv from './modules/parseCsv.js'
import generateSqlInsertString from './modules/generateSqlString.js';
import readMultipleFiles from './index.js';
import {allCandidates, candidateCommitteeLink, individualContributions} from './tableObjects.js'


//function to parse and then insert CSV into an SQL database
//THIS IS THE MAIN FUNCTIO OF THIS FILE

export function openConnection() {
       //config for SQL
    var con = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "shopper",
        password: "shopper"
    });
    

    //connect to database
    let sql = 'USE open_fec;'
    con.query(sql, (error, results, fields) => {
        if(error) {
            return console.error('error creating SQL connection ' + error.message)
        }
        console.log(results)
    })

    return con
}

export function closeConnection(con) {
    //terminate db connection
    con.end()
}

export async function insertData (jsonData, queryObj, con) {

    let parsedFile = jsonData



    //
    //insert the parsed file contents into MySQL

    for(let i = 0; i < parsedFile.length; i++) {
        //use function to generate an INSERT statement for each row entry of the stream of csv data
        let sql = await generateSqlInsertString(parsedFile, i, queryObj.colNames, queryObj.colTypes, queryObj.colNames.length, queryObj.destTab)
        
        //execute the SQL INSERT query
        con.query(sql, (error, results, fields) => {
            if(error) {
                return console.error(error.message)
            }
            console.log(results)
        })
    }


}