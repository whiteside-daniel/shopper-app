async function generateSqlInsertString(parsedFile, row, colNames, colTypes, colCount, destination) {
    let cols = [colNames]
    cols = cols.join(',')
    let insertString = `INSERT INTO ${destination} (${cols}) VALUES(`
    for(let i = 0; i < colCount; i++) {
        //check type of value
        if(colTypes[i] === 'string') {
            insertString = `${insertString} '${parsedFile[row][i]}'`
        } else if(colTypes[i] === 'float') {
            insertString = `${insertString} '${parseFloat(parsedFile[row][i])}'`
        } else if(colTypes[i] === 'date') {
            insertString = `${insertString} '${parsedFile[row][i]}'`
        }
        
        if(i < colCount-1) {
            insertString = `${insertString}, `
            // insertString = insertString + ","
        }
    }
    insertString = `${insertString});`
    console.log(insertString)
    return insertString
}

export default generateSqlInsertString