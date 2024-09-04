
{
  const crearNodo = (tipoNodo, props) =>{
    const tipos = {
      'numero': nodos.Numero,
      'primitive': nodos.Primitive, 
      'agrupacion': nodos.Agrupacion,
      'binaria': nodos.OperacionBinaria,
      'logica': nodos.OpLogica,
      'unaria': nodos.OperacionUnaria,
      'declaracionVariable': nodos.DeclaracionVariable,
      'referenciaVariable': nodos.ReferenciaVariable,
      'print': nodos.Print,
      'expresionStmt': nodos.ExpresionStmt,
      'asignacion': nodos.Asignacion,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'while': nodos.While,
      'for': nodos.For,      
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'llamada': nodos.Llamada
    
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ dcl:Declaracion* _ { return dcl }

Declaracion = dcl:VarDcl _ { return dcl }
            / stmt:Stmt _ { return stmt }

VarDcl = tipo:TypesValues _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { id:id, exp:exp,typeD:tipo }) }

TypesValues = "int" { return "int"}
          /"float"{  return "float"}
          /"string" {return "string"}
          /"char" {  return "char"}
          /"bool"{ return "bool"}
          /"var" {return "var"}


Stmt = "print(" _ exp:Expresion _ ")" _ ";" { return crearNodo('print', { exp }) }
    / bl:Bloque {return bl}
    / "if" _ "(" _ cond:Expresion _ ")" _ stmtTrue:Stmt 
      stmtFalse:(
        _ "else" _ stmtFalse:Stmt { return stmtFalse } 
      )? { return crearNodo('if', { cond, stmtTrue, stmtFalse }) }
    / "while" _ "(" _ cond:Expresion _ ")" _ stmt:Stmt { return crearNodo('while', { cond, stmt }) }
    /"for" _ "(" _ init:FortBegining _  cond:Expresion _";" _ inc:Expresion ")" _ stmt:Stmt
     {
       return crearNodo('for', { init, cond, inc, stmt }) 
    }    
    / "break" _ ";" {  console.log('breakPaa');
    return crearNodo('break') }
    / "continue" _ ";" { return crearNodo('continue') }
    / "return" _ exp:Expresion? _ ";" {return crearNodo('return',{ exp } ) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }

FortBegining = dcl:VarDcl {return dcl}
            / exp:Expresion _ ";" {return exp}
            /";" {return null }


Bloque = "{" _ dcls:Declaracion* _ "}" { return crearNodo('bloque', { dcls }) }


Identificador = [a-zA-Z][a-zA-Z0-9]* { return text() }

Expresion = Asignacion

Asignacion = id:Identificador _ "=" _ asgn:Asignacion { return crearNodo('asignacion', { id, asgn }) }
          / Equality

// asignTypes = "+=" "-=" "="
//logical: "&&" "||"
Equality = izq:Relational expansion:( 
  _ op:("==" / "!=") _ der:Relational { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('logica', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}
//relational: "<" "<=" ">" ">="
Relational = izq:Suma expansion:( 
  _ op:(">=" / "<=" / ">" / "<") _ der:Suma { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('logica', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )}

Suma = izq:Multiplicacion expansion:(
  _ op:("+" / "-") _ der:Multiplicacion { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

Multiplicacion = izq:Unaria expansion:(
  _ op:("*" / "/") _ der:Unaria { return { tipo: op, der } }
)* {
    return expansion.reduce(
      (operacionAnterior, operacionActual) => {
        const { tipo, der } = operacionActual
        return crearNodo('binaria', { op:tipo, izq: operacionAnterior, der })
      },
      izq
    )
}

Unaria = "-" _ num:Unaria { return crearNodo('unaria', { op: '-', exp: num }) }
/ Llamada


Llamada = callee:Numero _ params:("(" args:Argumentos? ")" { return args })* {
  console.log('LLAMADAAAAAAAAAAPEGGGGYYY', args)
  return params.reduce(
    (callee, args) => {
      return crearNodo('llamada', { callee, args: args || [] })
    },
    callee
  )
}

Argumentos = arg:Expresion _ args:("," _ exp:Expresion { 
  console.log('expPegggy: ',exp)
  return exp })* { return [arg, ...args] }

// { return{ tipo: "numero", valor: parseFloat(text(), 10) } }
Numero = [0-9]+( "." [0-9]+ )+ {return crearNodo('primitive', { typeD:'float', value:Number(text(),0)  }) }
  / [0-9]+ {return crearNodo('primitive', { typeD:'int', value:Number(text(),0)  }) }
  / '"' [^\"]* '"' {return crearNodo('primitive', { typeD:'string', value:text().slice(1,-1) }) }
  //  "'" [^\"]* "'" {return crearNodo('primitive', { typeD:'char', value:text().slice(1,-1) }) }
  / "true"   {return crearNodo('primitive', { typeD:'bool', value:'true'  }) }
  / "false" {return crearNodo('primitive', { typeD:'bool', value:'false'  }) }
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identificador { return crearNodo('referenciaVariable', { id }) }

_ = ([ \t\n\r] / Comments)*

Comments = "//" (![\n] .)*
            / "/*" (!("*/") .)* "*/"