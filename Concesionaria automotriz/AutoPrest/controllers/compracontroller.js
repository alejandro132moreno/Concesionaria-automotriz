const Catalogo = require('../models/catalogomodel');
const Venta = require('../models/comprasmodel');

exports.formularioVenta = async (req, res) => {
    const vehiculo = await Catalogo.findByPk(req.params.id);
    if (!vehiculo) {
        req.flash('error', 'Vehículo no encontrado');
        return res.redirect('/gerente/catalogoventa');
    }

    res.render('gerente/formularioVenta', {
        vehiculo,
        user: req.usuario
    });
};

exports.realizarVenta = async (req, res) => {
    try {
        const vehiculo_id = req.params.id || req.body.vehiculo_id;

        if (!vehiculo_id) {
            req.flash('error', 'No se proporcionó ID del vehículo');
            return res.redirect('/gerente/catalogoventa');
        }

        const auto = await Catalogo.findByPk(vehiculo_id);
        if (!auto) {
            req.flash('error', 'Vehículo no encontrado');
            return res.redirect('/gerente/catalogoventa');
        }

        const { comprador_nombre, comprador_apellidos, comprador_telefono, comprador_correo } = req.body;

        // Crear la venta
        const nuevaVenta = await Venta.create({
            vehiculo_id: auto.id,
            comprador_nombre,
            comprador_apellidos,
            comprador_telefono,
            comprador_correo,
            Marca: auto.Marca,
            Modelo: auto.Modelo,
            Anio: auto.Anio,
            Tipo: auto.Tipo,
            Condicion: auto.Condicion,
            Transmision: auto.Transmision,
            Combustible: auto.Combustible,
            Kilometraje: auto.Kilometraje,
            NombreVendedor: auto.NombreVendedor,
            TelefonoVendedor: auto.TelefonoVendedor,    
            Color: auto.Color,
            Imagen: auto.Imagen,
            Precio: auto.Precio,
            PrecioVenta: auto.PrecioVenta,
            Descripcion: auto.Descripcion,
            Accesorios: auto.Accesorios
        });

        // Marcar el vehículo como vendido (actualizar su estado)
        await auto.update({ estado: 'Vendido' });

        // Eliminar el vehículo del catálogo (opcional)
        // Si deseas eliminar el vehículo del catálogo completamente, descomenta la siguiente línea:
         await auto.destroy();

        req.flash('success', 'Venta registrada exitosamente');
        res.redirect(`/gerente/detalleventa/${nuevaVenta.id}`);  // Redirigir al detalle de la venta con el ID correcto

    } catch (error) {
        console.error('Error al registrar venta:', error);
        req.flash('error', `Error al registrar la venta: ${error.message}`);
        res.redirect('/gerente/catalogoventa');
    }
};
