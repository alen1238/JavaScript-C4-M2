# Proyecto Final – API REST: Batallas de Playlists

## Contexto

En la era del streaming y la música digital, las playlists se han convertido en la forma favorita de compartir gustos musicales. Con este proyecto, vas a crear una API REST con Express y MongoDB que permita a los usuarios competir entre sí con sus playlists, generando un ranking de las más votadas.

El objetivo es poner en práctica todo lo aprendido en el curso:

- Middleware en Express.
- Autenticación con JWT.
- CRUD con MongoDB.
- Modelado de datos y validaciones con Mongoose.
- Manejo de errores.

---

## Requerimientos del proyecto

### 1. Gestión de usuarios

Los usuarios deben poder registrarse y autenticarse con JWT.

Cada usuario tendrá:

- **username** (único).
- **email** (único).
- **password** (encriptada).

### 2. Playlists

Un usuario autenticado puede crear una playlist.

Una playlist debe tener:

- **titulo** (ejemplo: Lo mejor del rock clásico).
- **descripcion** (opcional, máximo 200 caracteres).
- **canciones** (lista de strings con nombre de la canción o URL).
- **autor** (usuario que la creó, relación con Users).
- **fechaCreacion**.
- **votos** (contador numérico, por defecto en 0).

Operaciones permitidas:

- Crear playlist.
- Listar todas las playlists.
- Obtener una playlist por ID.
- Actualizar solo la propia playlist.
- Eliminar solo la propia playlist.

### 3. Batallas de playlists

- Cualquier usuario autenticado puede votar por una playlist (solo una vez por playlist).
- Cada voto incrementa el contador **votos**.
- Validar que un usuario no vote dos veces la misma playlist.

### 4. Ranking semanal

- Endpoint que devuelva las playlists ordenadas por número de votos, de mayor a menor.
- **Opcional**: limitar a las 10 primeras playlists más votadas.

### 5. Gestión de errores

- Validaciones con mensajes claros (ejemplo: “El título de la playlist es obligatorio”).
- Respuestas de error en formato JSON.

---

## Endpoints sugeridos

### Usuarios

- `POST /api/auth/register` → Registrar usuario.
- `POST /api/auth/login` → Autenticación con JWT.

### Playlists

- `POST /api/playlists` → Crear playlist (requiere JWT).
- `GET /api/playlists` → Listar todas las playlists.
- `GET /api/playlists/:id` → Obtener una playlist por ID.
- `PUT /api/playlists/:id` → Actualizar playlist propia.
- `DELETE /api/playlists/:id` → Eliminar playlist propia.

### Batallas

- `POST /api/playlists/:id/vote` → Votar por una playlist.
- `GET /api/playlists/ranking` → Ranking de playlists.

---