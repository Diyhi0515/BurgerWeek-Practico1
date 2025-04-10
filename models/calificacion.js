const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    const Calificacion = sequelize.define('Calificacion', {
        puntaje: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        probado: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        hamburguesaId: { 
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Calificacion;
};
