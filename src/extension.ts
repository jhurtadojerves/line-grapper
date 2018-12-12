'use strict'; // Define que el archivo se ejecutara en modo estricto
import * as vscode from 'vscode'; // Importa el paquete necesario para acceder al API de extensiones de VS Code


// Se declara la función mediante la cual la extensión es activada
export function activate(context: vscode.ExtensionContext) {
    /*En una variable de ámbito local (dentro de la función)
    se registra el comando que utiliza la extensión
    */
    let disposable = vscode.commands.registerCommand('extension.gapline', () => {
        // Obtenemos una "instancia" del editor activo de VS Code
        var editor = vscode.window.activeTextEditor;
        // Si no existe un editor activo, terminamos la ejecución de la función.
        if (!editor) { return; }
        // Obtenemos el texto seleccionado del editor activo
        var selection = editor.selection;
        // Obtenmos el texto de la selección
        var text = editor.document.getText(selection);
        /*Utilizando una promesa de ECMAScript 6 mediante el cual con una ventana solicitamos
         el número de líneas a partir de las cuales se insertará un espacio en blanco
         La cantidad de líneas se recibe en el primer parámetro de la Arrow Function
         */
        vscode.window.showInputBox({ prompt: 'Lineas?' }).then(value => {
            // Se asigna el la cantidad de líneas en una variable de caracter local
            let numberOfLines = +value;
            // Creamos un array en blanco en dónde, posteriormente, se asignarán las líneas de texto
            var textInChunks: Array<string> = [];
            /* Con la función split dividimos el texto en un array a partir de los saltos de línea.
            El valor retornado es un array, por lo que lo recorremos con la función forEach propia de los vectores.
            La función forEach recibe dos parámetros. currentLine que representa el elemento actual, y lineIndex el índice del elemento
            */
            text.split('\n').forEach((currentLine: string, lineIndex) => {
                // Se almacena cada línea (obtenida por split y por forEach) en el vector textInChunks
                textInChunks.push(currentLine);
                // Si el número de elemento (índice + 1) es múltiplo de numberOfLines se almacena una línea vacía
                if ((lineIndex + 1) % numberOfLines === 0) textInChunks.push('');
            });
            /* Unimos cada chunk del vector en un solo texto, con la función join unimos todos los elementos de un vector
            agregando entre ellos un caracter, en nuestro caso un salto de línea. 
            */
            text = textInChunks.join('\n');
            // La función edit permite editar el contenido del editor selecciona, recibe como parámetro una arrow function
            editor.edit((editBuilder) => {
		    //constructor(startLine: number, startCharacter: number, endLine: number, endCharacter: number);
            // La función vscode.Range recibe como parámetro la línea inicia, el caracter inicial, la línea final y el caracter final
                var range = new vscode.Range(
                    // Primera línea de la selección
                    selection.start.line,
                    // Comenzamos en 0
                    0,
                    // Última línea de la selección
                    selection.end.line,
                    // El último caracter de la selección, dado por el tamaño del texto
                    editor.document.lineAt(selection.end.line).text.length
                );
                // Reemplazamos el contenido del editor por el texto que incluye las nuevas líneas en blanco
                editBuilder.replace(range, text);
            });
        })
    });
    context.subscriptions.push(disposable);
}

export function deactivate() { }
