const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/Usuariomodel');
const Catalogo = require('../models/catalogomodel');


exports.getLogin = (req, res) => {
    res.render('auth/login');
};

exports.getRegistro = (req, res) => {
    res.render('auth/registro');
};

exports.postRegistro = async (req, res) => {
    const { nombre, email, pass } = req.body;
    const errores = [];

    // Validación de Nombre
    if (!nombre || nombre.trim() === '') {
        errores.push({ mensaje: 'El campo Nombre está vacío' });
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre.trim())) {
        errores.push({ mensaje: 'El Nombre solo puede contener letras y espacios' });
    }

    // Validación de Email
    if (!email || email.trim() === '') {
        errores.push({ mensaje: 'El campo Email está vacío' });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        errores.push({ mensaje: 'El correo electrónico no es válido' });
    }

    // Validación de Contraseña
    if (!pass || pass.trim() === '') {
        errores.push({ mensaje: 'El campo Contraseña está vacío' });
    } else if (pass.length < 6) {
        errores.push({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(pass)) {
        errores.push({ mensaje: 'La contraseña debe contener al menos una letra y un número' });
    }

    // Si hay errores, redirige y muestra los mensajes
    if (errores.length > 0) {
        req.flash('error', errores.map(e => e.mensaje));
        return res.redirect('/registro');
    }

    try {
        const existe = await User.findOne({ where: { email } });
        if (existe) {
            req.flash('error', 'El correo ya está registrado');
            return res.redirect('/registro');
        }

        const hashed = await bcrypt.hash(pass, 10);
        await User.create({ nombre, email, pass: hashed });

        req.flash('success', 'Registro exitoso. Inicia sesión.');
        res.redirect('/login');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Hubo un error al registrarse');
        res.redirect('/registro');
    }
};

exports.postLogin = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            req.flash('error', 'Credenciales inválidas');
            return res.redirect('/login');
        }

        const match = await bcrypt.compare(pass, user.pass);
        if (!match) {
            req.flash('error', 'Credenciales inválidas');
            return res.redirect('/login');
        }

        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET || 'secreto_jwt', {
            expiresIn: '1h'
        });

        req.session.token = token;

        // Redirecciona según el rol
        switch (user.rol) {
            case 'admin':
                return res.redirect('/admin/usuarios');
            case 'gerente':
                return res.redirect('/gerente/autopendiente');
            default:
                return res.redirect('/catalogo');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error al iniciar sesión');
        res.redirect('/login');
    }
};

// Cambia esto:
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};
