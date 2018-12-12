# Creación de una extensión para Visual Studio Code

La creación de una extensión para VS Code necesita la instalación de dos paquetes de Software: Node.js y el propio VS Code.

1. **VS Code** es un editor de código desarrollado y mantenido por Microsoft.
2. **Node.js** es un motor de JavaScript para el servidor, construído con el motor de JavaScript V8 de Google Chrome.

## Instalación de VS Code

Para instalar VS Code tenemos que acceder a la página de descarga en dónde podremos elegir el paquete adecuado para nuestro sistema operativo. [Descargar VS Code](https://code.visualstudio.com/download)
  
![Descargar VS Code](https://i.imgur.com/mlb0zKq.png "Descargar VS Code")
  
Luego de descargar el instalador procedemos a ejecutarlo (con permisos de administrador de ser necesario), obtendremos la pantalla de bienvenida, simplemente presionamos el botón "Siguiente"
  
![Bienvenido a la Instalación](https://i.imgur.com/ACBEqAm.jpg "Bienvenido a la Instalación")

El siguiente paso consiste en aceptar el Acuerdo de Licencia de VS Code (luego de leerlo) para continuar con la instalación

![Acuerdo de Licencia](https://i.imgur.com/GzCDleq.jpg "Acuerdo de Licencia")

Posteriormente se nos presenta una pantalla en dónde podemos elegir la carpeta de instalación de VS Code, el nombre de la carpeta en el Menú Inicio y algunas acciones adicionales.

![Ubicación](https://i.imgur.com/ihtkVKr.jpg "Ubicación")

![Acciones Adicionales](https://i.imgur.com/Y3TjRuZ.jpg "Acciones Adicionales")

Finalmente, esperamos que los archivos se extraigan y procedemos a ejecutar la aplicación.

![Ejecutar Aplicación](https://i.imgur.com/P6Zcsac.jpg "Ejecutar Aplicación")

![VS Code abierto](https://i.imgur.com/sTAty2b.png "VS Code abierto")

## Instalación de Node.js

Lo primero que debemos realizar es descargar el paquete adecuado para nuestro sistema operativo (en nuestro caso, Windows 10) desde la página oficial de [descarga](https://nodejs.org/es/download/)

![Descargar Node.js](https://i.imgur.com/oRhpsxL.png "Descargar Node.js")

Ejecutamos el instalador, veremos una pantalla de Bienvenida en dónde debemos presionar en "Next"

![Bienvenida Node.js](https://i.imgur.com/7PAcNkn.png)

Lo siguiente que vemos es el acuerdo de licencia, lo aceptamos, seleccionamos la ubicación en dónde se va a instalar node.js

![Licencia](https://i.imgur.com/A1uZzVg.png)

![Ubicación](https://i.imgur.com/r7XNGOm.png)

En las pantallas posteriores, simplemente presionamos "Next" hasta que la instalación finalice

![Custom Setup](https://i.imgur.com/emdSKZ4.png)

![Ready to install](https://i.imgur.com/smzVaK3.png)

![Finalizar](https://i.imgur.com/znF7ouc.png)

## Instalación de Yeoman y Generator Code

Yeoman es un creador de proyectos que funciona con node.js. Sirve para crear el esqueleto inicial de aplicaciones basadas en JavaScript, como por ejemplo ReactJS, AngularJS, Backbone, etc.

*Yo Code* (generator-code) funciona junto a Yeoman y sirve para crear la estructura inicial de una extensión para VS Code. Se instala, al igual que Yeoman, utilizando npm.

Para instalar ambos paquetes de software utilizamos el siguiente comando en una consola con permisos de administador:

```
npm install -g yo generator-code
```

![Instalar paquetes con npm](https://i.imgur.com/wEAoqby.png)

Posteriormente continuamos con la creación de la extensión, para ello ejecutamos *Yo Code* en la consola. 

```
yo code
```

Obtenemos una pantalla con opciones, para nuestro ejemplo particular elegiremos *TypeScript*

![Instalar paquetes con npm](https://i.imgur.com/GWneLSZ.png)

Abrimos la carpeta del proyecto creado con VS Code, y colocamos el código mostrado a continuación en el archivo ubicado en src/extension.ts

```[typescript]
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
```

<script src="https://gist.github.com/jhurtadojerves/fc88eb486af4d6d1e354e65b62122b36.js"></script>






