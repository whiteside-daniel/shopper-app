
import path from 'path'
import {fileURLToPath} from 'url';



function getAbsPath(pathString, directory) {
    try{

        const __filename = fileURLToPath(import.meta.url);

       
        const __dirname = path.dirname(__filename);

        
        const absPath = path.join(__dirname, directory, pathString);
        // console.log(absPath)

        return absPath
    } catch(err) {
        console.log(err.message)
    }

    
}

export default getAbsPath