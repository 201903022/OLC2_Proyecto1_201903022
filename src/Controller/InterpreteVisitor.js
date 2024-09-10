import {BaseVisitor} from '../abstract/visitor.js'
import {Environment} from '../Environment/environment.js'
import {Dato} from '../Clases/Dato.js'
import {BreaKException,ContinueException,ReturnException} from '../Clases/Transeferer.js'
import nodos from '../abstract/nodos.js';
import {embebidas} from '../Functions/Embebidas.js'
import {Invocable} from '../Functions/Invocable.js'
import {ErrorClass,ErrorsArr,ErrorCounts} from '../Tables/Errors.js'
import { ForeignFunction } from '../Functions/Foreing.js';
export class InterpreteVisitor extends BaseVisitor {
    
    constructor() {
        super();
        this.environment = new Environment(undefined);
        this.outPut = '';
        //clean errosArr
        ErrorsArr.splice(0,ErrorsArr.length)
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
        switch (node.typeD) {
            case 'int':
                node.value = Number(node.value); 
                return new Dato(node.typeD,node.value,node.location);    
            case 'float':
                node.value = Number(node.value);
                return new Dato(node.typeD,node.value,node.location);
            case 'string':
                let cadena = node.value;
                cadena = cadena.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\/g, '\\');
                node.value = cadena;
                return new Dato(node.typeD,node.value,node.location)
            case 'bool': 
                console.log('Boool')
                console.log(node.value)
                return new Dato(node.typeD,node.value,node.location)
            case 'char': 
                node.value = node.value.replace(/'/g, '');
                return new Dato(node.typeD,node.value,node.location)       
            case 'null':
                return new Dato(node.typeD,null,node.location)               
            default:
                    const errToSave = new ErrorClass(ErrorCounts,`Type primitiva is not supported ${tyepPrimitive}`,node.location.start.line,node.location.start.column,"semantico")
                    ErrorsArr.push(errToSave)
                    return new Dato('null',null,node.location)              
        }
        
    }
    
/**
 * @type{BaseVisitor['visitOperacionBinaria']}
 */
    visitOperacionBinaria(node) {
        console.log('**************************')
        console.log('Operacion Binaria')
        console.log(node)
        console.log('**************************')
        
        const left = node.izq.accept(this); 
        const right = node.der.accept(this); 
        if (left.type ==='null' || right.type === 'null') {
            const errStr = `Cant operand with value null `
            const line = node.location.start.line
            const column = node.location.start.column;
            const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
            ErrorsArr.push(errToSave) ;
            return new Dato('null',null,node.location)     
        }
        if (left.value === null || right.value === null) {
            const errStr = `Cant operand with value null `
            const line = node.location.start.line
            const column = node.location.start.column;
            const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
            ErrorsArr.push(errToSave) ;            
            return new Dato('null',null,node.location);                    
        }
        switch (node.op) {
            case '+':
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
                    const errStr = `Cant substract with value type string `
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;            
                    return new Dato('null',null,node.location);    
                } else if(left.type === 'int' && right.type === 'int') {
                    let typeD = 'int';
                    let suma = left.value - right.value; 
                    suma = parseInt(suma);
                    return (new Dato(typeD,suma,node.location));
                    
                }else if (left.type === 'int' && right.type === 'float') {
                    let typeD = 'float';
                    let suma = left.value - right.value; 
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
                    const errStr = `Cant operand with type ${left.type} - ${right.type}`
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;            
                    return new Dato('null',null,node.location);    
                }                
            case '*':
                if (left.type === 'string' || right.type === 'string') {
                    const errStr = `Cant * with value string `
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;            
                    return new Dato('null',null,node.location);    
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
                    const errStr = `Cant operand with type ${left.type} * ${right.type}`
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;            
                    return new Dato('null',null,node.location);    
                }                                                                
            case '/':
                if (left.type === 'string' || right.type === 'string') {
                    const errStr = `Cant operand with type ${left.type} / ${right.type}`
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;            
                    return new Dato('null',null,node.location);    
                }  
                if (right.value === 0) {
                    const errToSave = new ErrorClass(ErrorCounts,"0 cant be /",node.location.start.line,node.location.start.line)
                    ErrorsArr.push(errToSave)
                    return new Dato('null',null,node.location);                        
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
                    const errStr = `Cant operand with type ${left.type} / ${right.type}`
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;            
                    return new Dato('null',null,node.location);                    }
            case '%':
                //just type int
                if(left.type === 'int' && right.type === 'int') {
                    if (right.value === 0) {
                        console.log('Error ')//add to errorsarr
                        const errStr = `Cant operand with 0 in "%" `
                        const line = node.location.start.line
                        const column = node.location.start.column;
                        const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                        ErrorsArr.push(errToSave) ;
                        return new Dato('null',null,node.location)                      
                    }
                    let typeD = 'int';
                    let mod =parseInt(left.value % right.value) ; 
                    return (new Dato(typeD,mod,node.location));
                }else{ 
                    const errStr = `Operand "%" only 2 "int" `
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;
                    return new Dato('null',null,node.location)                      
                }                

            default:
                const errStr = `Cant operand with ${node.op} `
                const line = node.location.start.line
                const column = node.location.start.column;
                const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                ErrorsArr.push(errToSave) ;            
                return new Dato('null',null,node.location);    
            }
    }

    /**
     * @type{BaseVisitor['visitOpLogica']} 
     */
    
    visitOpLogica(node){ 
            const left = node.izq.accept(this); 
            const right = node.der.accept(this); 
            console.log('visitOplogica')
            switch (node.op) {
                case '==':
                    if (left.value === right.value) {
                        return new Dato('bool',true,node.location)
                        
                    } else {
                        return new Dato('bool',false,node.location)                        
                    }
                case '!=':
                    if (left.value !== right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '>':
                    if (left.value > right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '<':
                    if (left.value < right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '>=':
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
                case '&&':
                    if (left.value && right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)
                case '||':
                    if (left.value || right.value) {
                        return new Dato('bool',true,node.location)
                    }
                    return new Dato('bool',false,node.location)                    

                default:
                    const errStr = `Cant operand with ${node.op}`
                    const line = node.location.start.line
                    const column = node.location.start.column;
                    const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                    ErrorsArr.push(errToSave) ;            
                    return new Dato('null',null,node.location);    
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
            case '!': 
                let b = new Dato('bool', !(exp.value), node.location)
                return b;  
            default:
                const errStr = `Cant operand with ${node.op}`
                const line = node.location.start.line
                const column = node.location.start.column;
                const errToSave = new ErrorClass(ErrorCounts,errStr,line,column,"semantico");
                ErrorsArr.push(errToSave) ;            
                return new Dato('null',null,node.location);    
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
        return node.valor;
    }
    
/**
 * @type{BaseVisitor['visitDeclaracionVariable']}
 */
    visitDeclaracionVariable(node) {
         let hasExp = false;
         let value = new Dato('null',null,node.location) 
         if (node.exp) {
             value = node.exp.accept(this);    
             hasExp = true;        
         }        
         this.environment.assignVariable(node.id,value,node.typeD,hasExp)
    }
    
/**
 * @type{BaseVisitor['visitReferenciaVariable']}
 */
    visitReferenciaVariable(node) {
        
        const varName = node.id;
        const value = this.environment.getVariable(varName,node);
        return value;
    }
    
/**
 * @type{BaseVisitor['visitPrint']}
 */
    visitPrint(node) { 
        console.log('**********PRINT***********')
       const value = node.exp.accept(this); 
       if (value.type) {
          console.log('tiene tipooo ')
          console.log(value.type)
           if (value.type === 'float') {
            let a = value.value;
                if (value.value !== null) {
                    a = value.value.toFixed(4);                    
                }
                this.outPut += a + '\n';
           }else{ 
               this.outPut += value.value+ '\n';
           }
        }else{ 
            //no se xdd
       }

    }
    
/**
 * @type{BaseVisitor['visitSout']}
*/
    visitSout(node){ 
        console.log('System.out.Println')
        node.exp.forEach(exp => {
            const value = exp.accept(this); 
            if (value.type) {
                if (value.type === 'float') {
                 let a = value.value;
                     if (value.value !== null) {
                         a = value.value.toFixed(4);                    
                     }
                     this.outPut += a ;
                }else{ 
                    this.outPut += value.value;
                }
             }else{ 
                 //no se xdd
            }
        })
        this.outPut += '\n'
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
        console.log("visitAsignacion ")
        console.log(node.op)
        switch (node.op) {
            case '=':
                const varName = node.id; 
                const value = node.asgn.accept(this);
                this.environment.setVariable(varName,value,node.location.start);                
                console.log('aaa')
                break;
            case '+=': 
                const varName2 = node.id; 
                const refVar = new nodos.ReferenciaVariable(
                    {id:node.id}

                )
                const exp2 = new nodos.OperacionBinaria( 
                    {izq:refVar,
                    op:'+',
                    der:node.asgn}
                )
                console.log('exp2')
                console.log(exp2)
                const newValue = exp2.accept(this);
                console.log('newValue')
                console.log(newValue)
                this.environment.setVariable(varName2,newValue,node.location.start);  
                break;
            case '-=': 
                const varName3 = node.id;
                const refVar3 = new nodos.ReferenciaVariable(
                    {id:node.id}
                )
                const exp3 = new nodos.OperacionBinaria( 
                    {izq:refVar3,
                    op:'-',
                    der:node.asgn}
                )
                const newValue3 = exp3.accept(this);
                this.environment.setVariable(varName3,newValue3,node.location.start);     
                break;           
            
            default:
                console.log('first')
                break;
        }

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
        console.log('visitWhile')
        const startingEnv = this.environment;
        try {
          //  let cond = node.cond.accept(this);
            while (node.cond.accept(this).value) {
                node.stmt.accept(this);
                /*
                console.log('While Cond Changing')
                console.log(cond)
                 if(cond.value){ 
                }
                // cond = node.cond.accept(this);
                console.log('While Cond Changing')
                console.log(cond)
                */
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
 * @type{BaseVisitor['visitSwitch']}
 */
 visitSwitch(node){ 
    console.log('Visit Switch '); 
    const startingEnv = this.environment;
    let isMatch = false;
    const value = node.exp.accept(this);
    console.log('Value in switch', value.value)   
    try {
        console.log('aaaa')
        for (const caseNode of node.cases) {
            const caseExp = caseNode.exp.accept(this)
            if (caseExp.value === value.value) {
                isMatch = true;
            }
            if (isMatch) {
                console.log('Is match')
                caseNode.stmt.forEach(
                    stmt => stmt.accept(this)
                )
            }            
        }
        if (!isMatch && node.defaultS) {
            console.log('Default')
            defaultStmt = node.defaultS.forEach(
                stmt => stmt.accept(this)
            );
        }
    } catch (error) {
        this.environment = startingEnv;
        if (error instanceof BreaKException) {
            console.log('BreakExpetion')
            return;                            
        }
        if (error instanceof ContinueException) {
            return this.visitSwitch(node);                            
        }                
        
    }

 }

/**
 * @type{BaseVisitor['visitBreak']}
 */
    visitBreak(node) {
        console.log('visitBreak')
        throw new BreaKException();        
    }
    
/**
 * @type{BaseVisitor['visitContinue']}
 */
    visitContinue(node) {        
        console.log('visitContinue')
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
        console.log('Node Visit Return: ',node)
        if(node.value){ 
            
            value = node.value.accept(this); 
            console.log('Value in Visit Return', value)
        }
        console.log('returning;')
        throw new ReturnException(value);        
    }
/**
 * @type{BaseVisitor['visitLlamada']}
 */
    visitLlamada(node){ 
        console.log('')
        const function1 = node.callee.accept(this).value;
        console.log('Function1 ', function1)
        console.log('node.args', node.args)
        const args = node.args.map(arg => arg.accept(this));
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
 
/**
 *  
 * @type{BaseVisitor['visitDclFunc']}
 *  
 */
    visitDclFunc(node){ 
        console.log('Visit DclFunc')
        console.log(node)
        const closure = this.environment;
        if (node.type ==='void') {
            console.log('no returna nada')
        }
        const func = new ForeignFunction(node,closure);
        this.environment.assignVariable(node.id,func,'function')
    }   
   /**
 *  
 * @type{BaseVisitor['visittern']}
 *  
 */ 
  
   visittern(node){ 
        console.log('Visit Tern')
        console.log(node)
        const cond = node.cond.accept(this); 
        if (cond.value) {
            return node.stmtTrue.accept(this);
        }else{ 
            return node.stmtFalse.accept(this);
        }
    }
   /**
 *  
 * @type{BaseVisitor['visitDclStruct']}
 *  
 */ 
  
    visitDclStruct(node){ 
        console.log('Visit DclStruct')
        console.log(node)
        console.log('\t Struct ID: ', node.id)
        console.log('\t Struct dcls: ', node.properties)
        const propertiesClass = {};
        const methodsClass = {};
        node.properties.forEach(property => {
            console.log('\tProperty : ',property)
            if (property instanceof nodos.DeclaracionVariable) {
                console.log('\t -> Property is a variable');
                const value = new Dato(property.typeD,property.exp,property.location);
                propertiesClass[property.id] = value;
                console.log('\t --> Value ',value)

            } else if (property instanceof nodos.DclFunc) {
                console.log('\t -> Property is a function')
                const closure = this.environment;
                const func = new ForeignFunction(property,closure);
                methodsClass[property.id] = func;
                console.log('\t --> Value ',func)

                
            }
           
        })

    }


}