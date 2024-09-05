import {BaseVisitor} from '../abstract/visitor.js'
import {Environment} from '../Environment/environment.js'
import {Dato} from '../Clases/Dato.js'
import {BreaKException,ContinueException,ReturnException} from '../Clases/Transeferer.js'
import nodos from '../abstract/nodos.js';
import {embebidas} from '../Functions/Embebidas.js'
import {Invocable} from '../Functions/Invocable.js'
export class InterpreteVisitor extends BaseVisitor {
    
    constructor() {
        super();
        this.environment = new Environment(undefined);
        this.outPut = '';

        //funciones embebidas: 
        Object.entries(embebidas).forEach(([nombre,funcion]) => { 
            this.environment.assignVariable(nombre,funcion,'function')
        });

        /**
         * @type {Expresion|null}
         */
        this.prevContinue = null;
    }

    interpret(nodo){ 
        return nodo.accept(this);
    }


   /**
    *  @type{BaseVisitor['visitExpresion']}
    */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }

    /**
     * @type{BaseVisitor['visitPrimitive']}
     */

    visitPrimitive(node) {
        
        console.log('visitPrimitive')
        let dato; 
        switch (node.typeD) {
            case 'int':
               // console.log('int')
                //dato
                dato = new Dato(node.typeD, parseInt(node.value), node.location); 
              //  console.log("Datoooo: ")
               // console.log(dato)
                node.value = Number(node.value); 
                return (new Dato(node.typeD,node.value,node.location));    
            case 'float':
               // console.log('float')                
                node.value = Number(node.value);
               // console.log('node.value: ', node.value)
                return (new Dato(node.typeD,node.value,node.location))
            case 'string':
                let cadena = node.value;
                cadena = cadena.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\/g, '\\');
               // console.log('Cadenaaaaa ',cadena)
                node.value = cadena;
               // console.log('string')
                return (new Dato(node.typeD,node.value,node.location))
            case 'bool': 
                //console.log('bool')
                node.value = (node.value === 'true') ? true : false;
                return (new Dato(node.typeD,node.value,node.location))
            case 'char': 
               // console.log('char')
                node.value = node.value.replace(/'/g, '');
                return (new Dato(node.typeD,node.value,node.location))                
            default:
                throw new Error(`Type primitive is no supported ${typePrimitive}`);
        }
        
    }
    
/**
 * @type{BaseVisitor['visitOperacionBinaria']}
 */
    visitOperacionBinaria(node) {
        console.log('**************************')
        console.log('Operacion Binaria')
        //tipo
        const left = node.izq.accept(this); 
        const right = node.der.accept(this); 
        switch (node.op) {
            case '+':
              //  console.log('Tipos a Sumar: ')
               // console.log('left: ',left.type)
               // console.log('right: ',right.type) 
                if (left.type === 'string' && right.type === 'string') {
                    let typeD = 'string';
                    let suma = left.value + right.value; 

                    return (new Dato(typeD,suma,node.location));
                    
                } else if(left.type === 'int' && right.type === 'int') {
                    let typeD = 'int';
                    let suma = left.value + right.value; 
                    suma = parseInt(suma)
                    return (new Dato(typeD,suma,node.location));
                    
                }else if (left.type === 'int' && right.type === 'float') {
                    let typeD = 'float';
                    let suma = left.value + right.value; 
                    //suma = parseFloat(suma)
                    return (new Dato(typeD,suma,node.location));
                                    
                }else if (left.type === 'float' && right.type === 'float') {
                    let typeD = 'float';
                    let suma = left.value + right.value; 
                   //// suma = parseFloat(suma)
                    return (new Dato(typeD,suma,node.location));                    
                }else if (left.type === 'float' && right.type === 'int') {
                    let typeD = 'float';
                    let suma = left.value + right.value; 
                   // suma = parseFloat(suma)
                    return (new Dato(typeD,suma,node.location));                    
                }else{ 
                    throw new Error(`Operator is no supported ${node.op} cant add ${left.type} + ${right.type}`);
                }                
                case '-':
                    if (left.type === 'string' || right.type === 'string') {
                        throw new Error(`Operator is no supported ${node.op} cant substract using string`)                        
                    } else if(left.type === 'int' && right.type === 'int') {
                        let typeD = 'int';
                        let suma = left.value - right.value; 
                        suma = parseInt(suma);
                        return (new Dato(typeD,suma,node.location));
                        
                    }else if (left.type === 'int' && right.type === 'float') {
                        let typeD = 'float';
                        let suma = left.value - right.value; 
                       // suma = parseFloat(suma);
                        return (new Dato(typeD,suma,node.location));
                                        
                    }else if (left.type === 'float' && right.type === 'float') {
                        let typeD = 'float';
                        let suma = left.value - right.value; 
                        return (new Dato(typeD,suma,node.location));                    
                    }else if (left.type === 'float' && right.type === 'int') {
                        let typeD = 'float';
                        let suma = left.value - right.value; 
                       // suma = parseFloat(suma)
                        return (new Dato(typeD,suma,node.location));                    
                    }else{ 
                        throw new Error(`Operator is no supported ${node.op} cant add ${left.type} + ${right.type}`);
                    }                
                case '*':
                        if (left.type === 'string' || right.type === 'string') {
                            throw new Error(`Operator is no supported ${node.op} cant substract using string`)                        
                        } else if(left.type === 'int' && right.type === 'int') {
                            let typeD = 'int';
                            let mult =parseInt(left.value * right.value) ; 
                            return (new Dato(typeD,mult,node.location));                            
                        }else if (left.type === 'int' && right.type === 'float') {
                            let typeD = 'float';
                            let mult =parseFloat(left.value * right.value) ; 
                            return (new Dato(typeD,mult,node.location));                                            
                        }else if (left.type === 'float' && right.type === 'float') {
                            let typeD = 'float';
                            let mult =parseFloat(left.value * right.value) ; 
                            return (new Dato(typeD,mult,node.location));                    
                        }else if (left.type === 'float' && right.type === 'int') {
                            let typeD = 'float';
                            let mult =parseFloat(left.value * right.value) ; 
                            return (new Dato(typeD,mult,node.location));                    
                        }else{ 
                            throw new Error(`Operator is no supported ${node.op} cant add ${left.type} + ${right.type}`);
                        }                                                                
                case '/':
                            if (left.type === 'string' || right.type === 'string') {
                                throw new Error(`Operator is no supported ${node.op} cant substract using string`)                        
                            }  
                            if (right.value === 0) {
                                throw new Error('No se puede dividir entre 0')
                                
                            } 
                            if(left.type === 'int' && right.type === 'int') {
                                let typeD = 'int';
                                let div =parseInt(left.value / right.value) ; 
                                return (new Dato(typeD,div,node.location));
                            }else if (left.type === 'int' && right.type === 'float') {
                                let typeD = 'float';
                                let div =parseFloat(left.value / right.value) ;
                                return (new Dato(typeD,div,node.location));                                            
                            }else if (left.type === 'float' && right.type === 'float') {
                                let typeD = 'float';
                                let div =parseFloat(left.value / right.value) ;
                                return (new Dato(typeD,div,node.location));                    
                            }else if (left.type === 'float' && right.type === 'int') {
                                let typeD = 'float';
                                let div =parseFloat(left.value / right.value) ;
                                return (new Dato(typeD,div,node.location));                    
                            }else{ 
                                throw new Error(`Operator is no supported ${node.op} cant add ${left.type} + ${right.type}`);
                            }
                default:
                    throw new Error(`Operator is no supported ${node.op}`);
                }
    }

    /**
     * @type{BaseVisitor['visitOpLogica']} 
     */
    
    visitOpLogica(node){ 

            const left = node.izq.accept(this); 
            const right = node.der.accept(this); 

            console.log('visitOplogica')
           // console.log('node: ',node)
            switch (node.op) {
                case '==':
                    //console.log('==')
                    if (left.value === right.value) {
                        return new Dato('bool',true,node.location)
                        
                    } else {
                        return new Dato('bool',false,node.location)                        
                    }
                case '!=':
                    //console.log('!=')
                    if (left.value !== right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '>':
                    //console.log('>')
                    if (left.value > right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '<':
                    //console.log('<')
                    if (left.value < right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '>=':
                    //console.log('>=')
                    if (left.value >= right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '<=':
                    //console.log('<=')
                    if (left.value <= right.value) {
                        //console.log(left.value , ' <= ', right.value)
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)

                default:
                    throw new Error(`Operator is no supported ${node.op}`);
            }

    }

/**
 * @type{BaseVisitor['visitOperacionUnaria']}
 */
    visitOperacionUnaria(node) {
       // console.log('Operacion Unaria')
        const exp = node.exp.accept(this); 
        switch (node.op) {
            case '-':
                let a = new Dato(exp.type, -(exp.value), node.location)
                return a;    
            default:
                throw new Error(`Operator is no supported ${node.op}`);
        }

    }
    
/**
 * @type{BaseVisitor['visitAgrupacion']}
 */
    visitAgrupacion(node) {            
            return node.exp.accept(this);
    }
    
/**
 * @type{BaseVisitor['visitNumero']}
 */
    visitNumero(node) {
        console.log('Visit Numero ')
        console.log('Valor: ', node.valor)
        return node.valor;
    }
    
/**
 * @type{BaseVisitor['visitDeclaracionVariable']}
 */
    visitDeclaracionVariable(node) {
          //  console.log('Visit Declaracion Variable')
         //   console.log('Id: ', node.id)
         ///   console.log('Exp: ', node.exp)
         //   console.log('TypeD: ', node.typeD)  
            const value = node.exp.accept(this);
          //  console.log('Value: ', value.value)
          //  console.log('Value Type: ', value.type)
            
            this.environment.assignVariable(node.id,value,node.typeD)
           // console.log('Variable is added to enviroment')

    }
    
/**
 * @type{BaseVisitor['visitReferenciaVariable']}
 */
    visitReferenciaVariable(node) {
      // console.log('Referencia de variableeeeee: ', node)
        const varName = node.id;
        const value = this.environment.getVariable(varName);
        if (!value) {
            throw new Error(`Variable ${varName} undefined`)
        }
        return value;
    }
    
/**
 * @type{BaseVisitor['visitPrint']}
 */
    visitPrint(node) { 
        console.log('**********PRINT***********')
       // console.log('Visit print')
       /// console.log('Valor: aaaaaaaa', node) 
      //  console.log('value node.exp: ',node.exp.value)
       // console.log('Valor: ', node.exp.accept(this))
       const value = node.exp.accept(this); 
      // console.log('Valor Valueee: ', value)
       if (value.type) {
          // console.log('tiene tipooo ')
          // console.log(value.type)
           if (value.type === 'float') {
                let a = value.value.toFixed(4);
                this.outPut += a + '\n';
           }else{ 
               this.outPut += value.value+ '\n';
           }
        }else{ 
            //no se xdd
       }

    }
    
/**
 * @type{BaseVisitor['visitExpresionStmt']}
 */
    visitExpresionStmt(node) {
       // console.log('Visit ExpresionStmt')
        node.exp.accept(this);
    }
    
/**
 * @type{BaseVisitor['visitAsignacion']}
 */
    visitAsignacion(node) {
        
        console.log("asignacion ")
        //console.log('node.id ',node.id)
        //console.log('node.exp ',node.exp)
        //console.log(node)

        const varName = node.id; 
        const value = node.asgn.accept(this);
        this.environment.setVariable(varName,value);
    }
    
/**
 * @type{BaseVisitor['visitBloque']}
 */
    visitBloque(node) {
            const pastEnv = this.environment; 
            this.environment = new Environment(pastEnv);
            node.dcls.forEach(dcl => dcl.accept(this));     
            this.environment = pastEnv;            
    }
    
/**
 * @type{BaseVisitor['visitIf']}
 */
    visitIf(node) {
        const cond = node.cond.accept(this); 

        if (cond.value) {
            node.stmtTrue.accept(this);
            return
        }

        if (node.stmtFalse) {
            node.stmtFalse.accept(this);
        }
    }
    
/**
 * @type{BaseVisitor['visitWhile']}
 */
    visitWhile(node) {        
        console.log('WHILEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE')
        const startingEnv = this.environment;
        try {

            while (node.cond.accept(this).value) {
                console.log('whileeee')
                node.stmt.accept(this);
               // this.environment = new Environment(startingEnv);
            }
            
        } catch (error) {  
            this.environment = startingEnv;
            if (error instanceof BreaKException) {
                console.log('BreaaaaaKing')
                return;                            
            }
            if (error instanceof ContinueException) {
                return this.visitWhile(node);                            
            }  
        }

    }
    
/**
 * @type{BaseVisitor['visitFor']}
 */
    visitFor(node) {    

        //crear un while
        const incB = this.prevContinue; 
        this.prevContinue = node.inc; 

        const forT = new nodos.Bloque({ 
            dcls: [ 
                node.init,
                new nodos.While({ 
                    cond: node.cond,
                    stmt: new nodos.Bloque({ 
                        dcls: [ 
                            node.stmt,
                            node.inc
                        ]
                        })
                })
            ]                
        })
        forT.accept(this);
        this.prevContinue = incB;
    }
    
/**
 * @type{BaseVisitor['visitBreak']}
 */
    visitBreak(node) {
        console.log('BREAAAAAK')
        throw new BreaKException();        
    }
    
/**
 * @type{BaseVisitor['visitContinue']}
 */
    visitContinue(node) {        
        console.log('Continueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        if (this.prevContinue) {
            console.log('Continuing in', this.prevContinue)
            this.prevContinue.accept(this);           
        }

        throw new ContinueException();
    }
    
/**
 * @type{BaseVisitor['visitReturn']}
 */
    visitReturn(node) {
        let value = null;
        if(node.exp){ 
            value = node.exp.accept(this); 
        }
        throw new ReturnException(value);        
    }
/**
 * @type{BaseVisitor['visitLlamada']}
 */
    visitLlamada(node){ 
        console.log('Llamada')
        console.log('node')
        console.log(node)
        console.log("Variables Envior")
        console.log(this.environment.variables)
        console.log('')
        const function1 = node.callee.accept(this).value;
        console.log('Function1 ', function1)
        console.log('node.args', node.args)
        const args = node.args.map(arg => arg.accept(this));
        console.log('args')
        console.log(args)
        if (!(function1 instanceof Invocable)) {
            throw new Error('No es invocable aaaa')
            
        }

        if (function1.aridad() !== args.length) {
            throw new Error('No es la misma aridad')            
        }
        console.log('Function 1 again: ',function1)
        console.log('this.args.value, ',args)
        return function1.invocar(this,args);

    }
    


}