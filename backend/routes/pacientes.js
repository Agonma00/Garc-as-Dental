const express = require('express');
const router = express.Router();

// Crear un nuevo paciente
router.post('/add', (req, res) => {
    const { nombre, apellidos, email, telefono } = req.body;

    const query = 'INSERT INTO pacientes (nombre, apellidos, email, telefono) VALUES (?, ?, ?, ?)';
    req.db.query(query, [nombre, apellidos, email, telefono], (err, result) => {
        if (err) {
            console.error('Error al agregar paciente:', err);
            return res.status(500).send('Error al agregar paciente');
        }
        res.status(201).send('Paciente agregado exitosamente');
    });
});

// Obtener todos los pacientes
router.get('/', (req, res) => {
    const query = 'SELECT * FROM pacientes';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener pacientes:', err);
            return res.status(500).send('Error al obtener pacientes');
        }
        res.json(results);
    });
});

// Obtener un paciente por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM pacientes WHERE id = ?';
    req.db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener paciente:', err);
            return res.status(500).send('Error al obtener paciente');
        }

        if (results.length === 0) {
            return res.status(404).send('Paciente no encontrado');
        }

        res.json(results[0]);
    });
});

// Actualizar un paciente por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellidos, email, telefono } = req.body;

    const query = 'UPDATE pacientes SET nombre = ?, apellidos = ?, email = ?, telefono = ? WHERE id = ?';
    req.db.query(query, [nombre, apellidos, email, telefono, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar paciente:', err);
            return res.status(500).send('Error al actualizar paciente');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Paciente no encontrado');
        }

        res.send('Paciente actualizado exitosamente');
    });
});

// Eliminar un paciente por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM pacientes WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar paciente:', err);
            return res.status(500).send('Error al eliminar paciente');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Paciente no encontrado');
        }

        res.send('Paciente eliminado exitosamente');
    });
});

module.exports = router;
