import {Dato} from '../Clases/Dato.js'
import {ErrorClass,ErrorsArr,ErrorCounts} from '../Tables/Errors.js'
export class Environment{ 
    /**
     * @param {Environment} before
     */

    constructor( before = undefined) { 
         this.before = before; 
         this.variables = {};
    }

    /**
     * @param {string} id
     * @param {any} value
     */
    setVariable(name,value,locationStart){
        console.log('Setting variable: ', name)
        const CurrentValue = this.variables[name];
        if (CurrentValue) {
            if (CurrentValue.type === 'null') {
                this.variables[name] = value;
                return;                
            }
            if (value.type ==='null') {
                this.variables[name] = value;
                console.log('locationStart')
                console.log(locationStart)
                const errStr = `Type mismatch ${CurrentValue.type} != ${value.type} in "${name}"   ${value.value} is not ${CurrentValue.type} `
                const errToSave = new ErrorClass(ErrorCounts,errStr,locationStart.line,locationStart.column,"semantico")
                ErrorsArr.push(errToSave)
                console.log(errStr)
                return;                
            }

            //check types
            if (CurrentValue.type === value.type) {
                this.variables[name] = value;
                return;
            }else{ 
                const errStr = `Type mismatch ${CurrentValue.type} != ${value.type} in "${name}"   ${value.value} is not ${CurrentValue.type} `
                const errToSave = new ErrorClass(ErrorCounts,errStr,1,1,"semantico")
                ErrorsArr.push(errToSave)
                console.log(errStr)
                return;
            }
        }
        if (!CurrentValue && this.before) {
            this.before.setVariable(name,value);
            return;
        }   
        //const errStr = `Type mismatch ${CurrentValue.type? CurrentValue.type:'false'} != ${CurrentValue.type? CurrentValue.type:'false'} in "${name}"   ${value.value} is not ${CurrentValue.type? CurrentValue.type:'false'} `
        const errStr = `Type mismatch set variable ${name} `
        const errToSave = new ErrorClass(ErrorCounts,`variable "${name}" is undefined`,1,1,"semantico")
        ErrorsArr.push(errToSave)
        console.log(errStr)
        return;        
    }

    /**
     * @param {string} id
     */

    getVariable(name,value) { 
        const cuurrentValue = this.variables[name]; 
        if (cuurrentValue !== undefined) {
            return cuurrentValue;
        }

        if (!cuurrentValue && this.before) { 
            return this.before.getVariable(name);            
        }
        const errToSave = new ErrorClass(ErrorCounts,`Variabel "${name}" aint defined`, value.location.start.line,value.location.start.column, "sintactico")
        console.log('Type mismatch')
        ErrorsArr.push(errToSave)
        return (new Dato('null',null,null,null))
    }

    assignVariable(name,value,typeD,hasExp) { 
        const cuurrentValue = this.variables[name]; 
        if (cuurrentValue === undefined) {
            if (typeD === 'function') {
                let dataSave = new Dato('function',value,null)
                this.variables[name] = dataSave;
                return;                                
            }
            
            //var accepts any type
            if (typeD === 'var') {
                if (hasExp) {
                    let datoToSave  = new Dato(value.type,value.value,value.location)
                    this.variables[name] = datoToSave;
                    return;
                }else{ 
                    const errToSave = `Variable var ${name} must have exp`
                    const errStr = new ErrorClass(ErrorCounts,errToSave, value.location.start.line,value.location.start.column, "sintactico")
                    ErrorsArr.push(errStr)
                    return;

                }
            }          
            //float accepts int  
            if (typeD === 'float' && value.type ==='int') {
                let datoToSave = new Dato(typeD,value.value,value.location)
                console.log('float accepts ints ')
                this.variables[name] = datoToSave;
                console.log(this.variables)
                return;
            }            
            //check types 
            if (typeD === value.type) {
                let datoToSave = new Dato(typeD,value.value,value.location)
                this.variables[name] = datoToSave;
                return;                
            }
            else{ 
                const datoToSave = new Dato(typeD,null,value.location);
                this.variables[name] = datoToSave;
                const errStr = `Type mismatch ${name} is ${typeD}`
                const errToSave = new ErrorClass(ErrorCounts,errStr, value.location.start.line,value.location.start.column, "sintactico")
                console.log('Type mismatch')
                console.log(errToSave)
                console.log(value.location)
                ErrorsArr.push(errToSave)
                return
            }
            
        }
        
        if (cuurrentValue === undefined && this.before) { 
            console.log('aaaa cuurrentValue === undefined && this.before')
            this.before.assignVariable(name,value);            
            return;
        }
        console.log('Variable undefined')
        const errTosave = `variable ${name} already defined: ${cuurrentValue.value}`
        const errToSave = new ErrorClass(ErrorCounts,errTosave, value.location.line,value.location.column, "sintactico")
        ErrorsArr.push(errToSave)
        //ErrorCounts++;
        return;
    }



        
}