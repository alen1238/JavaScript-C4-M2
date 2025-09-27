// servidor.js
const express = require('express');
const app = express();

app.use(express.json());

// Ruta normal
app.get('/', (req, res) => {
  res.send("Bienvenido al servidor");
});

// Ruta que lanza un error de "cliente"
app.get('/error', (req, res, next) => {
  try {
    if (req.query.nombre) {
        res.send(`Hola ${req.query.nombre}`);//sellando la respuesta
    }else{
      const err = new Error("El parámetro 'nombre' es obligatorio"); //creamos un objeto de tipo error
      err.statusCode = 400; // Error del cliente (Bad Request)
      console.log("Error de cliente detectado:" + err.message);
      throw err;} 
  } catch (err) {
    next(err); // aqui se detecta el error y se pasa al middleware de manejo de errores
  }
});

// Ruta que simula un error "del servidor"
app.get('/crash', (req, res, next) => {
  try {
    // Simulamos un bug interno ejemplo: una referencia a una variable no definida, no conectó a la base de datos, etc.
    throw new Error("Error inesperado en el servidor");
  } catch (err) {
    next(err);
  }
});

// --- Middleware de manejo de errores, se escriben después de todas las rutas ---
app.use((err, req, res, next) => {
  console.error(err.stack); // logging para desarrolladores

  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message,
    status: status === 500 ? "Error del servidor" : "Error del cliente"
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});