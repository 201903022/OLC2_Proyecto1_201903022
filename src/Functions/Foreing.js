
import {Environment} from '../Environment/environment.js'
import {Invocable} from './Invocable.js'
import {ReturnException} from '../Clases/Transeferer.js'

export class ForeignFunction extends Invocable{ 
    constructor(nodo,closure){ 
        super()
        this.nodo = nodo
        this.closure = closure
    }
    aridad(){ 
        console.log('Aridad ForeignFunction: ')
        console.log(this.nodo.params.leng);
        return this.nodo.params.length;
    }

    /*
    * @type{Invocable['invocar']}
    */

    invocar(interprete,args){ 
        const entorno = new Environment(this.closure);

        this.nodo.params.forEach((param,i) =>{ 
            console.log('ForEach')
            console.log('Param: ',param);
            console.log('Param: ',param.id);
            console.log('Param: ',param.typeD);
            console.log('Arg: ',args[i]);
            entorno.assignVariable(param.id,args[i],param.typeD)

           // entorno.setVariable(param,args[i],args)
        })

        const EnvBeCalled = interprete.environment;
        interprete.environment = entorno;

        try {

            //node.dcls.forEach(dcl => dcl.accept(this));     
            this.nodo.bloque.accept(interprete);
        } catch (error) {
            interprete.environment = EnvBeCalled
            if (error instanceof ReturnException) {
                return error.value;
            }
            throw error;
            
        }
        interprete.environment = EnvBeCalled;
        return null;

    }

    atar(instancia){ 
        console.log('Atar')
        console.log(instancia)
        const HiddenEnv = new Environment(this.closure);
        return new ForeignFunction(this.nodo,HiddenEnv)
    }
    
}