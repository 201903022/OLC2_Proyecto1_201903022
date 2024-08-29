let errorTable, symbolTable, Arm64Editor, consoleResult, dotStringCst = "";
/*Scrips Code Mirror */
$(document).ready(function () {
    Arm64Editor = editor('editor');
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

/**
 * Tabla de simbolos 
 */
function getSymbolsTable() {
    let info = '<tr><th>No.</th><th>ID</th><th>Tipo</th><th>Tipo de Dato</th><th>Entorno</th><th>Linea</th><th>Columna</th></tr>'
    document.getElementById('symb-report').innerHTML = info


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
    const text = Arm64Editor.getValue();
    var archivoBlob = new Blob([text], { type: 'text/plain' });
    // Crear un enlace para descargar el archivo
    var enlaceDescarga = document.createElement("a");
    enlaceDescarga.href = window.URL.createObjectURL(archivoBlob);

    // Solicitar al usuario que ingrese un nombre de archivo
    var nombreArchivo = prompt("Por favor, ingresa el nombre del archivo:", "nombreArchivo");
    nombreArchivo += ".s"
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


const btnClean = document.getElementById('clearButton'),
    btnOpen = document.getElementById('btn__open'),
    btnSave = document.getElementById('btn__save'),
    btnAnalysis = document.getElementById('btn__analysis'),
    btnT = document.getElementById('btn__t');




btnOpen.addEventListener('click', () => openFile(Arm64Editor));
btnClean.addEventListener('click', () => cleanEditor(Arm64Editor));
btnAnalysis.addEventListener('click', () => analysis());
btnSave.addEventListener('click', () => saveFile());
btnT.addEventListener('click', () => graphVCST());

/**contador para ejecucion */

let contadorId;

// Función para iniciar el contador
// Función para iniciar el contador
function iniciarContador() {
    tiempoInicio = performance.now(); // Guardar el tiempo de inicio en milisegundos
    console.log('Contador iniciado.');
}

