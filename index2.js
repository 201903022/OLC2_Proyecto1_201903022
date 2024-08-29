import * as monaco from 'https://cdn.jsdelivr.net/npm/monaco-editor@0.50.0/+esm'
const btn = document.getElementById('btn')
const ast = document.getElementById('ast')
const salida = document.getElementById('salida')
const editor = monaco.editor.create(
    document.getElementById('editor'), {
    value: '',
    language: 'java',
    theme: 'vs-dark'
},
); 


// Define la función para parsear utilizando PEG.js
function parseARM(code) {
    try {
        // Compila la gramática PEG.js directamente desde un string
        const grammar = `
            // Aquí va tu gramática PEG.js
            start = global_stmt / instruction_stmt / comment_stmt / empty_stmt

            global_stmt = ".global" _ identifier
            instruction_stmt = label? instruction (operand ("," operand)*)?
            comment_stmt = "//" .* "\\n"?
            empty_stmt = "\\n"+

            label = identifier ":"
            instruction = "mov" / "add" / "sub" / "ldr" / "str" / "svc" / "cmp" / "b"

            operand = register / immediate / memory
            register = "x" [0-9]+
            immediate = [0-9]+
            memory = "[" identifier "]"

            identifier = [a-zA-Z_] [a-zA-Z0-9_]*

            _ "whitespace"
               = [ \\t\\r\\n]*

        `;
        const parser = peg.generate(grammar);

        // Llama al parser generado por PEG.js para convertir el código en una estructura parseada
        const parsed = parser.parse(code);
        return parsed;
    } catch (error) {
        throw new Error('Error parsing ARM code: ' + error.message);
    }
}

// Función para ejecutar el código ARMv8 parseado
function executeCode() {
    const code = document.getElementById('codeInput').value;
    try {
        const parsed = parseARM(code); // Utiliza PEG.js para parsear dinámicamente
        const result = simulateARM(parsed);
        document.getElementById('console').innerText = result;
    } catch (e) {
        document.getElementById('console').innerText = 'Error: ' + e.message;
    }
}

function clearCode() {
    document.getElementById('codeInput').value = '';
    document.getElementById('console').innerText = 'Salida de la consola...';
}

function loadCode() {
    document.getElementById('fileInput').click();
}

function handleFileLoad(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('codeInput').value = e.target.result;
    };
    reader.readAsText(file);
}

function downloadCode() {
    const code = document.getElementById('codeInput').value;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.s';
    a.click();
}