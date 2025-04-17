const modeloventas = require('../models/vendermodel');

const ventas = async (req, res) => {
    console.log(req.body);
    const {
        nombre_vendedor,
        telefono_vendedor,
        marca,
        modelo,
        anio,
        tipo,
        condicion,
        transmision,
        combustible,
        kilometraje,
        color,
        precio,
        precioventa,
        descripcion,
        accesorios // Array
    } = req.body;

    const errores = []; 

    // Validación de Nombre del Vendedor
    if (!nombre_vendedor || nombre_vendedor.trim() === '') {
        errores.push({ mensaje: 'El campo Nombre del vendedor está vacío' });
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre_vendedor.trim())) {
        errores.push({ mensaje: 'El campo Nombre del vendedor solo puede contener letras y espacios' });
    }

    // Validación de Teléfono del Vendedor
    if (!telefono_vendedor || telefono_vendedor.trim() === '') {
        errores.push({ mensaje: 'El campo Teléfono está vacío' });
    } else if (!/^[0-9]{10}$/.test(telefono_vendedor.trim())) {
        errores.push({ mensaje: 'El teléfono debe tener 10 dígitos numéricos' });
    }

    // Validación de Marca
    if (!marca || marca.trim() === '') {
        errores.push({ mensaje: 'El campo Marca está vacío' });
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(marca.trim())) {
        errores.push({ mensaje: 'El campo Marca solo puede contener letras y espacios' });
    }

    // Validación de Modelo
    if (!modelo || modelo.trim() === '') {
        errores.push({ mensaje: 'El campo Modelo está vacío' });
    } else if (!/^[0-9A-Za-záéíóúÁÉÍÓÚñÑ\s\-]+$/.test(modelo.trim())) {
        errores.push({ mensaje: 'El campo Modelo contiene caracteres no válidos' });
    }

    // Validación de Año
    if (!anio) {
        errores.push({ mensaje: 'El campo Año está vacío' });
    } else if (isNaN(anio) || anio < 1900 || anio > new Date().getFullYear() + 1) {
        errores.push({ mensaje: 'El año debe estar entre 1900 y el año siguiente al actual' });
    }

    // Validación de Tipo
    const tiposValidos = ['Sedán', 'SUV', 'Pickup', 'Deportivo', 'Hatchback', 'Camioneta', 'Lujo', 'Eléctrico'];
    if (!tipo || !tiposValidos.includes(tipo)) {
        errores.push({ mensaje: 'Seleccione un tipo de vehículo válido' });
    }

    // Validación de Condición
    const condicionesValidas = ['Nuevo', 'Seminuevo', 'Usado'];
    if (!condicion || !condicionesValidas.includes(condicion)) {
        errores.push({ mensaje: 'Seleccione una condición válida' });
    }

    // Validación de Transmisión
    const transmisionesValidas = ['Automática', 'Manual', 'CVT'];
    if (!transmision || !transmisionesValidas.includes(transmision)) {
        errores.push({ mensaje: 'Seleccione un tipo de transmisión válida' });
    }

    // Validación de Combustible
    const combustiblesValidos = ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico', 'GLP'];
    if (!combustible || !combustiblesValidos.includes(combustible)) {
        errores.push({ mensaje: 'Seleccione un tipo de combustible válido' });
    }

    // Validación de Kilometraje
    if (!kilometraje && kilometraje !== 0) {
        errores.push({ mensaje: 'El campo Kilometraje está vacío' });
    } else if (isNaN(kilometraje) || kilometraje < 0) {
        errores.push({ mensaje: 'El kilometraje debe ser un número positivo' });
    }

    // Validación de Color
    if (!color || color.trim() === '') {
        errores.push({ mensaje: 'El campo Color está vacío' });
    } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(color.trim())) {
        errores.push({ mensaje: 'El campo Color solo puede contener letras y espacios' });
    }

    // Validación de Precio
    if (!precio) {
        errores.push({ mensaje: 'El campo Precio está vacío' });
    } else if (isNaN(precio) || precio <= 0) {
        errores.push({ mensaje: 'El precio debe ser un número mayor a cero' });
    }

    // Validación de Descripción
    if (!descripcion || descripcion.trim() === '') {
        errores.push({ mensaje: 'El campo Descripción está vacío' });
    } else if (descripcion.trim().length < 20) {
        errores.push({ mensaje: 'La descripción debe tener al menos 20 caracteres' });
    }

    // Validación de Accesorios (opcional)
    const accesoriosStr = Array.isArray(accesorios) ? accesorios.join(', ') : (accesorios || '');

    // Validación de la imagen (archivo)
    if (!req.file) {
        errores.push({ mensaje: 'Debe subir una imagen del vehículo' });
    } else {
        // Validar tipo de archivo 
        const tiposPermitidos = ['image/jpeg', 'image/png'];
        if (!tiposPermitidos.includes(req.file.mimetype)) {
            errores.push({ mensaje: 'El archivo debe ser una imagen (JPEG o PNG)' });
        }
    }

    if (errores.length > 0) {
        // Renderizar la vista con errores
        return res.render('vender', {
            title: 'Vender',
            errores: errores, 
            datos: req.body 
        });
    }

    try {
        // Calcular Precio de Venta
        const precioNumerico = parseFloat(precio);
     

        await modeloventas.create({
            NombreVendedor: nombre_vendedor,
            TelefonoVendedor: telefono_vendedor,
            Marca: marca,
            Modelo: modelo,
            Anio: anio,
            Tipo: tipo,
            Condicion: condicion,
            Transmision: transmision,
            Combustible: combustible,
            Kilometraje: kilometraje,   
            Color: color,
            Precio: precioNumerico,
            Descripcion: descripcion,
            Accesorios: accesoriosStr, 
            Imagen: req.file.filename 
        });

        return res.redirect('/vender')   

    } catch (error) {
        console.log("Error al guardar:", error);
        errores.push({ mensaje: 'Error al procesar la solicitud' });
        return res.render('vender', { 
            title: 'Vender',
            errores: errores,
            datos: req.body 
        });
    }  


        /*// Enviar a vista de éxito con SweetAlert
        return res.render('alerta', {
            title: 'Éxito',
            alerta: {
                tipo: 'success',
                mensaje: 'Vehículo registrado correctamente',
                redireccion: '/vender'
            }
        });*/
        
        // Redireccionar 
        return res.redirect('/vender')   

  
      /*catch (error) {
        console.error("Error al guardar:", error);
        return res.render('vender', {
            title: 'Vender',
            datos: req.body,
            alerta: {
                tipo: 'error',
                mensaje: 'Error al procesar la solicitud: ' + error.message,
                redireccion: 'back'
            }
        });
    }*/
}

module.exports = ventas;