// controllers/mostrarcontroller.js
const Catalogo = require('../models/catalogomodel');

exports.mostrarCatalogo = async (req, res) => {
    try {
        // Obtener todos los vehículos de la tabla catalogo
        const vehiculos = await Catalogo.findAll();
        
        // Verificar si se obtuvieron resultados
        if (!vehiculos || vehiculos.length === 0) {
            console.log('No se encontraron vehículos en la base de datos');
            return res.render('catalogo', {
                title: 'InicioAutoPrest | Catálogo',
                vehiculos: []
            });
        }

        // Mostrar los datos en consola para depuración
        console.log('Vehículos encontrados:', JSON.stringify(vehiculos, null, 2));
        
        // Pasar los datos a la vista
        res.render('catalogo', {
            title: 'InicioAutoPrest | Catálogo',
            vehiculos: vehiculos
        });
    } catch (error) {
        console.error('Error al obtener vehículos:', error);
        res.status(500).render('error', {
            message: 'Error al cargar el catálogo',
            error: error
        });
    }
};