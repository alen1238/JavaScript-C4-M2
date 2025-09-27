// servidor.js
const express = require('express');
const AppError = require('./appError');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Bienvenido al servidor con AppError");
});

// Ruta con validación usando AppError
app.get('/error', (req, res, next) => {
  if (!req.query.nombre) {
    return next(new AppError("El parámetro 'nombre' es obligatorio", 400));
  }
  res.send(`Hola ${req.query.nombre}`);
});

// Middleware centralizado de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message,
    status: status === 500 ? "Error del servidor" : "Error del cliente"
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});