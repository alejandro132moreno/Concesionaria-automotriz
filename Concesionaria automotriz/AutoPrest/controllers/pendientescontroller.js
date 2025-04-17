

const pendientes = require('../models/vendermodel');
const Catalogo = require('../models/catalogomodel');

exports.pendientesventas = async (req, res) => {
    try {
        const vehiculos = await pendientes.findAll({ where: { Estado: 'pendiente' } }); // solo los pendientes
        res.render('gerente/autopendiente', {
            title: 'InicioAutoPrest | pendientes',
            vehiculos
        });
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        res.status(500).render('error', {
            message: 'Error al cargar los pendientes',
            error
        });
    }
};
exports.aprobarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Actualizar el estado del vehículo en 'pendientes'
        await pendientes.update({ Estado: 'aprobado' }, { where: { id } });

        // 2. Buscar el vehículo aprobado
        const vehiculo = await pendientes.findByPk(id);

        if (!vehiculo) {
            req.flash('error', 'Vehículo no encontrado.');
            return res.redirect('/gerente/autopendiente');
        }

        // 3. Calcular el precio de venta (15% más)
        const precioVenta = parseFloat(vehiculo.Precio) * 1.15;

        // 4. Insertarlo en el catálogo con el nuevo precio
        await Catalogo.create({
            Marca: vehiculo.Marca,
            Modelo: vehiculo.Modelo,
            Anio: vehiculo.Anio,
            Tipo: vehiculo.Tipo,
            Condicion: vehiculo.Condicion,
            Transmision: vehiculo.Transmision,
            Combustible: vehiculo.Combustible,
            Kilometraje: vehiculo.Kilometraje,
            Color: vehiculo.Color,
            Imagen: vehiculo.Imagen,
            Precio: vehiculo.Precio,
            Precioventa: precioVenta, // Precio + 15%
            Descripcion: vehiculo.Descripcion,
            NombreVendedor: vehiculo.NombreVendedor,
            TelefonoVendedor: vehiculo.TelefonoVendedor
        });

        // 5. Redireccionar con éxito
        req.flash('success', 'Vehículo aprobado y agregado al catálogo con precio actualizado.');
        res.redirect('/gerente/autopendiente');

    } catch (error) {
        console.error('Error al aprobar vehículo:', error);
        req.flash('error', 'No se pudo aprobar el vehículo.');
        res.redirect('/gerente/autopendiente');
    }
};


exports.rechazarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        await pendientes.destroy({ where: { id } }); // o puedes usar update({Estado: 'rechazado'})
        req.flash('success', 'Vehículo rechazado y eliminado.');
        res.redirect('/gerente/autopendiente');
    } catch (error) {
        console.error('Error al rechazar vehículo:', error);
        req.flash('error', 'No se pudo rechazar el vehículo.');
        res.redirect('/gerente/autopendiente');
    }
};
exports.detalleVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculo = await pendientes.findByPk(id);

        if (!vehiculo) {
            req.flash('error', 'Vehículo no encontrado');
            return res.redirect('/gerente/autopendiente');
        }

        res.render('gerente/detallescompra', {
            title: 'Detalle del Vehículo',
            vehiculo
        });
    } catch (error) {
        console.error('Error al cargar detalle del vehículo:', error);
        res.status(500).render('error', {
            message: 'Error al cargar el detalle del vehículo',
            error
        });
    }
};

