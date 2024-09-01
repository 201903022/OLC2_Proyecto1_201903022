import {Dato} from '../Clases/Dato.js'
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
    setVariable(name,value){
        console.log('Setting variable: ', name)
        console.log('Value: ', value)

        const CurrentValue = this.variables[name];
        if (CurrentValue) {
            //check types
            if (CurrentValue.type === value.type) {
                this.variables[name] = value;
                return;
            }else{ 
                throw new Error(`Type mismatch ${CurrentValue.type} != ${value.type} in "${name}"   ${value.value} is not ${CurrentValue.type} `)
            }
        }
        if (!CurrentValue && this.before) {
            this.before.setVariable(name,value);
            return;
        }   
        throw new Error(`Variable "${name}" undefined`)     
    }

    /**
     * @param {string} id
     */

    getVariable(name) { 
        const cuurrentValue = this.variables[name]; 
        if (cuurrentValue) {
            return cuurrentValue;
        }

        if (!cuurrentValue && this.before) { 
            return this.before.getVariable(name);            
        }

        throw new Error(`Variable ${name} undefined`)
    }

    assignVariable(name,value,typeD) { 
            //this.variables [name] = {tipo:tipo, value:value }
       // console.log("***********************************************************")
      //  console.log("name: ",name)
       // console.log("value: ",value)
       // console.log("typeD: ",typeD)
       // console.log("array: ",array)

        const cuurrentValue = this.variables[name]; 
        console.log('CurrentValue: ', cuurrentValue)
        if (cuurrentValue === undefined) {
            //check types 
            if (typeD === value.type) {
                let datoToSave = new Dato(typeD,value.value,value.location)
                console.log('Both are the same type ')
                this.variables[name] = datoToSave;
                console.log('variable added :V')
                console.log(this.variables)
                return;                
            }
            else{ 
                console.log('Type mismatch')
                throw new Error(`Type mismatch ${typeD} != ${value.type}`)
            }

        }

        if (cuurrentValue === undefined && this.before) { 
            this.before.assignVariable(name,value);            
            return;
        }
        console.log('Variable undefined')
        throw new Error(`Variable "${name}" already defined`)
    }
        
}