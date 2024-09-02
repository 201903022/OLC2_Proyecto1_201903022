import {BaseVisitor} from '../abstract/visitor.js'
import {Environment} from '../Environment/environment.js'
import {Dato} from '../Clases/Dato.js'
import {roundToDecimal} from '../utils/util.js'
export class InterpreteVisitor extends BaseVisitor {
    
    constructor() {
        super();
        this.environment = new Environment(undefined);
        this.outPut = '';

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
                console.log('int')
                //dato
                dato = new Dato(node.typeD, parseInt(node.value), node.location); 
                console.log("Datoooo: ")
                console.log(dato)
                node.value = Number(node.value); 
                return (new Dato(node.typeD,node.value,node.location));    
            case 'float':
                console.log('float')                
                node.value = Number(node.value);
                node.value = roundToDecimal(node.value,4)
                console.log('node.value: ', node.value)
                return (new Dato(node.typeD,node.value,node.location))
            case 'string':
                let cadena = node.value;
                cadena = cadena.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\/g, '\\');
                console.log('Cadenaaaaa ',cadena)
                node.value = cadena;
                console.log('string')
                return (new Dato(node.typeD,node.value,node.location))
            case 'bool': 
                console.log('bool')
                node.value = (node.value === 'true') ? true : false;
                return (new Dato(node.typeD,node.value,node.location))
            case 'char': 
                console.log('char')
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
                console.log('Tipos a Sumar: ')
                console.log('left: ',left.type)
                console.log('right: ',right.type) 
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
     * @param {BaseVisitor['visitOpLogica']} 
     */
    
    visitOpLogica(node){ 
            console.log('visitOplogica')
            console.log('node: ',node)

    }

/**
 * @type{BaseVisitor['visitOperacionUnaria']}
 */
    visitOperacionUnaria(node) {
        console.log('Operacion Unaria')
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
        try {
            
            return node.exp.accept(this);
        } catch (error) {
            throw new Error('Error trying to visitAgrupacion')
        }
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
        try {
            console.log('Visit Declaracion Variable')
            console.log('Id: ', node.id)
            console.log('Exp: ', node.exp)
            console.log('TypeD: ', node.typeD)  
            const value = node.exp.accept(this);
            console.log('Value: ', value.value)
            console.log('Value Type: ', value.type)
            
            this.environment.assignVariable(node.id,value,node.typeD)
            console.log('Variable is added to enviroment')
        } catch (error) {
            console.log('Errooooooooor: ',error)
            throw new Error(`Error tryin to declarate a variable "${node.id}" ${error}`)
        }

    }
    
/**
 * @type{BaseVisitor['visitReferenciaVariable']}
 */
    visitReferenciaVariable(node) {
        console.log('Referencia de variableeeeee: ', node)
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
       console.log('Valor Valueee: ', value)
       if (value.type) {
           console.log('tiene tipooo ')
           console.log(value.type)
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
        console.log('Visit ExpresionStmt')
        node.exp.accept(this);
    }
    
/**
 * @type{BaseVisitor['visitAsignacion']}
 */
    visitAsignacion(node) {
        
        console.log("asignacion ")
        console.log('node.id ',node.id)
        console.log('node.exp ',node.exp)
        console.log(node)

        const varName = node.id; 
        const value = node.asgn.accept(this);
        this.environment.setVariable(varName,value);
    }
    
/**
 * @type{BaseVisitor['visitBloque']}
 */
    visitBloque(node) {

        try {
            const pastEnv = this.environment; 
            this.environment = new Environment(pastEnv);
            node.dcls.forEach(dcl => dcl.accept(this)); 
    
            this.environment = pastEnv;
            
        } catch (error) {
            
            throw new Error('Metodo visitBloque no implementado');
        }

    }
    
/**
 * @type{BaseVisitor['visitIf']}
 */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    
/**
 * @type{BaseVisitor['visitWhile']}
 */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    
/**
 * @type{BaseVisitor['visitFor']}
 */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    
/**
 * @type{BaseVisitor['visitBreak']}
 */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    
/**
 * @type{BaseVisitor['visitContinue']}
 */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    
/**
 * @type{BaseVisitor['visitReturn']}
 */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    
/**
 * @type{BaseVisitor['visitLlamada']}
 */
    visitLlamada(node) {
        throw new Error('Metodo visitLlamada no implementado');
    }

}