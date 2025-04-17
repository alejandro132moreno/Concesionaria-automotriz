const sequelize = require('sequelize');
const db = require('../config/db');

const modeloventas = db.define('ventas', {
    NombreVendedor: {
        type: sequelize.STRING(100),
        allowNull: false
    },
    TelefonoVendedor: {
        type: sequelize.STRING(20),
        allowNull: false,
        validate: {
            len: [10, 20] 
        }
    },
    Marca: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Modelo: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Anio: {
        type: sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1900,
            max: new Date().getFullYear() + 1
        }
    },
    Tipo: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Condicion: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Transmision: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Combustible: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Kilometraje: {
        type: sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    Color: {
        type: sequelize.STRING(50),
        allowNull: false
    },
    Imagen: {
        type: sequelize.STRING(255),
        allowNull: false
    },
    Precio: {
        type: sequelize.DECIMAL(10, 2), 
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    Descripcion: {
        type: sequelize.TEXT, 
        allowNull: false
    },
    Accesorios: {
        type: sequelize.TEXT, 
        allowNull: true 
    },
    
    Estado: {
        type: sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'pendiente',
        validate: {
            isIn: [['pendiente', 'aprobado', 'rechazado']]
        }
    }
}, {
    timestamps: true,
    paranoid: true
});

module.exports = modeloventas;
