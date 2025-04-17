const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verificarToken, esAdmin } = require('../middlewares/auth');

router.get('/admin/usuarios', verificarToken, esAdmin, adminController.vistaUsuarios);


router.post('/admin/usuarios', verificarToken, esAdmin, adminController.registrarUsuario);
// Editar usuario (mostrar formulario)
router.get('/admin/editar/:id', verificarToken, esAdmin, adminController.vistaEditarUsuario);

// Editar usuario (guardar cambios)
router.post('/admin/editar/:id', verificarToken, esAdmin, adminController.editarUsuario);

// Eliminar usuario
router.post('/admin/eliminar/:id', verificarToken, esAdmin, adminController.eliminarUsuario);



module.exports = router;
