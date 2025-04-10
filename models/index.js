const { sequelize } = require("../config/db.config");


const Restaurante = require("./restaurante")(sequelize);
const Hamburguesa = require("./hamburguesa")(sequelize);
const Calificacion = require("./calificacion")(sequelize);

Restaurante.hasMany(Hamburguesa, {
    foreignKey: "restauranteId",
    sourceKey: "id",
    as: "hamburguesas"
});
Hamburguesa.belongsTo(Restaurante, {
    foreignKey: "restauranteId",
    as: "restaurante"
});

Hamburguesa.hasMany(Calificacion, {
    foreignKey: "hamburguesaId",
    sourceKey: "id",
    as: "calificaciones"
});
Calificacion.belongsTo(Hamburguesa, {
    foreignKey: "hamburguesaId",
    as: "hamburguesa"
});

module.exports = {
    Restaurante,
    Hamburguesa,
    Calificacion,
    sequelize,
    Sequelize: sequelize.Sequelize
};

