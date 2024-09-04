import {InterpreteVisitor} from '../Controller/InterpreteVisitor.js'
import {Environment} from '../Environment/environment.js'

export class Invocable { 

    aridad(){ 
        throw new Error('Aridad aint implemented')

    }

    /**
     * 
     * @param interprete {InterpreteVisitor}
     * @param args {any[]}
     */

    invocar(interprete,args){ 
        throw new Error('Invocar aint implemented')
    }

}