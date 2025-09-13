const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

//Clave secreta para firmar los tokens
const SECRET_KEY = "mi_super_clave_secreta123!@#";

//Base de datos simulada
const users = [
    { id: 1, username: 'adriano', password: 'password1', role: 'admin' },
    { id: 2, username: 'angie', password: 'password2', role: 'user' },
    { id: 3, username: 'daniel', password: 'password3', role: 'user' }
];

//Ruta de login (crea un token si las credenciales son correctas)
app.post('/login', (req, res) => {
    const { username, password} = req.body;
    
    //const user = users.find((u) => u.username === usernameReq && u.password === passwordReq);
    let user;
        //lo podemos reemplazar por una busqueda con ciclo for
        for(let i=0; i<users.length; i++){
            if(users[i].username === username && users[i].password === password){
               user = users[i];
                break;
            }   
        }
    console.log(user);
    if(!user){
        return res.status(401).json({ message: 'Credenciales inválidas'});
    }
    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30m' });
    console.log(token);
    res.json({message: "Login exitoso", token }); 
});

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];   
    if(!token){
        return res.status(401).json({ message: 'Token no proporcionado'});
    }   
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if(err){
            return res.status(403).json({ message: 'Token inválido o expirado'});
        }   
        req.user = user;
        next();
    });
}

//Ruta protegida (requiere token válido)
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Acceso concedido a la ruta protegida', user: req.user });
});


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});


