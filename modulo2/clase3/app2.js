const express = require('express');
const app = express();
const port = 3000;

let contador = 0;

function contarPeticiones(req, res, next) {
    contador++; 
    console.log(`Número de peticiones recibidas: ${contador}`);
    next();
}

app.use(contarPeticiones); //middleware global

app.get('/a', (req, res) => {
    res.send('Ruta A'); 
});

app.get('/b', (req, res) => {
    res.send('Ruta B');
});



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});