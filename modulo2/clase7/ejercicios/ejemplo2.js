// servidor.js
const express = require('express');
const app = express();

app.use(express.json());

// Ruta normal
app.get('/', (req, res) => {
  res.send("Bienvenido al servidor");
});

// Ruta que lanza una excepción
app.get('/error', (req, res) => {
  // Supongamos que esperamos un parámetro obligatorio
  if (!req.query.nombre) {
    throw new Error("El parámetro 'nombre' es obligatorio");
  }
  res.send(`Hola ${req.query.nombre}`); //sellamos la respuesta mandando el mensaje Hola + nombre
});

// Otra ruta 
app.get('/saludo', (req, res) => {
  res.send("¡Hola desde otra ruta!");
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});