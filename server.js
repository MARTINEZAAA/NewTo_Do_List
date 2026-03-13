// Importar el módulo 'express' para poder crear el servidor web 
const express = require('express'); 
// Importar el módulo nativo 'path' para manejar rutas de archivos y directorios
const path = require('path'); 
// Crear una instancia de la aplicación Express
const app = express(); 
// se define el puerto en el que el servidor va a escuchar las peticiones
const puerto = 8080;
// se define la dirección IP donde el servidor escuchará las conexiones
// 0.0.0.0 permite que el servidor sea accesible desde cualquier computadora de la red local
const host = '0.0.0.0'; 
// Usar express.static para indicar la carpeta que se servirá de forma pública
// path.join(__dirname, 'publico') construye la ruta absoluta a la carpeta 'publico'
// que se encuentra en el mismo directorio que este archivo.
app.use(express.static(path.join(__dirname, 'publico')));
// Iniciar el servidor en el puerto especificado
// También se indica el host para permitir acceso desde otros equipos en la red
app.listen(puerto, host, () => {
    // Mensaje de confirmación que se muestra en la consola cuando el servidor está corriendo
    console.log(`Servidor funcionando en: http://localhost:${puerto}`);
    // Mensaje adicional indicando que también se puede acceder desde otra computadora usando la IP del equipo
    console.log(`Servidor funcionando en: http://192.168.1.112:${puerto}`);
});