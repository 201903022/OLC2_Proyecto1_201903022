
/**
 * @typedef {Object} Location
 * @property {Object} start
 * @property {number} start.offset
 * @property {number} start.line
 * @property {number} start.column
 * @property {Object} end
 * @property {number} end.offset
 * @property {number} end.line
 * @property {number} end.column
*/
    

/**
 * @typedef {import('./visitor').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion del nodo en el codigo fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion del nodo en el codigo fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class Primitive extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.typeD tipo de dato string,int...
 * @param {any} options.value valor del primitivo
    */
    constructor({ typeD, value }) {
        super();
        
        /**
         * tipo de dato string,int...
         * @type {string}
        */
        this.typeD = typeD;


        /**
         * valor del primitivo
         * @type {any}
        */
        this.value = value;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrimitive(this);
    }
}
    
export class OperacionBinaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionBinaria(this);
    }
}
    
export class OpLogica extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izq Expresion izquierda de la operacion
 * @param {Expresion} options.der Expresion derecha de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ izq, der, op }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izq = izq;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.der = der;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOpLogica(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion de la operacion
 * @param {string} options.op Operador de la operacion
    */
    constructor({ exp, op }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion agrupada
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Numero extends Expresion {

    /**
    * @param {Object} options
    * @param {number} options.valor Valor del numero
    */
    constructor({ valor }) {
        super();
        
        /**
         * Valor del numero
         * @type {number}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitNumero(this);
    }
}
    
export class DeclaracionVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.exp Expresion de la variable
 * @param {string} options.typeD tipo de dato string,int...
    */
    constructor({ id, exp, typeD }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la variable
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * tipo de dato string,int...
         * @type {string}
        */
        this.typeD = typeD;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVariable(this);
    }
}
    
export class ReferenciaVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a imprimir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class Sout extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.exp Expresion a imprimir
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion[]}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSout(this);
    }
}
    
export class ExpresionStmt extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
    */
    constructor({ exp }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresionStmt(this);
    }
}
    
export class Asignacion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.asgn Expresion a asignar
 * @param {string} options.op tipo de dato string,int...
    */
    constructor({ id, asgn, op }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.asgn = asgn;


        /**
         * tipo de dato string,int...
         * @type {string}
        */
        this.op = op;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacion(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.dcls Sentencias del bloque
    */
    constructor({ dcls }) {
        super();
        
        /**
         * Sentencias del bloque
         * @type {Expresion[]}
        */
        this.dcls = dcls;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del if
 * @param {Expresion} options.stmtTrue Cuerpo del if
 * @param {Expresion|undefined} options.stmtFalse Cuerpo del else
    */
    constructor({ cond, stmtTrue, stmtFalse }) {
        super();
        
        /**
         * Condicion del if
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del if
         * @type {Expresion}
        */
        this.stmtTrue = stmtTrue;


        /**
         * Cuerpo del else
         * @type {Expresion|undefined}
        */
        this.stmtFalse = stmtFalse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del while
 * @param {Expresion} options.stmt Cuerpo del while
    */
    constructor({ cond, stmt }) {
        super();
        
        /**
         * Condicion del while
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del while
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.value Value to return
    */
    constructor({ value }) {
        super();
        
        /**
         * Value to return
         * @type {Expresion}
        */
        this.value = value;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Switch extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.exp Expresion a evaluar
 * @param {Expresion[]} options.cases Casos del switch
 * @param {Expresion || undefined} options.defaultS Caso por defecto
    */
    constructor({ exp, cases, defaultS }) {
        super();
        
        /**
         * Expresion a evaluar
         * @type {Expresion}
        */
        this.exp = exp;


        /**
         * Casos del switch
         * @type {Expresion[]}
        */
        this.cases = cases;


        /**
         * Caso por defecto
         * @type {Expresion || undefined}
        */
        this.defaultS = defaultS;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.init Inicializacion del for
 * @param {Expresion} options.cond Condicion del for
 * @param {Expresion} options.inc Incremento del for
 * @param {Expresion} options.stmt Cuerpo del for
    */
    constructor({ init, cond, inc, stmt }) {
        super();
        
        /**
         * Inicializacion del for
         * @type {Expresion}
        */
        this.init = init;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.inc = inc;


        /**
         * Cuerpo del for
         * @type {Expresion}
        */
        this.stmt = stmt;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class Llamada extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.callee Expresion a llamar
 * @param {Expresion[]} options.args Argumentos de la llamada
    */
    constructor({ callee, args }) {
        super();
        
        /**
         * Expresion a llamar
         * @type {Expresion}
        */
        this.callee = callee;


        /**
         * Argumentos de la llamada
         * @type {Expresion[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLlamada(this);
    }
}
    
export class DclFunc extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.type tipo de dato string,int...
 * @param {string} options.id Identificador de la funcion
 * @param {Expresion[]} options.params Parametros de la funcion
 * @param {bloque} options.bloque Cuerpo de la funcion
    */
    constructor({ type, id, params, bloque }) {
        super();
        
        /**
         * tipo de dato string,int...
         * @type {string}
        */
        this.type = type;


        /**
         * Identificador de la funcion
         * @type {string}
        */
        this.id = id;


        /**
         * Parametros de la funcion
         * @type {Expresion[]}
        */
        this.params = params;


        /**
         * Cuerpo de la funcion
         * @type {bloque}
        */
        this.bloque = bloque;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDclFunc(this);
    }
}
    
export class tern extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.cond Condicion del ternario
 * @param {Expresion} options.stmtTrue Cuerpo del ternario
 * @param {Expresion} options.stmtFalse Cuerpo del ternario
    */
    constructor({ cond, stmtTrue, stmtFalse }) {
        super();
        
        /**
         * Condicion del ternario
         * @type {Expresion}
        */
        this.cond = cond;


        /**
         * Cuerpo del ternario
         * @type {Expresion}
        */
        this.stmtTrue = stmtTrue;


        /**
         * Cuerpo del ternario
         * @type {Expresion}
        */
        this.stmtFalse = stmtFalse;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visittern(this);
    }
}
    
export class DclStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la clase
 * @param {Expresion[]} options.properties Declaraciones de la clase
    */
    constructor({ id, properties }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Declaraciones de la clase
         * @type {Expresion[]}
        */
        this.properties = properties;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDclStruct(this);
    }
}
    
export class instClass extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la clase
 * @param {Expresion[]} options.args Argumentos de la clase
    */
    constructor({ id, args }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Argumentos de la clase
         * @type {Expresion[]}
        */
        this.args = args;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitinstClass(this);
    }
}
    
export class getStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la clase
 * @param {string} options.propertie Propiedad de la clase
    */
    constructor({ id, propertie }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Propiedad de la clase
         * @type {string}
        */
        this.propertie = propertie;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitgetStruct(this);
    }
}
    
export class setStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la clase
 * @param {string} options.propertie Propiedad de la clase
 * @param {Expresion} options.value Valor a asignar
    */
    constructor({ id, propertie, value }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Propiedad de la clase
         * @type {string}
        */
        this.propertie = propertie;


        /**
         * Valor a asignar
         * @type {Expresion}
        */
        this.value = value;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitsetStruct(this);
    }
}
    
export class entries extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.value Identificador de la clase
    */
    constructor({ value }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {Expresion}
        */
        this.value = value;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitentries(this);
    }
}
    
export default { Expresion, Primitive, OperacionBinaria, OpLogica, OperacionUnaria, Agrupacion, Numero, DeclaracionVariable, ReferenciaVariable, Print, Sout, ExpresionStmt, Asignacion, Bloque, If, While, Break, Continue, Return, Switch, For, Llamada, DclFunc, tern, DclStruct, instClass, getStruct, setStruct, entries }
