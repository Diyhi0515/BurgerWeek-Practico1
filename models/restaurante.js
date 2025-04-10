const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Restaurante = sequelize.define('Restaurante', {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo: {
            type: DataTypes.STRING
        }
    });
    return Restaurante;
};
