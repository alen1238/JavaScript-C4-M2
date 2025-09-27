// servidor.js
const express = require('express');
const app = express();

app.use(express.json()); // Para recibir JSON en el body

// Ruta que espera un número
app.post('/cuadrado', (req, res) => {
  const { numero } = req.body; 
  // Aquí asumimos que siempre llega un número válido
  const resultado = numero * numero;
  res.json({ resultado }); //sellando o finalizando la respuesta.
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});