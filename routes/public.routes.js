module.exports = (app) => {
    const router = require('express').Router();
    const controller = require('../controllers/public.controller.js');

    router.get("/", controller.listaRestaurantes);

    router.get("/restaurantes/:id/hamburguesas", controller.listaHamburguesasPorRestaurante);

    router.get("/hamburguesa/:id", controller.detalleHamburguesa);

    router.post("/hamburguesa/:id/calificar", controller.calificarHamburguesa);

    app.use('/', router);
}   

