
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
      'sout': nodos.Sout,      
      'expresionStmt': nodos.ExpresionStmt,
      'asignacion': nodos.Asignacion,
      'bloque': nodos.Bloque,
      'if': nodos.If,
      'while': nodos.While,
      'for': nodos.For,      
      'switch': nodos.Switch,
      'break': nodos.Break,
      'continue': nodos.Continue,
      'return': nodos.Return,
      'llamada': nodos.Llamada,
      'DclFunc':nodos.DclFunc,
      'ternario':nodos.tern, 
      'DclStruct':nodos.DclStruct, 
    
    }

    const nodo = new tipos[tipoNodo](props)
    nodo.location = location()
    return nodo
  }
}

programa = _ dcl:Declaracion* _ { return dcl }
Declaracion =  dcl:DclStruct _ { return dcl }
            /  dcl:VarDcl _ { return dcl }
            / dcl:DclFunc  _ { return dcl}
            / stmt:Stmt _ { return stmt }

//VarDcl = tipo:TypesValues _ id:Identificador _ "=" _ exp:Expresion _ ";" { return crearNodo('declaracionVariable', { id:id, exp:exp,typeD:tipo }) }
VarDcl = tipo:TypesValues _ id:Identificador _ asigna:("=" _ exp:Expresion{return exp})? _";" { return crearNodo('declaracionVariable', { id:id, exp:asigna,typeD:tipo }) }

DclFunc = tipo:TypesValues _  id:Identificador "(" _ params:Parametros? _ ")" _ bloque:Bloque { 
  console.log('DclFunc')
  return crearNodo('DclFunc',{ type:tipo,id,params:params || [],bloque})
}
DclStruct = "struct" _ id:Identificador _ "{" _ bodyC:DcslsStruct* _ "}"{ 
  console.log('DeclClass : ', id , ' body: ', bodyC)
  return crearNodo('DclStruct',{ id,properties:bodyC })
}

DcslsStruct = dcl:VarDcl _ {return dcl}
          /dcl:DclFunc _ {return dcl}

//Parametros = id:Identificador _ params:("," ids:Identificador{return ids})* { return [id, ...params] }
Parametros = tipo:TypesValues _ id:Identificador _ params:(","_ tipo1:TypesValues _ ids:Identificador{ 
      return { id:ids,typeD:tipo1 }
      })* {
   let abc = { id:id,typeD:tipo };
   return [abc, ...params] 
   }


TypesValues = "int" { return "int"}
          /"float"{  return "float"}
          /"string" {return "string"}
          /"char" {  return "char"}
          /"bool"{ return "bool"}
          /"var" {return "var"}
          /"void"{ return "void"}
          /id:Identificador{return id}



Stmt = "print(" _ exp:Expresion _ ")" _ ";" { return crearNodo('print', { exp }) }
    /"system.out.println(" _ exp:PrintComa _ ")" _ ";" { return crearNodo('sout', { exp }) }
    /"switch" _ "(" _ exp:Expresion _ ")" _ "{" _ cases:MultipleCases _ smtDef:(_ defaultE:DefaultExp{return defaultE}  ) ? _ "}" {
      console.log('Switch ', exp,cases);
      return crearNodo('switch',{exp,cases,defaultS:smtDef})}
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
    / "return" _ exp:Expresion? _ ";" {return crearNodo('return',{ value:exp } ) }
    / exp:Expresion _ ";" { return crearNodo('expresionStmt', { exp }) }

FortBegining = dcl:VarDcl {return dcl}
            / exp:Expresion _ ";" {return exp}
            /";" {return null }

Bloque = "{" _ dcls:Declaracion* _ "}" { return crearNodo('bloque', { dcls }) }

MultipleCases  = "case" _ exp:Expresion _":" _ stm:Declaracion* _ cases:(_ "case" _ exp1:Expresion _ ":" _ stm1:Declaracion* 
  { return {exp:exp1,stmt:stm1} })* _  { return [ {exp,stmt:stm}, ...cases] }
DefaultExp = "default" _ ":" _  stmt:Declaracion*{ 
  return stmt
}


Identificador = !ReseveredWords [a-zA-Z][a-zA-Z0-9]* { return text() }

Expresion = Asignacion



PrintComa = exp:Expresion _ params:("," _ exp1:Expresion 
  { return exp1 })* { return [exp, ...params] }

Asignacion = id:Identificador _ tipoA:asignTypes _ asgn:Asignacion { return crearNodo('asignacion', { id, asgn,op:tipoA }) }
          /Ternario
          / Logical

asignTypes = ("="/"+="/"-="/"*="/"/=") {return text()}

Ternario = cond:Logical _ "?" _ stmtTrue:Expresion _ ":" _ stmtFalse:Expresion _  { 
 // console.log('Ternario', cond, stmtTrue, stmtFalse);
  return crearNodo('ternario', { cond, stmtTrue, stmtFalse }) 
}

Logical = izq:Equality expansion:( 
  _ op:("&&" / "||") _ der:Equality { return { tipo: op, der } }
)* { 
  return expansion.reduce(
    (operacionAnterior, operacionActual) => {
      const { tipo, der } = operacionActual
      return crearNodo('logica', { op:tipo, izq: operacionAnterior, der })
    },
    izq
  )
}

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
  _ op:("*" / "/" / "%") _ der:Unaria { return { tipo: op, der } }
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
        /"!" _ num:Unaria { return crearNodo('unaria', { op: '!', exp: num }) }
       / Llamada

Unarytypes = "-" { 
  return "-" 
}
  / "!" { 
    return "!" 
  }



Llamada = callee:Numero _ params:("(" args:Argumentos? ")" { return args })* {
  return params.reduce(
    (callee, args) => {
      return crearNodo('llamada', { callee, args: args || [] })
    },
    callee
  )
}

Argumentos = arg:Expresion _ args:("," _ exp:Expresion { 
  return exp })* { return [arg, ...args] }

Numero = [0-9]+( "." [0-9]+ )+ {return crearNodo('primitive', { typeD:'float', value:Number(text(),0)  }) }
  / [0-9]+ {return crearNodo('primitive', { typeD:'int', value:Number(text(),0)  }) }
  / '"' [^\"]* '"' {return crearNodo('primitive', { typeD:'string', value:text().slice(1,-1) }) }
  / "'" [^\']* "'" {return crearNodo('primitive', { typeD:'char', value:text().slice(1,-1) }) }
  / "true"   {return crearNodo('primitive', { typeD:'bool', value:true  }) }
  / "false" {return crearNodo('primitive', { typeD:'bool', value:false  }) }
  / "null" {return crearNodo('primitive', { typeD:'null', value:null  }) }
  / "(" _ exp:Expresion _ ")" { return crearNodo('agrupacion', { exp }) }
  / id:Identificador {  return crearNodo('referenciaVariable', { id }) }

_ = ([ \t\n\r] / Comments)*

Comments = "//" (![\n] .)*
            / "/*" (!("*/") .)* "*/"

ReseveredWords = ("int"
  /"if"
  /"else"
  /"while"
  /"for"
  /"switch"
  /"case"
  /"default"
  /"break"
  /"continue"
  /"return"
  /"print"
  /"system.out.println"
  /"struct"
  /"void"
  /"char"
  /"float"
  /"string"

)      { 
  return text() 
}

