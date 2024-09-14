
//table to handle errors No, Description, Line, Column Typ

export class SymbolClass { 
    constructor(name, type,typeDte,env, line, column) {
        this.name = name;
        this.type = type;
        this.typeDte = typeDte;
        this.env = env;
        this.line = line;
        this.column = column;

    } 
}