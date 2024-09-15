import { Dato } from '../Clases/Dato.js'
import {Invocable} from './Invocable.js'
import {ErrorClass,ErrorCounts,ErrorsArr} from '../Tables/Errors.js'
class NativeFunction extends Invocable{ 
    constructor(aridad,func) {
        super()
        this.aridad = aridad
        this.invocar = func
    }
}
export const embebidas = {
    'time': new NativeFunction(() => 0, () => { 
        console.log('HolaMundo TIMEEEEEEEEE')
        return new Dato('string', '04/09/2024',null)
    }),
    'parseint': new NativeFunction(() => 1,(a,b) => { 
        const value = Math.floor(parseFloat(b[0].value))
        if (isNaN(value)) {
            const errStr = `Cant to parseint ->  ${b[0].value} `
            const line = b[0].location.start.line
            const column = b[0].location.start.column;
            const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
            ErrorsArr.push(errToSave) ;
            return new Dato('null',null,b[0].location)            
        }
        return new Dato('int',value,null)
    }), 
    'parsefloat': new NativeFunction(() => 1,(a,b) => { 
        console.log(parseFloat(b[0].value))
        const value = parseFloat(b[0].value)
        if (isNaN(value)) {
            const errStr = `Cant to parsefloat ${b[0].value} `
            const line = b[0].location.start.line
            const column = b[0].location.start.column;
            const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
            ErrorsArr.push(errToSave) ;
            return new Dato('null',null,b[0].location)            
        }
        return new Dato('float',parseFloat(b[0].value),b[0].location)
    }),
    'tostring': new NativeFunction(() => 1,(a,b) => { 
        return new Dato('string',b[0].value.toString(),b[0].location)
    }),
    //tolowercase
    'tolowercase': new NativeFunction(() => 1,(a,b) => { 
        if (b[0].type ==='string') {
            return new Dato('string',b[0].value.toLowerCase(),b[0].location)            
        }        
        const errStr = `Cant to lower case ${b[0].value} `
        const line = b[0].location.start.line
        const column = b[0].location.start.column;
        const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
        ErrorsArr.push(errToSave) ;
        return new Dato('null',null,b[0].location)
    }),
    //touppercase
    'touppercase': new NativeFunction(() => 1,(a,b) => { 
        //validate Error: 
        if (b[0].type ==='string') {
            return new Dato('string',b[0].value.toUpperCase(),b[0].location)            
        }
        const errStr = `Cant to touppercase ->  ${b[0].value} `
        const line = b[0].location.start.line
        const column = b[0].location.start.column;
        const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
        ErrorsArr.push(errToSave) ;
        return new Dato('null',null,b[0].location)

    }),
    //typeof
    'typeof': new NativeFunction(() => 1,(a,b) => { 
        console.log('b: ', b[0].type)
        const value = b[0].value;
        console.log(b[0].type)
        return new Dato('string',b[0].type,b[0].location)
    }),
    //object.entries
    'entries': new NativeFunction(() => 1,(a,b) => { 
        const value = b[0].value;        
    }
)

};