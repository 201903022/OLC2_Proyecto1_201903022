import {StructIn} from './StructsIn.js'
import {ErrorsArr,ErrorClass} from '../Tables/Errors.js'

export class Instances { 

    /**
     *  @param {StructIn} Estructura
     * 
    */
    constructor(Estructura){ 
        this.StructSave = Estructura;
        this.properties = {};
    }

    set(name,value){ 
        console.log(`Setting: ${name} -> ${value.value}`)
        const prop = this.properties[name]
        if (prop) {
            if (prop.type === value.type) {
                console.log('same prop type and value type')
                console.log(`${prop.type}  == ${value.type}`)
                this.properties[name] = value;
               this.properties[name] = value;
                return;
            }else{ 
                let errStr = `${name} ${prop.type} != ${value.type} `
                let line = value.location.start.line
                let column = value.location.start.column
                let type = 'Semantico'
                let err = new ErrorClass(ErrorCounts,errStr,line,column,type)
                ErrorsArr.push(err)
            }
        }else{             
            this.properties[name] = value;
        }
    }

    get(name){ 
        if(this.properties.hasOwnProperty(name)){ 
            console.log('hasOwnProperty')
            
            return this.properties[name];
        }
        const method = this.StructSave.getMethdo(name);
        if(method){ 
            return method;
        }
        return null;
    }
}