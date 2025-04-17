const sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = db.define('usuarios', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,  // Valida que sea un correo electrónico
            notEmpty: true  // Asegura que no esté vacío
        }
    },
    pass: {
        type: sequelize.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true  // Asegura que la contraseña no esté vacía
        }
    },
    rol: {
        type: sequelize.ENUM('admin', 'cliente', 'gerente'),
     defaultValue: 'cliente',
        allowNull: false,
        validate: {
            isIn: [['admin', 'cliente', 'gerente']]  // Asegura que el rol sea uno de los valores permitidos
        }
    }
});

// Opcionalmente, puedes agregar un hook para asegurar que el email sea único
Usuario.beforeCreate(async (usuario, options) => {
    const existeUsuario = await Usuario.findOne({ where: { email: usuario.email } });
    if (existeUsuario) {
        throw new Error('El correo electrónico ya está registrado');
    }
    
   
},{
    tableName: 'usuarios', 
});

module.exports = Usuario;
