const express = require('express');
const app = express();
const port = 3000;

function loguearRuta(req, res, next) {
    console.log(`Ruta accedida: ${req.url}`);
    next();
}

app.use(loguearRuta); //Middleware global

app.get('/saludo', (req, res) => {
    console.log('Recibida una solicitud GET en /saludo');
    res.send('<h1>¡Hola, mundo!</h1>');
});

app.get('/despedida', (req, res) => {
    console.log('Recibida una solicitud GET en /despedida');  
    res.send('<h1>¡Adiós, mundo!</h1>');
});  

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});