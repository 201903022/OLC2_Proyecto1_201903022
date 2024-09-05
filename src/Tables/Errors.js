
//table to handle errors No, Description, Line, Column Typ
//contador de errores: 
export var ErrorCounts = 1;

export class ErrorClass{ 
    constructor(no,description,line,column,type) { 
        this.no = no;
        this.description = description;
        this.line = line;
        this.column = column;
        this.type = type;
    }
}

export const ErrorsArr = [
]
