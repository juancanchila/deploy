const { Translate } = require('../../models');

// Crear traducción
const createTranslate = async (req, res) => {
    try {
        const { original, translated } = req.body;

        if (!original || !translated) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        const translate = await Translate.create({ original, translated });
        res.status(201).json(translate);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la traducción', error: error.message });
    }
};

// Obtener todas las traducciones
const getTranslates = async (req, res) => {
    try {
        const translates = await Translate.findAll();
        res.status(200).json(translates);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener traducciones', error: error.message });
    }
};

// Obtener traducción por ID
const getTranslateById = async (req, res) => {
    const { id } = req.params;
    try {
        const translate = await Translate.findByPk(id);
        if (!translate) {
            return res.status(404).json({ message: 'Traducción no encontrada' });
        }
        res.status(200).json(translate);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la traducción', error: error.message });
    }
};

// Actualizar traducción
const updateTranslate = async (req, res) => {
    const { id } = req.params;

    try {
        const translate = await Translate.findByPk(id);
        if (!translate) {
            return res.status(404).json({ message: 'Traducción no encontrada' });
        }

        const { original, translated } = req.body;
        await translate.update({ original, translated });

        res.status(200).json(translate);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la traducción', error: error.message });
    }
};

// Eliminar traducción
const deleteTranslate = async (req, res) => {
    const { id } = req.params;

    try {
        const translate = await Translate.findByPk(id);
        if (!translate) {
            return res.status(404).json({ message: 'Traducción no encontrada' });
        }

        await translate.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la traducción', error: error.message });
    }
};

module.exports = {
    createTranslate,
    getTranslates,
    getTranslateById,
    updateTranslate,
    deleteTranslate
};
