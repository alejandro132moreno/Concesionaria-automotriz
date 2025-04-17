const express = require('express');
const router = express.Router();
const pendientesController = require('../controllers/pendientescontroller');
const { verificarToken, esGerente } = require('../middlewares/auth');
const Catalogo = require('../models/catalogomodel');
const Venta = require('../models/comprasmodel');
const VentaController = require('../controllers/compracontroller');


router.get('/gerente/detallescompra/:id',verificarToken, esGerente, pendientesController.detalleVehiculo);

// Vista de autos pendientes
router.get('/gerente/autopendiente',verificarToken, esGerente, pendientesController.pendientesventas);

// Aprobar vehículo
router.post('/gerente/aprobar/:id',verificarToken, esGerente, pendientesController.aprobarVehiculo);

// Rechazar vehículo
router.post('/gerente/rechazar/:id',verificarToken, esGerente, pendientesController.rechazarVehiculo);
// En tu archivo de rutas
router.post('/gerente/registrar-venta', verificarToken, esGerente, VentaController.realizarVenta);
router.post('/gerente/catalogoventa/:id', verificarToken, esGerente, VentaController.realizarVenta);

router.get('/gerente/catalogoventa/:id', verificarToken, esGerente, VentaController.formularioVenta);


router.get('/gerente/catalogoventa', verificarToken, esGerente, async (req, res) => {
    try {
        const { busqueda, autoId } = req.query;
        
        // Resto de tu lógica actual...
        let autos = [];
        if (busqueda) {
            autos = await Catalogo.findAll({
                where: {
                    [Op.or]: [
                        { Marca: { [Op.like]: `%${busqueda}%` } },
                        { Modelo: { [Op.like]: `%${busqueda}%` } },
                        { Anio: { [Op.like]: `%${busqueda}%` } },
                    ]
                }
            });
        } else {
            autos = await Catalogo.findAll();
        }
        
        const autoSeleccionado = autoId ? await Catalogo.findByPk(autoId) : null;
        
        if (autoId && !autoSeleccionado) {
            req.flash('error', 'Auto no encontrado');
            return res.redirect('/gerente/catalogoventa');
        }
        
        res.render('gerente/catalogoventa', {
            autos,
            autoSeleccionado,
            busqueda
        });
    } catch (error) {
        console.error('Error al cargar el catálogo:', error);
        req.flash('error', 'Error al cargar el catálogo');
        res.redirect('/gerente/catalogoventa');
    }
});

// Agrega estas rutas
router.get('/gerente/detalleventa', verificarToken, esGerente, async (req, res) => {
    try {
        const { pagina = 1, fecha_inicio, fecha_fin, busqueda } = req.query;
        const limit = 10;
        const offset = (pagina - 1) * limit;

        const where = {};
        
        // Filtro por fechas
        if (fecha_inicio && fecha_fin) {
            where.fecha_compra = {
                [Op.between]: [new Date(fecha_inicio), new Date(fecha_fin)]
            };
        } else if (fecha_inicio) {
            where.fecha_compra = {
                [Op.gte]: new Date(fecha_inicio)
            };
        } else if (fecha_fin) {
            where.fecha_compra = {
                [Op.lte]: new Date(fecha_fin)
            };
        }

        // Filtro por búsqueda
        if (busqueda) {
            where[Op.or] = [
                { Marca: { [Op.like]: `%${busqueda}%` }},
                { Modelo: { [Op.like]: `%${busqueda}%` }},
                { comprador_nombre: { [Op.like]: `%${busqueda}%` }},
                { comprador_apellidos: { [Op.like]: `%${busqueda}%` }}
            ];
        }

        const { count, rows } = await Venta.findAndCountAll({
            where,
            limit,
            offset,
            order: [['fecha_compra', 'DESC']]
        });

        const totalPaginas = Math.ceil(count / limit);

        res.render('gerente/listaventas', {
            ventas: rows,
            paginaActual: parseInt(pagina),
            totalPaginas,
            fecha_inicio,
            fecha_fin,
            busqueda,
            queryString: Object.entries(req.query)
                .filter(([key]) => key !== 'pagina')
                .map(([key, val]) => `${key}=${val}`)
                .join('&'),
            user: req.usuario
        });

    } catch (error) {
        console.error('Error al obtener ventas:', error);
        req.flash('error', 'Error al cargar el historial de ventas');
        res.redirect('/gerente/detalleventa');
    }
});

router.get('/gerente/detalleventa/:id', verificarToken, esGerente, async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id);
        
        if (!venta) {
            req.flash('error', 'Venta no encontrada');
            return res.redirect('/gerente/detalleventa');
        }

        res.render('gerente/detalleventa', {
            venta,
            user: req.usuario
        });

    } catch (error) {
        console.error('Error al obtener detalle de venta:', error);
        req.flash('error', 'Error al cargar los detalles de la venta');
        res.redirect('/gerente/detalleventa');
    }
});
module.exports = router;
