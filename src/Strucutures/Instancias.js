import {StructIn} from './StructsIn.js'

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
        console.log('Valueee setting ',value)
        const prop = this.properties[name]
        console.log(`prop ${prop}`)
        if (prop) {
            console.log('prop not undefined')
            console.log('progp type : ', prop.type)

            console.log('value type : ', value.type)
            if (prop.type === value.type) {
                console.log('same prop type and value type')
                console.log(`${prop.type}  == ${value.type}`)
                this.properties[name] = value;
               this.properties[name] = value;
                return;
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