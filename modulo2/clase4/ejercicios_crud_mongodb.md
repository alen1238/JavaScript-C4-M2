# 🕹️ Ejercicios de Práctica CRUD en MongoDB

Este archivo contiene una serie de ejercicios prácticos para que los estudiantes practiquen operaciones **CRUD** (Create, Read, Update, Delete) sobre la colección `videojuegos` en MongoDB usando la terminal.

---

## 1. CREATE → Insertar documentos

```js
// Insertar UN SOLO documento en la colección "videojuegos"
db.videojuegos.insertOne({
  "titulo": "Pixel Racer",
  "plataforma": ["Switch"],
  "lanzamiento": 2023,
  "multijugador": false
});

// Insertar VARIOS documentos a la vez
db.videojuegos.insertMany([
  {
    "titulo": "Dragon Quest",
    "plataforma": ["PS5", "PC"],
    "lanzamiento": 2021,
    "multijugador": true
  },
  {
    "titulo": "Sky Adventure",
    "plataforma": ["Xbox", "PC"],
    "lanzamiento": 2022,
    "multijugador": false
  },
  {
    "titulo": "Battle Arena",
    "plataforma": ["PC"],
    "lanzamiento": 2019,
    "multijugador": true
  }
]);
```

---

## 2. READ → Consultar documentos

```js
// Leer TODOS los documentos
db.videojuegos.find();

// Mostrar documentos de forma legible
db.videojuegos.find().pretty();

// Leer SOLO un documento específico
db.videojuegos.findOne({ "titulo": "Pixel Racer" });

// Buscar juegos multijugador
db.videojuegos.find({ "multijugador": true });

// Buscar juegos lanzados en 2022
db.videojuegos.find({ "lanzamiento": 2022 });

// Buscar juegos lanzados después de 2020 ($gt)
db.videojuegos.find({ "lanzamiento": { $gt: 2020 } });

// Buscar juegos lanzados antes de 2022 ($lt)
db.videojuegos.find({ "lanzamiento": { $lt: 2022 } });

// Buscar juegos lanzados desde 2021 en adelante ($gte)
db.videojuegos.find({ "lanzamiento": { $gte: 2021 } });

// Buscar juegos lanzados hasta 2022 ($lte)
db.videojuegos.find({ "lanzamiento": { $lte: 2022 } });

// Buscar juegos que NO sean de 2021 ($ne)
db.videojuegos.find({ "lanzamiento": { $ne: 2021 } });

// Buscar juegos que estén en un conjunto de años ($in)
db.videojuegos.find({ "lanzamiento": { $in: [2019, 2023] } });

// Buscar juegos que NO estén en un conjunto de años ($nin)
db.videojuegos.find({ "lanzamiento": { $nin: [2019, 2023] } });

// Buscar juegos de PC que sean multijugador (AND implícito)
db.videojuegos.find({ "plataforma": "PC", "multijugador": true });

// Buscar juegos de Switch O lanzados en 2023 (OR explícito)
db.videojuegos.find({ $or: [ { "plataforma": "Switch" }, { "lanzamiento": 2023 } ] });
```

---

## 3. UPDATE → Modificar documentos

```js
// Actualizar SOLO un documento
db.videojuegos.updateOne(
  { "titulo": "Pixel Racer" },
  { $set: { "multijugador": true } }
);

// Actualizar VARIOS documentos a la vez
db.videojuegos.updateMany(
  { "plataforma": "PC" },
  { $set: { "lanzamiento": 2024 } }
);

// Agregar un nuevo campo
db.videojuegos.updateOne(
  { "titulo": "Dragon Quest" },
  { $set: { "genero": "RPG" } }
);

// Incrementar un valor numérico
db.videojuegos.updateOne(
  { "titulo": "Sky Adventure" },
  { $inc: { "lanzamiento": 1 } }
);

// Eliminar un campo de un documento
db.videojuegos.updateOne(
  { "titulo": "Dragon Quest" },
  { $unset: { "genero": "" } }
);
```

---

## 4. DELETE → Eliminar documentos

```js
// Eliminar SOLO un documento
db.videojuegos.deleteOne({ "titulo": "Pixel Racer" });

// Eliminar VARIOS documentos
db.videojuegos.deleteMany({ "plataforma": "PC" });

// Eliminar TODOS los documentos de la colección
db.videojuegos.deleteMany({});
```


