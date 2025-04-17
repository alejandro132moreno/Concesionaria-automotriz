// middlewares/auth.js
const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        req.flash('error', 'Acceso no autorizado. Inicia sesión.');
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto_jwt');
        req.user = decoded;
        req.rol = decoded.rol;
        next();
    } catch (error) {
        console.error('Error de autenticación:', error);
        req.flash('error', 'Token inválido o expirado.');
        res.redirect('/login');
    }
};

exports.verificarRol = (rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user) {
            req.flash('error', 'Debes iniciar sesión primero');
            return res.redirect('/login');
        }

        if (!rolesPermitidos.includes(req.user.rol)) {
            req.flash('error', 'No tienes permisos para acceder a esta sección');
            return res.redirect('/');
        }

        next();
    };
};

exports.esAdmin = (req, res, next) => {
    if (!req.user || req.user.rol !== 'admin') {
        req.flash('error', 'Acceso restringido a administradores');
        return res.redirect('/');
    }
    next();
};
// middlewares/auth.js
exports.esGerente = (req, res, next) => {
    try {
        const user = req.user; // Lo ideal es que lo decodifiques en verificarToken
        if (user && user.rol === 'gerente') {
            next();
        } else {
            req.flash('error', 'Acceso denegado');
            return res.redirect('/login');
        }
    } catch (err) {
        console.error(err);
        res.redirect('/login');
    }
};

