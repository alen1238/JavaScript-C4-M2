# Manejo de Errores en Express.js


## 1 Ejemplo sencillo: falta de validación en parámetros

En este primer ejemplo veremos qué ocurre cuando no validamos la entrada del usuario.

``` js
// servidor.js
const express = require('express');
const app = express();

app.use(express.json()); // Para recibir JSON en el body

// Ruta que espera un número
app.post('/cuadrado', (req, res) => {
  const { numero } = req.body; 
  // Aquí asumimos que siempre llega un número válido
  const resultado = numero * numero;
  res.json({ resultado });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
```

Si el usuario no envía un número, la aplicación puede romperse o dar resultados inesperados.\
Este ejemplo muestra la **importancia de validar los datos de entrada**.

------------------------------------------------------------------------

## 2 Lanzando un objeto Error

Ahora veremos qué ocurre si **lanzamos un error** explícitamente en una
ruta.

``` js
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
  res.send(`Hola ${req.query.nombre}`);
});

// Otra ruta para demostrar que también se rompe
app.get('/saludo', (req, res) => {
  res.send("¡Hola desde otra ruta!");
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
```

Si probamos `/error` sin el parámetro `nombre`, veremos un **error interno (500)** y el servidor se rompe.\
Esto enseña que los **errores no manejados interrumpen la aplicación**.

------------------------------------------------------------------------

## 3 Naturaleza de los errores en JavaScript

En el desarrollo de aplicaciones con **Express.js**, es importante entender que no todos los errores son iguales.  
Existen principalmente **dos grandes tipos de errores**:

- **Errores del cliente (4xx)** → ocurren cuando el usuario envía datos inválidos, incompletos o hace una solicitud incorrecta.  
  Ejemplo: no enviar el parámetro obligatorio `nombre` en una ruta.  

- **Errores del servidor (5xx)** → suceden cuando hay un fallo interno en el sistema, como un bug en el código, una excepción no controlada o un problema con la base de datos.  

---

###  El objeto `Error` en JavaScript

En JavaScript, un error es un **objeto de la clase integrada `Error`**, que contiene información útil para diagnosticar y manejar fallos.  
Este objeto tiene varias propiedades nativas:

1. **`name`** → el tipo de error (por defecto `"Error"`).  
2. **`message`** → un texto que describe la causa del error.  
3. **`stack`** → la traza completa que indica dónde ocurrió el error (archivo, línea y llamadas de funciones).  

Ejemplo:

```js
const err = new Error("Falta el parámetro 'nombre'");

console.log(err.name);    // "Error"
console.log(err.message); // "Falta el parámetro 'nombre'"
console.log(err.stack);   // Traza completa con archivo y línea
```

Estas propiedades son fundamentales para ayudar a entender la causa raíz de un problema.

---

### Agregar propiedades personalizadas

Como `Error` es un objeto, podemos **extenderlo con propiedades adicionales** para dar más contexto y clasificar mejor los errores.  

Un ejemplo es que al manejar errores en un servidor Express, conviene agregar:

- `statusCode` → para indicar el tipo de error (ejemplo: `400` para cliente, `500` para servidor).  
- `errorCode` → un identificador único interno que nos permita rastrear el tipo de error.  

Ejemplo:

```js
const err = new Error("Falta el parámetro 'nombre'");
err.statusCode = 400;         // Error del cliente
err.errorCode = "USR_001";    // Código interno de error

console.log(err.statusCode);  // 400
console.log(err.errorCode);   // "USR_001"
```

Esto nos da la posibilidad de devolver errores **estructurados y claros** en una API, sin que el servidor se rompa.

---

### Buenas prácticas profesionales

- Proporcionar siempre un **mensaje claro y descriptivo** en la propiedad `message`.  
- Usar propiedades adicionales (`statusCode`, `errorCode`, `details`) para dar más información sin sobrecargar el mensaje.  
- Diferenciar entre **errores del cliente (4xx)** y **errores del servidor (5xx)** desde el momento en que se construye el objeto de error.  
- En proyectos grandes, crear **clases de error personalizadas** (ejemplo: `AppError`) que extiendan de `Error`, para estandarizar y centralizar el manejo de errores en toda la aplicación.  

------------------------------------------------------------------------

## 4️ Middleware de manejo de errores en Express

Express permite crear un **middleware especializado** para capturar errores y responder de forma controlada.

``` js
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
    if (!req.query.nombre) {
      const err = new Error("El parámetro 'nombre' es obligatorio");
      err.statusCode = 400; // Error del cliente (Bad Request)
      throw err;
    }
    res.send(`Hola ${req.query.nombre}`);
  } catch (err) {
    next(err);
  }
});

// Ruta que simula un error "del servidor"
app.get('/crash', (req, res, next) => {
  try {
    // Simulamos un bug interno
    throw new Error("Error inesperado en el servidor");
  } catch (err) {
    next(err);
  }
});

// --- Middleware de manejo de errores ---
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
```

Con este enfoque, los errores ya **no tumban el servidor** y el cliente recibe un JSON explicativo.

------------------------------------------------------------------------

## 5️ Clase `AppError` para centralizar errores

Para proyectos más grandes conviene definir una clase que represente los errores de manera más organizada.

``` js
// appError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
```

Uso en el servidor:

``` js
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
```

Ahora cada vez que queramos lanzar un error controlado, usamos
`throw new AppError(...)`.\
Esto hace que el código sea **más limpio y profesional**.

------------------------------------------------------------------------

# Consideracione de Error

-   Siempre valida los datos de entrada (ejemplo 1).\
-   Los errores no manejados rompen el servidor (ejemplo 2).\
-   Los errores en JS tienen nombre, mensaje y stack útil para debug
    (ejemplo 3).\
-   Usa un **middleware de manejo de errores** en Express (ejemplo 4).\
-   Centraliza los errores con una clase personalizada (`AppError`) en
    proyectos grandes (ejemplo 5).


