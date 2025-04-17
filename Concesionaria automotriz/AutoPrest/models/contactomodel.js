const sequelize = require('sequelize')
const db = require('../config/db')

const modelocontacto = db.define('contacto', {
    Servicio:{
        type:sequelize.STRING(50)
    },
    Nombre:{
        type:sequelize.STRING(50)
    },
    Mensaje:{
        type:sequelize.STRING(50)
    }
}, {
    tableName: 'contacto', 
})

module.exports = modelocontacto


