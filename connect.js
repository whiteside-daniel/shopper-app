import mysql from 'mysql'

var con = mysql.createConnection({
    host: "192.168.1.241",
    port: "3306",
    user: "daniel",
    password: "my-secret-pw",
    insecureAuth: true
}); 

let sqlStmt = 'USE open_fec;'
con.query(sqlStmt, (error, results, fields) => {
    if(error) {
        return console.error('error creating SQL connection ' + error.message)
    }
    console.log('success in connecting')
})

con.end()