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





