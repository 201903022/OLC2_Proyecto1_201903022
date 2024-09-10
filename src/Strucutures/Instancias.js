import {StructIn} from './StructsIn'

export class Instances { 
    constructor(StructIn){ 
        /**
         * @type {StructIn}
         */
        this.StructIn = StructIn;
        this.properties = {};
    }

    set(name,value){ 
        this.properties[name] = value;
    }

    get(name){ 
        if(this.properties.hasOwnProperty(name)){ 
            return this.properties[name];
        }
        const method = this.StructIn.getMethdo(name);
        if(method){ 
            return method;
        }
        return null;
    }
}