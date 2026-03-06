const http = require('http');
const fs = require('fs');
const path = require('path');

function servirHTML(req, res) {
    const rutaArchivo = path.join(__dirname, 'index.html');

    fs.readFile(rutaArchivo, (error, data) => {
        if (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el archivo');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

const servidor = http.createServer(servirHTML);

servidor.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});