const http = require('http');

const puerto = 3000;

const servidor = http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('¡Hola, mundo desde node.js!\n');
});

servidor.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
