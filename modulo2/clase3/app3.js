const express = require('express');
const app = express();
const port = 3000;

function bloquearPorHora(req, res, next) {
    const horaLimite = 23; // 5 PM
    const horaActual = new Date().getHours();
    if(horaActual >= horaLimite) {
        return res.send(`<h1>Acceso no permitido después de las ${horaLimite}:00 horas.</h1>`);
    }  
    next();
}

app.get('/a', bloquearPorHora, (req, res) => {
    res.send('<h1>Bienvenido al servicio A antes de las 5 PM</h1>'); 
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});