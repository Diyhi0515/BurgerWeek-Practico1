module.exports = (app) => {
    const router = require('express').Router();
    const controller = require('../controllers/restaurantes.controller.js');


    router.get("/", controller.getRestaurantesList);


    router.get("/crear", controller.getRestauranteCreate);
    router.post("/crear", controller.postRestauranteCreate);


    router.get("/:id/editar", controller.getRestauranteUpdate);
    router.post("/:id/editar", controller.postRestauranteUpdate);

    router.post("/:id/eliminar", controller.deleteRestaurante);

    app.use('/admin/restaurantes', router);
};
