/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const fs = require('fs');
const path = require('path');
const db = require('../models'); 
const Restaurante = db.Restaurante;

exports.getRestaurantesList = async (req, res) => {
    try {
        const restaurantes = await Restaurante.findAll();
        res.render('pages/restaurantes/list', { restaurantes });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los restaurantes.');
    }
};

exports.getRestauranteCreate = (req, res) => {
    res.render('pages/restaurantes/form', { restaurante: null });
};

exports.postRestauranteCreate = async (req, res) => {
    const { nombre } = req.body;
    let logoPath = null;

    if (req.files && req.files.logo) {
        const logo = req.files.logo;
        logoPath = '/images/logos/' + Date.now() + '-' + logo.name;
        const savePath = path.join(__dirname, '..', 'public', logoPath);

        const dir = path.dirname(savePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        logo.mv(savePath, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error al mover el archivo.');
            }

            try {
                await Restaurante.create({ nombre, logo: logoPath });
                res.redirect('/admin/restaurantes');
            } catch (error) {
                console.error(error);
                res.status(500).send('Error al crear el restaurante.');
            }
        });
    } else {
        try {
            await Restaurante.create({ nombre, logo: logoPath });
            res.redirect('/admin/restaurantes');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al crear el restaurante.');
        }
    }
};



exports.getRestauranteUpdate = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) return res.redirect('/admin/restaurantes');
        res.render('pages/restaurantes/form', { restaurante });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el restaurante.');
    }
};

exports.postRestauranteUpdate = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) return res.redirect('/admin/restaurantes');

        let logoPath = restaurante.logo;

        if (req.files && req.files.logo) {
            const logo = req.files.logo;
            logoPath = '/images/logos/' + Date.now() + '-' + logo.name;
            const savePath = path.join(__dirname, '..', 'public', logoPath);

            const dir = path.dirname(savePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            logo.mv(savePath, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error al mover el archivo.');
                }

                restaurante.nombre = nombre;
                restaurante.logo = logoPath;
                await restaurante.save();

                res.redirect('/admin/restaurantes');
            });
        } else {
            restaurante.nombre = nombre;
            restaurante.logo = logoPath;
            await restaurante.save();

            res.redirect('/admin/restaurantes');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar el restaurante.');
    }
};



exports.deleteRestaurante = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurante = await Restaurante.findByPk(id);
        if (!restaurante) return res.redirect('/admin/restaurantes');

        
        if (restaurante.logo) {
            const logoPath = path.join(__dirname, '..', 'public', restaurante.logo);
        }

        await restaurante.destroy();
        res.redirect('/admin/restaurantes');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar el restaurante.');
    }
};
