import {Invocable} from '../Functions/Invocable.js'
import {Expresion} from '../abstract/nodos.js'
import {Instances} from './Instancias.js'
import {ForeignFunction} from '../Functions/Foreing.js'
export class StructIn extends Invocable{ 

    constructor(name,properties,methos){ 
        super();
        /**
         * @type {string}
         */
        this.name = name;

        /** 
         * @type {Object.<string,Expresion>}
         */
        this.properties = properties;

        /**
         * @type {Object.<string,ForeignFunction>}
        */
        this.methods = methos;
    }
   /**
    * @param {string} name
    * @returns {ForeignFunction | null}
    */

   getMethdo(name){ 
         if(this.methods.hasOwnProperty(name)){ 
              return this.methods[name];
         }
         return null;
   }

   aridad(){ 
    console.log('Aridaaaaaaaaaaaaaaad')
    console.log(this.properties)
    console.log(this.properties.length)
    
    //return this.properties.length;
    const cstor = this.getMethdo('constructor')
    if (cstor) {
        return cstor.aridad();        
     }
     return 0;
   }
    /**
    * @type {Invocable['invocar']}
    */

    invocar(interprete,args){ 
        const struct = new Instances(this);
        Object.entries(this.properties).forEach(
            ([key,value]) => {
                struct.set(key,value);
            }
        );
        args.forEach(
            (arg) => { 
                const valueAsg = arg.asgn.accept(interprete);
                struct.set(arg.id,valueAsg);
            }
        );
        const cstr = this.getMethdo('constructor')
        if(cstr){ 
            cstr.atar(struct).invocar(interprete,args);
        }
        return struct;

    }

}