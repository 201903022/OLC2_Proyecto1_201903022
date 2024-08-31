import {BaseVisitor} from '../abstract/visitor.js'
import {Environment} from '../Environment/environment.js'

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
        switch (node.typeD) {
            case 'int':
                console.log('int')
                node.value = parseInt(node.value); 
                return node;    
            case 'float':
                console.log('float')
                node.value = parseFloat(node.value);
                return node
            case 'string':
                let cadena = node.value;
                cadena = cadena.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\/g, '\\');
                console.log('Cadenaaaaa ',cadena)
                node.value = cadena;
                console.log('string')
                return node;                        
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
        console.log('Node ', node )
        console.log('node.der: ',node.izq)
        console.log('node.izq: ',node.der)
        console.log('node.der.value: ', node.der.value)
        console.log('node.izq.value: ', node.izq.value)
        //tipo
        console.log('node.der.typed: ', node.der.typeD);
        console.log('node.izq.typed: ', node.izq.typeD);
        const left = node.izq.accept(this); 
        const right = node.der.accept(this); 
        console.log('left : ', left)
        console.log('right : ', right)

        switch (node.op) {
            case '+':
                console.log('left.value: ', left.value)
                console.log('right.value: ', right.value)
                console.log('nodeeeee ',node)
                let suma = left.value + right.value; 
                const nodecito = {tipo:'int', value:suma,location:node.location}
                console.log('nodecito: ', nodecito)
                return nodecito;    
            case '-':
                return left - right;
            case '*':
                return left * right;
            case '/':
                return left / right;                        
            default:
                throw new Error(`Operator is no supported ${node.op}`);
        }
    }
    
/**
 * @type{BaseVisitor['visitOperacionUnaria']}
 */
    visitOperacionUnaria(node) {
        console.log('Operacion Unaria')
        const exp = node.exp.accept(this); 
        switch (node.op) {
            case '-':
                return -exp;    
            default:
                throw new Error(`Operator is no supported ${node.op}`);
        }

    }
    
/**
 * @type{BaseVisitor['visitAgrupacion']}
 */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
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
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    
/**
 * @type{BaseVisitor['visitReferenciaVariable']}
 */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    
/**
 * @type{BaseVisitor['visitPrint']}
 */
    visitPrint(node) { 
        console.log('**********PRINT***********')
        console.log('Visit print')
        console.log('Valor: aaaaaaaa', node) 
        console.log('value node.exp: ',node.exp.value)
        console.log('Valor: ', node.exp.accept(this))

        const value = node.exp.accept(this); 
        console.log('Valor Valueee: ', value)
        this.outPut += value.value+ '\n';

    }
    
/**
 * @type{BaseVisitor['visitExpresionStmt']}
 */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    
/**
 * @type{BaseVisitor['visitAsignacion']}
 */
    visitAsignacion(node) {
        console.log("asignacion ")
        const varName = node.id; 
        const value = node.exp.accept(this);
        this.environment.assignVariable(varName,value); 
        throw new Error('Metodo visitAsignacion no implementado');
    }
    
/**
 * @type{BaseVisitor['visitBloque']}
 */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
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