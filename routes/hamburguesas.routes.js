module.exports = (app) => {
    const router = require('express').Router();
    const controller = require('../controllers/hamburguesa.controller.js');

    router.get("/", controller.getHamburguesasList);

    router.get("/crear/:restauranteId", controller.getHamburguesaCreate);

    router.get("/crear", controller.getHamburguesaCreate);
    router.post("/crear", controller.postHamburguesaCreate);

    router.get("/:id/editar", controller.getHamburguesaUpdate);
    router.post("/:id/editar", controller.postHamburguesaUpdate);

    router.post("/:id/eliminar", controller.deleteHamburguesa);

    router.get('/restaurante/:restauranteId', controller.getHamburguesasByRestaurante);
    router.get('/:id/calificaciones', controller.mostrarCalificaciones);

    app.use('/admin/hamburguesas', router);
}