const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Hamburguesa = sequelize.define('Hamburguesa', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: DataTypes.TEXT
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING
        },
        calificacionPromedio: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        restauranteId: {  
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Hamburguesa;
};
