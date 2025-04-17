// controllers/adminController.js
const Usuario = require('../models/Usuariomodel');
const db = require('../config/db'); 

const bcrypt = require('bcryptjs');


exports.panelAdmin = async (req, res) => {
    try {
        const gerentes = await Usuario.findAll({ where: { rol: 'gerente' } });
        res.render('admin/usuarios', { gerentes });
    } catch (error) {
        console.error(error);
        res.render('admin/usuarios', { gerentes: [] });
    }
};
exports.registrarUsuario = async (req, res) => {
    const { nombre, email, pass, rol } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const existe = await Usuario.findOne({ where: { email } });
        if (existe) {
            req.flash('error', 'El correo ya está registrado');
            return res.redirect('/admin/usuarios');
        }

        // Hash de la contraseña
        const hashed = await bcrypt.hash(pass, 10);
        await Usuario.create({ nombre, email, pass: hashed, rol });

        req.flash('success', `Usuario ${rol} creado exitosamente`);
        res.redirect('/admin/usuarios');
    } catch (err) {
        console.error('Error en registrarUsuario:', err);
        req.flash('error', 'Error al registrar el usuario');
        res.redirect('/admin/usuarios');
    }
};
exports.vistaUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            where: {
                rol: ['gerente', 'admin']
            }
        });

        res.render('admin/usuarios', {
            title: 'Lista de Usuarios',
            usuarios, // <-- esto es lo que estaba faltando
            success: req.flash('success'),
            error: req.flash('error')
        });

    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        req.flash('error', 'No se pudieron cargar los usuarios');
        res.redirect('/');
    }
};
// Mostrar formulario de edición
exports.vistaEditarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            req.flash('error', 'Usuario no encontrado');
            return res.redirect('/admin/usuarios');
        }

        res.render('admin/usuarios', { usuario, title: 'Editar Usuario' });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error al cargar usuario');
        res.redirect('/admin/usuarios');
    }
};


exports.editarUsuario = async (req, res) => {
  const { nombre, email, rol, password } = req.body;
  const id = req.params.id;

  try {
    let query = '';
    let values = [];

    if (password && password.trim() !== '') {
      const hashedPassword = await bcrypt.hash(password, 10);
      query = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ?, password = ? WHERE id = ?';
      values = [nombre, email, rol, hashedPassword, id];
    } else {
      query = 'UPDATE usuarios SET nombre = ?, email = ?, rol = ? WHERE id = ?';
      values = [nombre, email, rol, id];
    }

    await db.query(query, { replacements: values });
    req.flash('success', 'Usuario actualizado correctamente');
    res.redirect('/admin/usuarios');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error al actualizar usuario');
    res.redirect('/admin/usuarios');
  }
};
// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            req.flash('error', 'Usuario no encontrado');
            return res.redirect('/admin/usuarios');
        }

        await usuario.destroy();
        req.flash('success', 'Usuario eliminado exitosamente');
        res.redirect('/admin/usuarios');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error al eliminar usuario');
        res.redirect('/admin/usuarios');
    }
};
