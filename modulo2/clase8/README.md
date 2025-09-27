# 🎶 Proyecto Final – API REST: Batallas de Playlists

## 📌 Descripción
Este proyecto consiste en el desarrollo de una **API REST** con **Express** y **MongoDB** que permite a los usuarios competir con sus playlists, generando un **ranking de las más votadas**.  

Es un proyecto integrador que aplica los conocimientos adquiridos en el curso:  
- Middleware en Express.  
- Autenticación con **JWT**.  
- CRUD con **MongoDB + Mongoose**.  
- Validaciones y modelado de datos.  
- Manejo de errores.  

---

## ⚙️ Funcionalidades principales
### Gestión de usuarios
- Registro y autenticación con **JWT**.  
- Datos del usuario: `username`, `email` y `password` encriptada.  

### Playlists
- Crear, listar, obtener por ID, actualizar y eliminar **solo la propia playlist**.  
- Campos: `titulo`, `descripcion`, `canciones`, `autor`, `fechaCreacion`, `votos`.  

### Batallas
- Cualquier usuario autenticado puede votar por una playlist.  
- Se evita el **voto duplicado** por la misma playlist.  

### Ranking
- Listado de playlists ordenadas por número de votos.  
- Opcional: limitar a las 10 primeras.  

---

## 📂 Estructura del proyecto
```
proyecto-playlists/
│
├── src/
│   ├── config/
│   │   └── db.js            # Conexión a la base de datos MongoDB
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── playlistController.js
│   │
│   ├── middlewares/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Playlist.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── playlistRoutes.js
│   │
│   ├── utils/
│   │   └── errorHandler.js   # Manejo de errores centralizado
│   │
│   ├── app.js                # Configuración principal de Express
│   └── server.js             # Punto de entrada
│
├── .env                      # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Endpoints principales
### Usuarios
- `POST /api/auth/register` → Registrar usuario.  
- `POST /api/auth/login` → Autenticación con JWT.  

### Playlists
- `POST /api/playlists` → Crear playlist.  
- `GET /api/playlists` → Listar todas las playlists.  
- `GET /api/playlists/:id` → Obtener playlist por ID.  
- `PUT /api/playlists/:id` → Actualizar playlist propia.  
- `DELETE /api/playlists/:id` → Eliminar playlist propia.  

### Batallas
- `POST /api/playlists/:id/vote` → Votar por una playlist.  
- `GET /api/playlists/ranking` → Ranking de playlists.  

---

## ✅ Tecnologías utilizadas
- **Node.js** + **Express**  
- **MongoDB** + **Mongoose**  
- **JWT** para autenticación  
- **bcryptjs** para encriptación de contraseñas  
- **CORS** y middlewares personalizados  

---

## 📖 Instalación y uso
1. Clonar el repositorio:  
   ```bash
   git clone https://github.com/tuusuario/proyecto-playlists.git
   ```
2. Instalar dependencias:  
   ```bash
   npm install
   ```
3. Configurar variables en `.env`:  
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/playlistsDB
   JWT_SECRET=miclavesecreta
   ```
4. Iniciar el servidor:  
   ```bash
   npm start
   ```

---

## 🏆 Criterios de evaluación
- Correcto uso de Express y Mongoose.  
- Implementación de JWT para rutas privadas.  
- Validaciones y middlewares (incluyendo votos únicos).  
- Manejo de errores con respuestas JSON claras.  
- Organización del proyecto siguiendo buenas prácticas.  
