const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));

app.get('/peliculas/:nombre', (req, res) => {
    const nombre= req.params.nombre;
    res.send(`Detalles de la película: ${nombre}`);
});

app.post('/peliculas', (req, res) => {
    const {titulo} = req.body;
    res.status(201).send(`Película creada: ${JSON.stringify(nuevaPelicula)}`);
});