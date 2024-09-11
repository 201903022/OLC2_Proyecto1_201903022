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
        this.properties[name] = value;
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