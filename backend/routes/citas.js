const express = require('express');
const router = express.Router();

// Crear una nueva cita
router.post('/add', (req, res) => {
    const { fecha, hora, paciente_id } = req.body;

    const query = 'INSERT INTO citas (fecha, hora, paciente_id) VALUES (?, ?, ?)';
    req.db.query(query, [fecha, hora, paciente_id], (err, result) => {
        if (err) {
            console.error('Error al agregar cita:', err);
            return res.status(500).json({ error: 'Error al agregar cita' });
        }

        // Obtener los datos de la nueva cita
        const newAppointment = {
            id: result.insertId,
            fecha,
            hora,
            paciente_id
        };

        res.status(201).json(newAppointment);
    });
});

// Obtener una cita por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM citas WHERE id = ?';
    req.db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener cita:', err);
            return res.status(500).send('Error al obtener cita');
        }

        if (results.length === 0) {
            return res.status(404).send('Cita no encontrada');
        }

        res.json(results[0]);
    });
});

// Actualizar una cita por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { fecha, paciente_id, hora } = req.body;

    const query = 'UPDATE citas SET fecha = ?, paciente_id = ?, hora = ? WHERE id = ?';
    req.db.query(query, [fecha, paciente_id, hora, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar cita:', err);
            return res.status(500).send('Error al actualizar cita');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Cita no encontrada');
        }

        res.send('Cita actualizada exitosamente');
    });
});

// Eliminar una cita por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM citas WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar cita:', err);
            return res.status(500).send('Error al eliminar cita');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Cita no encontrada');
        }

        res.send('Cita eliminada exitosamente');
    });
});

router.get('/', (req, res) => {
    const { paciente_id } = req.query;

    const query = 'SELECT * FROM citas WHERE paciente_id = ?';
    req.db.query(query, [paciente_id], (err, results) => {
        if (err) {
            console.error('Error al obtener citas:', err);
            return res.status(500).send('Error al obtener citas');
        }

        res.json(results);
    });
});

module.exports = router;
