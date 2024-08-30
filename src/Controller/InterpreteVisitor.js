import {BaseVisitor} from '../abstract/visitor.js'

export class InterpreteVisitor extends BaseVisitor {
   /**
    *  {BaseVisitor['visitExpresion']}
    */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    
/**
 * @type{BaseVisitor['visitOperacionBinaria']}
 */
    visitOperacionBinaria(node) {
        const left = node.izq.accept(this)
        throw new Error('Metodo visitOperacionBinaria no implementado');
    }
    
/**
 * @type{BaseVisitor['visitOperacionUnaria']}
 */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
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
        throw new Error('Metodo visitNumero no implementado');
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
        throw new Error('Metodo visitPrint no implementado');
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