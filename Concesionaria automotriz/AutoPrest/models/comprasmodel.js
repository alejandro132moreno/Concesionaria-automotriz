const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Venta = db.define('compras', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vehiculo_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comprador_nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    comprador_apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    comprador_telefono: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    comprador_correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            isEmail: true,
            notEmpty: true
        }
    },
    Marca: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Condicion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Transmision: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Combustible: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Kilometraje: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Color: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Imagen: {
        type: DataTypes.STRING(255)
    },
    Precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    Descripcion: {
        type: DataTypes.TEXT
    },
    Accesorios: {
        type: DataTypes.STRING
    },
    fecha_compra: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'compras',
    timestamps: true,
    paranoid: true,
    indexes: [
        {
            fields: ['vehiculo_id']
        },
        {
            fields: ['fecha_compra']
        }
    ]
});

module.exports = Venta;