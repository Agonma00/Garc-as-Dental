const express = require('express');
const router = express.Router();

// Crear un nuevo registro de historial
router.post('/add', (req, res) => {
    const { paciente_id, informacion, antecedentes, tratamientos_pasados, diagnostico, tratamientos } = req.body;

    const query = `
        INSERT INTO historial (paciente_id, informacion, antecedentes, tratamientos_pasados, diagnostico, tratamientos)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    req.db.query(query, [paciente_id, informacion, antecedentes, tratamientos_pasados, diagnostico, tratamientos], (err, result) => {
        if (err) {
            console.error('Error al agregar historial:', err);
            return res.status(500).send('Error al agregar historial');
        }
        const newHistorial = {
            id: result.insertId,
            paciente_id,
            informacion,
            antecedentes,
            tratamientos_pasados,
            diagnostico,
            tratamientos
        };

        res.status(201).json(newHistorial);
    });
});

// Obtener todos los registros de historial de un paciente por su ID
router.get('/', (req, res) => {
    const { paciente_id } = req.query;

    const query = 'SELECT * FROM historial WHERE paciente_id = ?';
    req.db.query(query, [paciente_id], (err, results) => {
        if (err) {
            console.error('Error al obtener historial:', err);
            return res.status(500).send('Error al obtener historial');
        }
        res.json(results);
    });
});

// Actualizar un registro de historial por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { informacion, antecedentes, tratamientos_pasados, diagnostico, tratamientos } = req.body;

    const query = `
        UPDATE historial
        SET informacion = ?, antecedentes = ?, tratamientos_pasados = ?, diagnostico = ?, tratamientos = ?
        WHERE id = ?
    `;
    req.db.query(query, [informacion, antecedentes, tratamientos_pasados, diagnostico, tratamientos, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar historial:', err);
            return res.status(500).send('Error al actualizar historial');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Historial no encontrado');
        }

        const updatedHistorial = {
            id,
            informacion,
            antecedentes,
            tratamientos_pasados,
            diagnostico,
            tratamientos
        };

        res.json(updatedHistorial);
    });
});

// Eliminar un registro de historial por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM historial WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar historial:', err);
            return res.status(500).send('Error al eliminar historial');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Historial no encontrado');
        }

        res.send('Historial eliminado exitosamente');
    });
});

module.exports = router;
