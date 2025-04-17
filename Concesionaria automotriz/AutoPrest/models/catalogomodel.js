const { DataTypes } = require('sequelize');
const db = require('../config/db'); 

const Catalogo = db.define('Catalogo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Marca: DataTypes.STRING(50),
    Modelo: DataTypes.STRING(50),
    Anio: DataTypes.INTEGER,
    Tipo: DataTypes.STRING(50),
    Condicion: DataTypes.STRING(50),
    Transmision: DataTypes.STRING(50),
    Combustible: DataTypes.STRING(50),
    Kilometraje: DataTypes.INTEGER,
    Color: DataTypes.STRING(50),
    Imagen: DataTypes.STRING(255),
    Precio: DataTypes.INTEGER,
    PrecioVenta: DataTypes.INTEGER,
    Descripcion: DataTypes.STRING(255),
    NombreVendedor: {
        type: DataTypes.STRING(100),
        allowNull: true 
    },
    TelefonoVendedor: {
        type: DataTypes.STRING(20),
        allowNull: true 
    }
}, {
    tableName: 'catalogo',
    timestamps: false
});

module.exports = Catalogo;