//generate an SQL string of the form 
// INSERT INTO all_candidates(..column names as comma-separated strings..) 
//      VALUES(...individual strings inside single quotes, separated by commas...);

async function generateSqlInsertString(parsedFile, row, colNames, colTypes, colCount, destination) {
    let cols = [colNames]
    cols = cols.join(',')
    let insertString = `INSERT INTO ${destination} (${cols}) VALUES(`
    for(let i = 0; i < colCount; i++) {
    //add each value to the string of VALUES('abcd', 'BILL CLINTON', .... '0.0')

        //check type of value
        if(colTypes[i] === 'string') {
            insertString = `${insertString} '${parsedFile[row][i]}'`
        } else if(colTypes[i] === 'float') {
            insertString = `${insertString} '${parseFloat(parsedFile[row][i])}'`
        } else if(colTypes[i] === 'date') {
            insertString = `${insertString} '${parsedFile[row][i]}'`
        }
        
        //only add a comma after the string name, if this isn't the very last vale.
        // Last value doesn't need a comma
        if(i < colCount-1) {
            insertString = `${insertString}, `
        }

    }
    insertString = `${insertString});`
    return insertString
}

export default generateSqlInsertString