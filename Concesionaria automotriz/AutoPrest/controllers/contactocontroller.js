const modelocontacto = require('../models/contactomodel'); 
const registrar = async (req,res)=>{
    console.log(req.body)
    const{servicio, nombre, mensaje} = req.body

    var errores = []
  
    //Campo del nombre:
    if (nombre.trim() === '') {
        errores.push({ mensaje: 'El campo Nombre está vacío' });
    } 
    else if (!/^[A-Za-z\s]+$/.test(nombre.trim())) {
        errores.push({ mensaje: 'El campo Nombre solo puede contener letras y espacios' });
    }

    // Validación de Descripción
    if (!mensaje || mensaje.trim() === '') {
        errores.push({ mensaje: 'El campo Descripción está vacío' });
    } else if (mensaje.trim().length < 20) {
        errores.push({ mensaje: 'La descripción debe tener al menos 20 caracteres' });
    }

   
    if (errores.length) {
        //Manda los errores en caso de que aparezcan
        res.render('contacto',  {
            title: 'Contacto',
            errores: errores 
        })
    }
    else{
        try { 
            await modelocontacto.create({
                Servicio: servicio,
                Nombre: nombre,
                Mensaje: mensaje
            })

            // Redireccionar 
            return res.redirect('/contacto');

        } catch (error) {
            console.log("Error", error)
        }
    }
}

module.exports = registrar