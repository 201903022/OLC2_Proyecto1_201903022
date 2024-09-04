import { Dato } from '../Clases/Dato.js'
import {Invocable} from './Invocable.js'

class NativeFunction extends Invocable{ 
    constructor(aridad,func) {
        super()
        this.aridad = aridad
        this.func = func
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
        return new Dato('number', new Date().getTime(),null)
    })
}