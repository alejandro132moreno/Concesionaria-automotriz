const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const registrar = require('../controllers/contactocontroller');
const ventas = require('../controllers/vendercontroller');
const mostrarController = require('../controllers/mostrarcontroller');
const Catalogo = require('../models/catalogomodel'); 
const { verificarToken } = require('../middlewares/auth');
const clienteController = require('../controllers/UsuarioController');

// Configuración de multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Rutas GET
router.get('/catalogo', mostrarController.mostrarCatalogo); // Usa el controlador

router.get('/servicios', (req, res) => {
    res.render('servicios', {
        title: 'AutoPrest | Servicios', 
    });
});

router.get('/contacto', (req, res) => {
    res.render('contacto', {
        title: 'AutoPrest | Contacto',
        errores: [], 
        datos: {} 
    });
});

// Ruta para detalles del vehículo
router.get('/catalogo/:id', async (req, res) => {
    try {
        const vehiculo = await Catalogo.findByPk(req.params.id);
        
        if (!vehiculo) {
            return res.status(404).render('error', {
                title: 'AutoPrest | Vehículo no encontrado',
                mensaje: 'El vehículo solicitado no existe en nuestro catálogo'
            });
        }

        res.render('detalle', {
            title: `AutoPrest | ${vehiculo.Marca} ${vehiculo.Modelo}`,
            vehiculo: vehiculo
        });
        
    } catch (error) {
        console.error('Error en cliente/catalogo/:id:', error);
        res.status(500).render('error', {
            title: 'AutoPrest | Error',
            mensaje: 'Ocurrió un error al cargar el vehículo'
        });
    }
});

router.get('/vender',verificarToken, (req, res) => {
    res.render('vender', {
        title: 'AutoPrest | Vender',
        errores: [],
        datos: {} 
    });
});

router.get('/', (req, res) => {
    res.render('index', {
        title: 'AutoPrest | Servicios', 
    });
});
// Rutas POST
router.post('/contacto', registrar);
router.post('/vender',verificarToken, upload.single('imagen'), ventas);


router.get('/login', clienteController.getLogin);
router.post('/login', clienteController.postLogin);
router.get('/registro', clienteController.getRegistro);
router.post('/registro', clienteController.postRegistro);
router.get('/logout', clienteController.logout);
router.post('/logout', clienteController.logout);



module.exports = router;