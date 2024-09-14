
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

export function getErrorsTH() {
    let codeTable = '';
    if (ErrorsArr.length > 0) {
        codeTable += '<thead>'
        codeTable += '<tr>'
        codeTable += '<th scope="col">#</th>'
        codeTable += '<th scope="col">Description</th>'
        codeTable += '<th scope="col">Line</th>'
        codeTable += '<th scope="col">Column</th>'
        codeTable += '<th scope="col">Type</th>'
        codeTable += '</tr>'
        codeTable += '</thead>'
        codeTable += '<tbody>'
        ErrorsArr.forEach((a, index) => {
            codeTable += '<tr>'
            codeTable += `<th scope="row">${index}</th>`
            codeTable += `<td>${a.description}</td>`
            codeTable += `<td>${a.line}</td>`
            codeTable += `<td>${a.column}</td>`
            codeTable += `<td>${a.type}</td>`
            codeTable += '</tr>'
        })
        codeTable += '</tbody>'
        console.log('*******Errors*******')
        console.log(codeTable)
        
    }

    return codeTable
    
}