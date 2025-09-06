const express = require('express'); //me permite crear servidores http cpn pocas lineas de código
const mongoose = require('mongoose'); //me permite conectarme a MongoDB y definir esquemas
const usuario = require('./models/usuario');


const app = express();
app.use(express.json()); //middleware global para parsear (convertir) JSON: afecta tanto a requ, como a res

mongoose.connect('mongodb://localhost:27017/mi_basededatos')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión', err));

app.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = new usuario(req.body); 
        await nuevoUsuario.save(); //instrucción no bloqueante
        res.status(201).send(nuevoUsuario);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});