const { Restaurante, Hamburguesa, Calificacion } = require('../models');

exports.listaRestaurantes = async (req, res) => {
  const restaurantes = await Restaurante.findAll();
  res.render('pages/public/restaurantes', { restaurantes });
};

exports.listaHamburguesasPorRestaurante = async (req, res) => {
  const restaurante = await Restaurante.findByPk(req.params.id, {
    include: ['hamburguesas']
  });
  res.render('pages/public/hamburguesas', { restaurante });
};

exports.detalleHamburguesa = async (req, res) => {
  const hamburguesa = await Hamburguesa.findByPk(req.params.id, {
    include: ['restaurante']
  });
  res.render('pages/public/detalleHamburguesa', { hamburguesa });
};

exports.calificarHamburguesa = async (req, res) => {
    const { calificacion, probado } = req.body;
    if (!calificacion) {
      return res.status(400).send('Calificación es requerida');
    }
    if (isNaN(calificacion) || calificacion < 1 || calificacion > 5) {
      return res.status(400).send('Calificación debe ser un número entre 1 y 5');
    }

    await Calificacion.create({
      hamburguesaId: req.params.id,
      puntaje: parseInt(calificacion),
      probado: probado === 'on'
    });
  
    const calificaciones = await Calificacion.findAll({
      where: { hamburguesaId: req.params.id }
    });
  

    const promedio = calificaciones.reduce((sum, c) => sum + c.puntaje, 0) / calificaciones.length;
  

    await Hamburguesa.update(
      { calificacionPromedio: promedio },
      { where: { id: req.params.id } }
    );
  
    res.redirect(`/hamburguesa/${req.params.id}`);
  };
  