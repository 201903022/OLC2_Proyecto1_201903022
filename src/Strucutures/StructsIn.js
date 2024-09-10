import {ForeignFunction} from '../Functions/Foreing.js'
import {ForeignFunction} from '../Functions/Invocable.js'
import {Expresion} from '../abstract/nodos.js'

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
        console.log('Invocar Structura')
        console.log('\t Inteprete: ', interprete)
        console.log('\t Args: ', args)
    }

}