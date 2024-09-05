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
        return new Dato('int',parseInt(b[0].value),null)
    }), 
    'parsefloat': new NativeFunction(() => 1,(a,b) => { 
        console.log(parseFloat(b[0].value))
        return new Dato('float',parseFloat(b[0].value),null)
    }),
    'tostring': new NativeFunction(() => 1,(a,b) => { 
        return new Dato('string',b[0].value.toString(),null)
    }),
};