const sequelize = require('sequelize')

const db = new sequelize('autoprest', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false,
    define: {
        timestamps: false
    }
});

module.exports = db;