import {InterpreteVisitor} from './src/Controller/InterpreteVisitor.js'
import {parse} from './src/Peggy/analizador.js'
import {ErrorsArr} from './src/Tables/Errors.js'
let errorTable, symbolTable, OakdEditor, consoleResult, dotStringCst = "";
import {SymbolClass} from './src/Tables/Tokens.js'
import {ErrorClass,getErrorsTH} from './src/Tables/Errors.js'
import {reservedWords} from './src/Enums/reservedWords.js'
let sybmolsToken = []; 
/*Scrips Code Mirror */
$(document).ready(function () {
    OakdEditor = editor('editor');
    consoleResult = editor('console', 'text/x-java', true, true, false, true);
});

function editor(id, language, lineNumbers = true, readOnly = false, styleActiveLine = true,  lineWrapping = true) {
    return CodeMirror.fromTextArea(document.getElementById(id), {
        lineNumbers: true,
        readOnly: readOnly,
        styleActivateLine: true,
        matchBrackets: true,
        theme: "midnight",
        scrollbarStyle: "null",
        lineWrapping: lineWrapping,
        mode: "text/x-rustsrc"
    });
}

/**
 * Tabla de Errores 
 */
function getErrors() {
    let errorsTable = getErrorsTH()
    console.log('liErrors getErrors')
    console.log(errorTable)
    //add to errors-report
    let reportedHtml = document.getElementById('errors-report')
    reportedHtml.innerHTML = ''
    reportedHtml.innerHTML = errorsTable

    console.log('Get Errors')


}
/**
 * Tabla de simbolos 
 */
function getSymbolsTable() {
    console.log('liErrors getSymbolsTable')
    let reportedHtml = document.getElementById('symb-report')
    reportedHtml.innerHTML = ''
    let codeTable = '';
    codeTable += '<thead>'
    codeTable += '<tr>'
    codeTable += '<th scope="col">#</th>'
    codeTable += '<th scope="col">Name</th>'
    codeTable += '<th scope="col">Type</th>'
    codeTable += '<th scope="col">TypeDte</th>'
    codeTable += '<th scope="col">Env</th>'
    codeTable += '<th scope="col">Line</th>'
    codeTable += '<th scope="col">Column</th>'
    codeTable += '</tr>'
    codeTable += '</thead>'
    codeTable += '<tbody>'
    sybmolsToken.forEach((a, index) => {
        codeTable += '<tr>'
        codeTable += `<th scope="row">${index}</th>`
        codeTable += `<td>${a.name}</td>`
        if (reservedWords.includes(a.type)) {
            codeTable += `<td>${a.type}</td>`
        }else{ 
            codeTable += `<td>${a.type}</td>`
        }
        // codeTable += `<td>struct</td>`
        codeTable += `<td>${a.typeDte}</td>`            
        codeTable += `<td>${a.env}</td>`
        codeTable += `<td>${a.line}</td>`
        codeTable += `<td>${a.column}</td>`
        codeTable += '</tr>'
    })
    codeTable += '</tbody>'
    reportedHtml.innerHTML = codeTable
}

/**
 * Tabla de Tokens 
 */
function getTokens() {



}
/**
 * CST
 * la Funcion recibe debe recibir un sring  con dot para 
 * crear el cst
 */
function graphCST(DOTstring) {

}


/** Abrir Archivo */
const openFile = async (editor) => {
    console.log('click en open file ')
    let fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.addEventListener('change', function (event) {
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.readAsText(file, 'utf-8')
        console.log(reader)
        try {
            reader.onload = function (e) {
                var contenido = e.target.result;
                editor.setValue(contenido);
            }
        } catch (error) {
            editor.setValue('error en la carga del archivo intente de nuevo ')
        }

    });
    fileInput.click();
}

/**Guardar achivo .s  */
const saveFile = async (editor) => {
    const text = OakdEditor.getValue();
    var archivoBlob = new Blob([text], { type: 'text/plain' });
    // Crear un enlace para descargar el archivo
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = window.URL.createObjectURL(archivoBlob);

    // Solicitar al usuario que ingrese un nombre de archivo
    var nombreArchivo = prompt("Por favor, ingresa el nombre del archivo:", "nombreArchivo");
    nombreArchivo += ".oak"
    if (nombreArchivo) {
        enlaceDescarga.download = nombreArchivo;

        // Ocultar el enlace
        enlaceDescarga.style.display = "none";

        // Agregar el enlace al cuerpo del documento y hacer clic en él
        document.body.appendChild(enlaceDescarga);
        enlaceDescarga.click();

        // Eliminar el enlace del cuerpo del documento
        document.body.removeChild(enlaceDescarga);
    }
}

/*limpiar consola */
const cleanEditor = (editor) => {
    editor.setValue("");
    consoleResult.setValue('')
}


/* Analizador*/

const analysis = async () => {
    const text = OakdEditor.getValue().toLowerCase();
    try {
        console.log('*******Code*******')
        console.log(text)
        
        const result = parse(text);
        const Interpete = new InterpreteVisitor();
        console.log('*******Result*******')
        console.log({result})
        result.forEach(re => re.accept(Interpete))
        console.log('*******Interpete*******')
        console.log(Interpete.outPut)
        consoleResult.setValue(Interpete.outPut)
        console.log('Enviroment final ')
        console.log(Interpete.environment)

        //forEach Variable
        const symbols = Interpete.environment.variables;
        let contSymbols = 0;
        //clean 
        sybmolsToken = []
        for (let key in symbols) {
            if (symbols.hasOwnProperty(key)) {
                const valueKey = symbols[key]
                let line = '';
                let column = '';
                if (valueKey.location) {
                    line = valueKey.location.start.line
                    column = valueKey.location.start.column
                }
                if(valueKey.type !== 'function'){ 
                    let type = 'variable';
                    if (reservedWords.includes(valueKey.type)) {
                        type = 'variable'
                    }else{ 
                        type = 'struct'
                    }
                    const symbol = new SymbolClass(key, type, valueKey.type, 'global', line, column)
                    sybmolsToken.push(symbol)
                }else{ 
                    if (valueKey.location) {
                        
                    }
                    const symbol = new SymbolClass(key, 'function', valueKey.type, 'global', line, column)
                    sybmolsToken.push(symbol)
                }                
            }
            contSymbols++;
        }
        //forEach Function

        //create table html 


    } catch (error) {
        let outputError = ''; 
        console.log('*******Error*******')
        console.log(JSON.stringify(error,null,2))    
        outputError += `Error: ${error.message}`
        console.log(`Error: ${error.expected}`)
        if (error.found){ 
            outputError += `Se encontro: ${error.found} \n`
            console.log(`Se encontro: ${error.found}`)
        }
        if (error.location && error.location.start) {
            const { line, column } = error.location.start;
            outputError += `Error en la linea ${line} y columna ${column}.\n`
            console.log(`Error en Linea: ${line}, Columna: ${column}`);
        } else {
            console.log('No se encontraron detalles de ubicación en el error.');
        }
        //add to console
        consoleResult.setValue(outputError)
        console.log(error)
    }
}

const btnClean = document.getElementById('clearButton'),
    btnOpen = document.getElementById('btn__open'),
    btnSave = document.getElementById('btn__save'),
    btnAnalysis = document.getElementById('btn__analysis'),
    btnT = document.getElementById('btn__t'),
    liErrors = document.getElementById('ErrorTables'),
    liSymbols = document.getElementById('SymbolTables')
    

   // ErrorTables


btnOpen.addEventListener('click', () => openFile(OakdEditor));
btnClean.addEventListener('click', () => cleanEditor(OakdEditor));
btnAnalysis.addEventListener('click', () => analysis());
btnSave.addEventListener('click', () => saveFile());
liErrors.addEventListener('click', () => getErrors());
liSymbols.addEventListener('click', () => getSymbolsTable());




