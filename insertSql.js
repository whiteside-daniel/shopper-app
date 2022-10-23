import mysql from 'mysql'
import generateSqlInsertString from './modules/generateSqlString.js';
import readMultipleFiles from './index.js';
import {allCandidates, candidateCommitteeLink, individualContributions} from './tableObjects.js'


//function to parse and then insert CSV into an SQL database
//THIS IS THE MAIN FUNCTIO OF THIS FILE


export async function insertData (jsonData, queryObj) {

    let parsedFile = jsonData
    console.log(parsedFile)

    const con = mysql.createConnection({
        host: "192.168.1.241",
        port: "3306",
        user: "daniel",
        password: "my-secret-pw",
        database: 'open_fec',
        insecureAuth: true
    }); 


    //
    //insert the parsed file contents into MySQL

    for(let i = 0; i < parsedFile.length; i++) {
        //config for SQL
        // console.log('creating connection')
    

    //use function to generate an INSERT statement for each row entry of the stream of csv data
        const sql = await generateSqlInsertString(parsedFile[i], queryObj.colNames, queryObj.colTypes, queryObj.colNames.length, queryObj.destTab)
        
    //execute the SQL INSERT query
        con.query(sql, (error, results, fields) => {
            if(error) {
                return console.error(error.message)
            }
            // console.log(sql)
            console.log(results)
        })

        
    }

    con.end((err) => {
        if(err) console.log(err)
        setTimeout(() => {1}, 50)
    })
}