// models/GerenteModel.js
const sequelize = require('sequelize');
const db = require('../config/db');
const Usuario = require('./Usuariomodel');

const Gerente = db.define('Gerente', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    porcentajeComision: {
        type: sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.05 // 5% por defecto
    }
});

module.exports = Gerente;
