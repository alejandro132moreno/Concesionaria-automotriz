// app.js
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('./models/Usuariomodel');
const adminRoutes = require('./routers/adminRoutes');
const gerenteRoutes = require('./routers/gerenteRoutes');

const router = require('./routers/router');


const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.static('node_modules/@fancyapps/fancybox/dist'));

// Configurar sesión y flash
app.use(session({
    secret: 'secreto_sesion',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15 * 60 * 1000 // 15 minutos (en milisegundos)
    }
}));
app.use(flash());
// Middleware para pasar mensajes flash a las vistas

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.session = req.session || {}; // ✅ Aquí se pasa `session` a EJS
    next();
});


// Conectar con base de datos
db.authenticate()
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err));

// Rutas

app.use(async (req, res, next) => {
    const token = req.session.token;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_jwt');
            const user = await User.findByPk(decoded.id);

            if (user) {
                req.user = decoded; // para usar en rutas protegidas
                res.locals.usuario = {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                    rol: user.rol
                };
            } else {
                res.locals.usuario = null;
            }
        } catch (err) {
            console.error('Token inválido:', err.message);
            req.session.token = null;
            res.locals.usuario = null;
        }
    } else {
        res.locals.usuario = null;
    }

    next();
});

app.use('/', router);
app.use('/', adminRoutes);
app.use('/', gerenteRoutes);

/*app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.status(200).end(); // No redirige, solo responde
    });
});
*/

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = db;
