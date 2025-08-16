const http = require('http');
const fs = require('fs');
const path = require('path'); //modulo para construir rutas de archivos

const puerto = 3000;

const servidor = http.createServer((req, res) => {

    if(req.url === '/api/recomendados' && req.method === 'GET') {
       const videosRecomendados = [
        {id: '1', titulo: 'Cómo aprender Node.js', canal: 'NodeMaster', duracion: '10:00'},
        {id: '2', titulo: 'Introducción a JavaScript', canal: 'JS Guru', duracion: '8:30'},
        {id: '3', titulo: 'Desarrollo web con Express', canal: 'WebDev', duracion: '12:45'},
        {id: '4', titulo: 'Bases de datos con MongoDB', canal: 'DB Experts', duracion: '15:20'},
        {id: '5', titulo: 'Frontend con React', canal: 'React Masters', duracion: '20:15'}
       ];
         
       const jsonData = JSON.stringify(videosRecomendados); // mi servidor devuelve un JSON
       res.writeHead(200, {'Content-Type': 'application/json'});
       res.end(jsonData); //cerrar la respuesta y se envía el JSON al cliente
    } else {
       const filePath = path.join(__dirname, 'public', '404.html'); // ruta al archivo HTML
       
       fs.readFile(filePath, (err, data) => {
           if (err) {
               res.writeHead(500, {'Content-Type': 'text/plain'});
               res.end('Error interno del servidor');
           } else {
               res.writeHead(404, {'Content-Type': 'text/html'});
               res.end(data); // enviar el archivo HTML al cliente
           }
       });
    }

});

servidor.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
    console.log('visita http://localhost:3000/api/recomendados para ver los videos recomendados');
});
