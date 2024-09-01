import {InterpreteVisitor} from './src/Controller/InterpreteVisitor.js'
import {parse} from './src/Peggy/analizador.js'
let errorTable, symbolTable, OakdEditor, consoleResult, dotStringCst = "";
/*Scrips Code Mirror */
$(document).ready(function () {
    OakdEditor = editor('editor');
    consoleResult = editor('console', 'text/x-rustsrc', true, true, false, true);
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
function getErrors(e) {


}
/**
 * Tabla de simbolos 
 */
function getSymbolsTable() {

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
    nombreArchivo += ".oa"
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
    const text = OakdEditor.getValue();
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

    } catch (error) {
        let outputError = ''; 
        console.log('*******Error*******')
        console.log(JSON.stringify(error,null,2))    
        outputError += `Error: ${error.message}`
        console.log(`Error: ${error.expected}`)
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
    btnT = document.getElementById('btn__t');




btnOpen.addEventListener('click', () => openFile(OakdEditor));
btnClean.addEventListener('click', () => cleanEditor(OakdEditor));
btnAnalysis.addEventListener('click', () => analysis());
btnSave.addEventListener('click', () => saveFile());
btnT.addEventListener('click', () => graphVCST());




