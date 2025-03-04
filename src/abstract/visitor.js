
/**

 * @typedef {import('./nodos').Expresion} Expresion


 * @typedef {import('./nodos').Primitive} Primitive


 * @typedef {import('./nodos').OperacionBinaria} OperacionBinaria


 * @typedef {import('./nodos').OpLogica} OpLogica


 * @typedef {import('./nodos').OperacionUnaria} OperacionUnaria


 * @typedef {import('./nodos').Agrupacion} Agrupacion


 * @typedef {import('./nodos').Numero} Numero


 * @typedef {import('./nodos').DeclaracionVariable} DeclaracionVariable


 * @typedef {import('./nodos').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('./nodos').Print} Print


 * @typedef {import('./nodos').Sout} Sout


 * @typedef {import('./nodos').ExpresionStmt} ExpresionStmt


 * @typedef {import('./nodos').Asignacion} Asignacion


 * @typedef {import('./nodos').Bloque} Bloque


 * @typedef {import('./nodos').If} If


 * @typedef {import('./nodos').While} While


 * @typedef {import('./nodos').Break} Break


 * @typedef {import('./nodos').Continue} Continue


 * @typedef {import('./nodos').Return} Return


 * @typedef {import('./nodos').Switch} Switch


 * @typedef {import('./nodos').For} For


 * @typedef {import('./nodos').Llamada} Llamada


 * @typedef {import('./nodos').DclFunc} DclFunc


 * @typedef {import('./nodos').tern} tern


 * @typedef {import('./nodos').DclStruct} DclStruct


 * @typedef {import('./nodos').instClass} instClass


 * @typedef {import('./nodos').getStruct} getStruct


 * @typedef {import('./nodos').setStruct} setStruct


 * @typedef {import('./nodos').entries} entries

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {Primitive} node
     * @returns {any}
     */
    visitPrimitive(node) {
        throw new Error('Metodo visitPrimitive no implementado');
    }
    

    /**
     * @param {OperacionBinaria} node
     * @returns {any}
     */
    visitOperacionBinaria(node) {
        throw new Error('Metodo visitOperacionBinaria no implementado');
    }
    

    /**
     * @param {OpLogica} node
     * @returns {any}
     */
    visitOpLogica(node) {
        throw new Error('Metodo visitOpLogica no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {DeclaracionVariable} node
     * @returns {any}
     */
    visitDeclaracionVariable(node) {
        throw new Error('Metodo visitDeclaracionVariable no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {Sout} node
     * @returns {any}
     */
    visitSout(node) {
        throw new Error('Metodo visitSout no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    

    /**
     * @param {Break} node
     * @returns {any}
     */
    visitBreak(node) {
        throw new Error('Metodo visitBreak no implementado');
    }
    

    /**
     * @param {Continue} node
     * @returns {any}
     */
    visitContinue(node) {
        throw new Error('Metodo visitContinue no implementado');
    }
    

    /**
     * @param {Return} node
     * @returns {any}
     */
    visitReturn(node) {
        throw new Error('Metodo visitReturn no implementado');
    }
    

    /**
     * @param {Switch} node
     * @returns {any}
     */
    visitSwitch(node) {
        throw new Error('Metodo visitSwitch no implementado');
    }
    

    /**
     * @param {For} node
     * @returns {any}
     */
    visitFor(node) {
        throw new Error('Metodo visitFor no implementado');
    }
    

    /**
     * @param {Llamada} node
     * @returns {any}
     */
    visitLlamada(node) {
        throw new Error('Metodo visitLlamada no implementado');
    }
    

    /**
     * @param {DclFunc} node
     * @returns {any}
     */
    visitDclFunc(node) {
        throw new Error('Metodo visitDclFunc no implementado');
    }
    

    /**
     * @param {tern} node
     * @returns {any}
     */
    visittern(node) {
        throw new Error('Metodo visittern no implementado');
    }
    

    /**
     * @param {DclStruct} node
     * @returns {any}
     */
    visitDclStruct(node) {
        throw new Error('Metodo visitDclStruct no implementado');
    }
    

    /**
     * @param {instClass} node
     * @returns {any}
     */
    visitinstClass(node) {
        throw new Error('Metodo visitinstClass no implementado');
    }
    

    /**
     * @param {getStruct} node
     * @returns {any}
     */
    visitgetStruct(node) {
        throw new Error('Metodo visitgetStruct no implementado');
    }
    

    /**
     * @param {setStruct} node
     * @returns {any}
     */
    visitsetStruct(node) {
        throw new Error('Metodo visitsetStruct no implementado');
    }
    

    /**
     * @param {entries} node
     * @returns {any}
     */
    visitentries(node) {
        throw new Error('Metodo visitentries no implementado');
    }
    
}
