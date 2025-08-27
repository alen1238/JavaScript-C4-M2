# 📌 Ejercicios de Middlewares en Express.js

---

## 📝 Ejercicio 1: Bloqueo por rol de usuario
**Enunciado**  
1. Crea un middleware llamado `verificarRol`.  
2. El middleware debe revisar un valor de `rol` recibido en la query (`?rol=`).  
3. Si el rol es `"admin"`, se permite el acceso.  
4. Si el rol es distinto, muestra el mensaje `"Acceso denegado: necesitas ser Admin"`.  
5. Aplica este middleware en la ruta `/admin`.  
6. Prueba en el navegador:  
   - `http://localhost:3000/admin?rol=admin` → debe permitir acceso.  
   - `http://localhost:3000/admin?rol=user` → debe denegar acceso.  

**Solución**  
```js
const express = require('express');
const app = express();
const port = 3000;

function verificarRol(req, res, next) {
    const rol = req.query.rol;
    if (rol === 'admin') {
        next();
    } else {
        res.send('<h1>Acceso denegado: necesitas ser Admin</h1>');
    }
}

app.get('/admin', verificarRol, (req, res) => {
    res.send('<h1>Bienvenido Admin</h1>');
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
```

---

## 📝 Ejercicio 2: Medir tiempo de respuesta
**Enunciado**  
1. Crea un middleware llamado `medirTiempo`.  
2. Este middleware debe registrar el tiempo antes y después de atender la petición.  
3. Debe mostrar en consola cuánto tardó en responder la ruta.  
4. Aplica este middleware de forma **global** con `app.use()`.  
5. Prueba en las rutas `/a` y `/b` y revisa la consola para ver los tiempos.  

**Solución**  
```js
const express = require('express');
const app = express();
const port = 3000;

function medirTiempo(req, res, next) {
    const inicio = Date.now();

    res.on('finish', () => {
        const fin = Date.now();
        console.log(`Tiempo de respuesta: ${fin - inicio} ms`);
    });

    next();
}

app.use(medirTiempo);

app.get('/a', (req, res) => {
    res.send('Ruta A - midiendo tiempo');
});

app.get('/b', (req, res) => {
    res.send('Ruta B - midiendo tiempo');
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
```

---

## 📝 Ejercicio 3: Autenticación con token
**Enunciado**  
1. Crea un middleware llamado `verificarToken`.  
2. El middleware debe revisar si en el header `token` viene el valor `"12345"`.  
3. Si el token es válido, permite el acceso.  
4. Si no, responde con `"Token inválido"`.  
5. Aplica este middleware en la ruta `/secreto`.  
6. Para probar, usa Postman o Thunder Client:  
   - Header: `token=12345` → acceso concedido.  
   - Otro valor o sin header → acceso denegado.  

**Solución**  
```js
const express = require('express');
const app = express();
const port = 3000;

function verificarToken(req, res, next) {
    const token = req.headers['token'];
    if (token === '12345') {
        next();
    } else {
        res.status(401).send('Token inválido');
    }
}

app.get('/secreto', verificarToken, (req, res) => {
    res.send('Acceso concedido al área secreta 🔐');
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
```

---

## 📝 Ejercicio 4: Validar datos en un formulario POST
**Enunciado**  
1. Crea un middleware llamado `validarDatos`.  
2. Este middleware debe revisar que en el body (JSON) exista el campo `nombre`.  
3. Si falta, responde con `"Falta el campo nombre"`.  
4. Si está presente, continúa a la ruta.  
5. Implementa la ruta `/registro` que reciba un POST con JSON.  
6. Prueba enviando un objeto válido e inválido desde Postman.  

**Solución**  
```js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // para leer JSON

function validarDatos(req, res, next) {
    const { nombre } = req.body;
    if (!nombre) {
        return res.status(400).send('Falta el campo nombre');
    }
    next();
}

app.post('/registro', validarDatos, (req, res) => {
    res.send(`Usuario ${req.body.nombre} registrado correctamente ✅`);
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
```

---

## 📝 Ejercicio 5: Middleware de logger personalizado
**Enunciado**  
1. Crea un middleware llamado `loggerPersonalizado`.  
2. Este middleware debe mostrar en consola:  
   - Método de la petición (GET, POST, etc.).  
   - URL de la ruta.  
   - Fecha y hora exacta de la petición.  
3. Haz que este middleware sea **global**.  
4. Prueba accediendo a varias rutas (`/a`, `/b`, `/c`) y revisa la consola.  

**Solución**  
```js
const express = require('express');
const app = express();
const port = 3000;

function loggerPersonalizado(req, res, next) {
    const fecha = new Date().toLocaleString();
    console.log(`[${fecha}] ${req.method} ${req.url}`);
    next();
}

app.use(loggerPersonalizado);

app.get('/a', (req, res) => {
    res.send('Ruta A');
});

app.get('/b', (req, res) => {
    res.send('Ruta B');
});

app.get('/c', (req, res) => {
    res.send('Ruta C');
});

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
```
