// crearAdmin.js
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const Usuario = require('./models/Usuariomodel');

const crearAdmin = async () => {
    try {
        await db.sync(); // Asegura que las tablas existan

        const existe = await Usuario.findOne({ where: { email: 'admin@admin.com' } });
        if (existe) {
            console.log('Ya existe un administrador con ese correo');
            return;
        }

        const hashedPass = await bcrypt.hash('admin123', 10); // Puedes cambiar la contraseña
        await Usuario.create({
            nombre: 'Administrador',
            email: 'admin@admin.com',
            pass: hashedPass,
            rol: 'admin'
        });

        console.log('Administrador creado con éxito ✅');
    } catch (error) {
        console.error('Error al crear el admin:', error);
    } finally {
        process.exit(); // Cierra el proceso
    }
};

crearAdmin();
