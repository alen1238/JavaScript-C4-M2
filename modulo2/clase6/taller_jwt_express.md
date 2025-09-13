# Taller Práctico: Autenticación con JWT en Express

## Ejercicio 1 – Biblioteca Digital (Guiado con TODOs + Código)

En este ejercicio vamos a construir juntos un sistema de **Biblioteca Digital**, donde los usuarios podrán autenticarse, ver libros y, si son administradores, agregar nuevos.

---

### Fase 1: Configuración del Servidor

**Crear carpeta y proyecto:**

```bash
mkdir biblioteca-jwt
cd biblioteca-jwt
npm init -y
npm install express jsonwebtoken
```

**Crear archivo `server.js` y escribir:**

```javascript
// TODO: Paso 1 - Crear servidor básico con Express
const express = require('express');
const app = express();

app.use(express.json()); // Middleware para JSON

app.get('/', (req, res) => {
    res.send('Bienvenido a la Biblioteca Digital');
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
```

**Probar en Postman:**  
- Método: GET  
- URL: `http://localhost:3000/`  
- Respuesta esperada: `"Bienvenido a la Biblioteca Digital"`

---

### Fase 2: Login y Generación de Tokens

Agregamos usuarios de prueba y el login.

```javascript
const jwt = require('jsonwebtoken');

// TODO: Paso 2 - Base de datos simulada
const SECRET_KEY = "clave_biblioteca_456!";

const users = [
    { id: 1, username: 'maria', password: '1234', role: 'admin' },
    { id: 2, username: 'jose', password: 'abcd', role: 'user' },
    { id: 3, username: 'lina', password: '0000', role: 'user' }
];

// TODO: Paso 3 - Ruta de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    let user;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            user = users[i];
            break;
        }
    }

    if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '20m' });

    res.json({ message: "Login exitoso", token });
});
```

**Probar en Postman:**  
- Método: POST  
- URL: `http://localhost:3000/login`  
- Body (JSON):  

```json
{
  "username": "maria",
  "password": "1234"
}
```

**Respuesta esperada:**

```json
{
  "message": "Login exitoso",
  "token": "<JWT_TOKEN>"
}
```

---

### Fase 3: Middleware y Rutas Protegidas

```javascript
// TODO: Paso 4 - Middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado 🚫' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido o expirado ⏰' });
        }
        req.user = user;
        next();
    });
}

// TODO: Paso 5 - Ruta protegida
const books = [
    { id: 1, title: "Cien Años de Soledad", author: "Gabriel García Márquez" },
    { id: 2, title: "El Principito", author: "Antoine de Saint-Exupéry" }
];

app.get('/books', authenticateToken, (req, res) => {
    res.json({ message: 'Lista de libros', books });
});
```

**Probar en Postman:**  
1. Loguearse en `/login` y copiar el token.  
2. Método: GET  
3. URL: `http://localhost:3000/books`  
4. Header:  

```
Authorization: Bearer <tu_token>
```

**Respuesta esperada:** lista de libros.

---

### Fase 4: Rutas con Roles (Admin vs User)

```javascript
// TODO: Paso 6 - Agregar libros (solo admin)
app.post('/books/add', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso solo para administradores 🚫' });
    }

    const { title, author } = req.body;
    const newBook = { id: books.length + 1, title, author };
    books.push(newBook);

    res.json({ message: 'Libro agregado con éxito', book: newBook });
});
```

**Probar en Postman:**  
- Método: POST  
- URL: `http://localhost:3000/books/add`  
- Body:  

```json
{
  "title": "El Quijote",
  "author": "Miguel de Cervantes"
}
```

- Como `"maria"` (admin) → éxito.  
- Como `"jose"` (user) → error 403.

---

### Fase 5: Perfil del Usuario

```javascript
app.get('/profile', authenticateToken, (req, res) => {
    res.json({ perfil: req.user });
});
```

**Probar en Postman:**  
- Método: GET  
- URL: `http://localhost:3000/profile`  
- Header: `Authorization: Bearer <token>`  

**Respuesta esperada:** datos del usuario autenticado.

---

## Ejercicio 2 – Cine Online (Ustedes lo Resuelven al 100%)

En este ejercicio ustedes desarrollan todo, solo con instrucciones.

### Contexto

Construir un sistema para un **Cine Online** con las siguientes funciones:

- Login con `/login`.  
- Ver cartelera con `/movies`.  
- Admin puede agregar películas con `/movies/add`.  
- Ver perfil con `/profile`.  

---

### Fase 1: Configuración

- TODO: Crear carpeta `cine-jwt`, instalar `express` y `jsonwebtoken`.  
- TODO: Configurar servidor básico con ruta GET `/` → `"Bienvenido al Cine Online"`.  

**Probar en Postman:** GET `/`

---

### Fase 2: Usuarios y Login

- TODO: Crear array `users` con 3 usuarios (id, username, password, role).  
- TODO: Crear ruta POST `/login`:  
  - Valida usuario.  
  - Devuelve un token con `expiresIn: '15m'`.  

**Probar en Postman:** POST `/login` con body JSON válido.

---

### Fase 3: Middleware

- TODO: Crear `authenticateToken` igual que en el ejercicio anterior.  

**Probar en Postman:** llamar a cualquier ruta sin token → debe fallar.

---

### Fase 4: Cartelera

- TODO: Crear array `movies` con 2 películas iniciales (id, title, genre).  
- TODO: Crear GET `/movies` → protegida con `authenticateToken`.  

**Probar en Postman:** GET `/movies` con token válido.

---

### Fase 5: Agregar Películas (solo admin)

- TODO: Crear POST `/movies/add`.  
- Si el usuario no es admin → error 403.  
- Si es admin → agregar película nueva al array.  

**Probar en Postman:**  
- Como admin → éxito.  
- Como user → error 403.

---

### Fase 6: Perfil

- TODO: Crear GET `/profile` → devuelve `req.user`.  

 **Probar en Postman:** GET `/profile` con token válido.

---

## Retos Finales

- Cambiar expiración a **30 segundos** y observar qué pasa.  
- Crear un nuevo usuario `"admin2"`.  
- Crear ruta `/movies/:id` que devuelva una película por su id.

