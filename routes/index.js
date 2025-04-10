module.exports = (app) => {
    require('./restaurantes.routes')(app);
    require('./hamburguesas.routes')(app);
    require('./public.routes')(app);
    
}