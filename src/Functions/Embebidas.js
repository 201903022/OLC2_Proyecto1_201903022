import { Dato } from '../Clases/Dato.js'
import {Invocable} from './Invocable.js'

class NativeFunction extends Invocable{ 
    constructor(aridad,func) {
        super()
        this.aridad = aridad
        this.invocar = func
    }
}
//aqui van las funciones nativas del enunciado: 
//parseInt
//parseFloat
//toString
//toLowerCase
//toUpperCase
//typeOf

function parseIntFunction(valor) {
    console.log('parseIntFucntion');
    console.log(valor);
    
}

export const embebidas = {
    'time': new NativeFunction(() => 0, () => { 
        console.log('HolaMundo TIMEEEEEEEEE')
        return new Dato('string', '04/09/2024',null)
    }),
    'parseint': new NativeFunction(() => 1,(a,b) => { 
        const value = Math.floor(parseFloat(b[0].value))
        return new Dato('int',value,null)
    }), 
    'parsefloat': new NativeFunction(() => 1,(a,b) => { 
        console.log(parseFloat(b[0].value))
        return new Dato('float',parseFloat(b[0].value),b[0].location)
    }),
    'tostring': new NativeFunction(() => 1,(a,b) => { 
        return new Dato('string',b[0].value.toString(),b[0].location)
    }),
    //tolowercase
    'tolowercase': new NativeFunction(() => 1,(a,b) => { 
        return new Dato('string',b[0].value.toLowerCase(),b[0].location)
    }),
    //touppercase
    'touppercase': new NativeFunction(() => 1,(a,b) => { 
        return new Dato('string',b[0].value.toUpperCase(),b[0].location)
    }),
    //typeof
    'typeof': new NativeFunction(() => 1,(a,b) => { 
        console.log('b: ', b[0].location)
        const value = b[0].value;

        if (typeof(value) === 'number') {
            return new Dato('string',Number.isInteger(value)? 'int':'float',b[0].location)            
        }
        return new Dato('string',typeof(b[0].value),b[0].location)
    }),

};