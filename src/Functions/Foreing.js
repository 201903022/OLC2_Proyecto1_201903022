
import {Environment} from '../Environment/environment.js'
import {Invocable} from './Invocable.js'
import {ReturnException} from '../Clases/Transeferer.js'

export class ForeignFunction extends Invocable{ 
    constructor(nodo,closure){ 
        super()
        this.nodo = nodo
        this.closure = closure
    }
    
}