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


export const embebidas = {
    'time': new NativeFunction(() => 0, () => { 
        console.log('HolaMundo TIMEEEEEEEEE')
        return new Dato('string', '04/09/2024',null)
    })
}