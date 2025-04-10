/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const db = require('../models');
const Hamburguesa = db.Hamburguesa;
const Restaurante = db.Restaurante;
const Calificacion = db.Calificacion;


exports.getHamburguesasList = async (req, res) => {
    try {
        const hamburguesas = await Hamburguesa.findAll({
            include: [
              { model: Restaurante, as: 'restaurante' }
            ],
            order: [['id', 'ASC']]
          });
        
        const restauranteId = null;
          

        res.render('pages/hamburguesas/list', { hamburguesas , restauranteId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las hamburguesas.');
    }
};


exports.getHamburguesaCreate = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        const restauranteId = parseInt(req.params.restauranteId) || null;
        res.render('pages/hamburguesas/form', { hamburguesa: null, restaurantes, preselectRestauranteId: restauranteId || null  });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al cargar el formulario.');
    }
};


exports.postHamburguesaCreate = async (req, res) => {
    const { nombre, descripcion, precio, restauranteId } = req.body;
    let fotoPath = null;

    try {
        if (req.files && req.files.foto) {
            const foto = req.files.foto;
            fotoPath = '/images/hamburguesas/' + Date.now() + '-' + foto.name;
            const savePath = path.join(__dirname, '..', 'public', fotoPath);

            const dir = path.dirname(savePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            await foto.mv(savePath);
        }

        await Hamburguesa.create({
            nombre,
            descripcion,
            precio,
            foto: fotoPath,
            restauranteId,
        });

        res.redirect('/admin/hamburguesas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear la hamburguesa.');
    }
};


exports.getHamburguesaUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const hamburguesa = await Hamburguesa.findByPk(id);
        const restaurantes = await Restaurante.findAll();

        if (!hamburguesa) return res.redirect('/admin/hamburguesas');

        res.render('pages/hamburguesas/form', { hamburguesa, restaurantes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener la hamburguesa.');
    }
};


exports.postHamburguesaUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, restauranteId } = req.body;

    try {
        const hamburguesa = await Hamburguesa.findByPk(id);
        if (!hamburguesa) return res.redirect('/admin/hamburguesas');

        let fotoPath = hamburguesa.foto;

        if (req.files && req.files.foto) {
            const foto = req.files.foto;
            fotoPath = '/images/hamburguesas/' + Date.now() + '-' + foto.name;
            const savePath = path.join(__dirname, '..', 'public', fotoPath);

            const dir = path.dirname(savePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            await foto.mv(savePath);
        }

        hamburguesa.nombre = nombre;
        hamburguesa.descripcion = descripcion;
        hamburguesa.precio = precio;
        hamburguesa.foto = fotoPath;
        hamburguesa.restauranteId = restauranteId;

        await hamburguesa.save();

        res.redirect('/admin/hamburguesas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar la hamburguesa.');
    }
};


exports.deleteHamburguesa = async (req, res) => {
    const { id } = req.params;
    try {
        const hamburguesa = await Hamburguesa.findByPk(id);
        if (!hamburguesa) return res.redirect('/admin/hamburguesas');

        /*
        if (hamburguesa.foto) {
            const fotoPath = path.join(__dirname, '..', 'public', hamburguesa.foto);
            if (fs.existsSync(fotoPath)) {
                fs.unlinkSync(fotoPath);
            }
        }
        */

        await hamburguesa.destroy();
        res.redirect('/admin/hamburguesas');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar la hamburguesa.');
    }
};

exports.getHamburguesasByRestaurante = async (req, res) => {
    const { restauranteId } = req.params;

    try {
        const hamburguesas = await Hamburguesa.findAll({
            where: { restauranteId },
            include: [
                { model: Restaurante, as: 'restaurante' }
              ],
            order: [['id', 'ASC']]
            
        });
        res.render('pages/hamburguesas/list', { hamburguesas, restauranteId  });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las hamburguesas');
    }
};


exports.mostrarCalificaciones = async (req, res) => {
    const { id } = req.params;
    try {
        const hamburguesa = await Hamburguesa.findByPk(id, {
            include: [{ model: Calificacion, as: 'calificaciones' }]
        });

        if (!hamburguesa) return res.status(404).send('Hamburguesa no encontrada');

        res.render('pages/hamburguesas/calificaciones', { hamburguesa });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener las calificaciones');
    }
};
