const express = require('express');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas
const router = express.Router();

// Crear un nuevo usuario
router.post('/add', async (req, res) => {
    const { username, password, tipo } = req.body;

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO usuarios (username, password, tipo) VALUES (?, ?, ?)';
    req.db.query(query, [username, hashedPassword, tipo], (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            return res.status(500).send('Error al agregar usuario');
        }
        res.status(201).send('Usuario agregado exitosamente');
    });
});

// Obtener todos los usuarios
router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios';
    req.db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).send('Error al obtener usuarios');
        }
        res.json(results);
    });
});

// Obtener un usuario por ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'SELECT * FROM usuarios WHERE id = ?';
    req.db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener usuario:', err);
            return res.status(500).send('Error al obtener usuario');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.json(results[0]);
    });
});

// Actualizar un usuario por ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tipo } = req.body;

    if (!tipo) {
        return res.status(400).send('El campo "tipo" es obligatorio');
    }

    req.db.query(
        'UPDATE usuarios SET tipo = ? WHERE id = ?',
        [tipo, id],
        (err, result) => {
            if (err) return res.status(400).send('Error al actualizar el rol del usuario');
            res.send('Rol del usuario actualizado');
        }
    );
});

// Eliminar un usuario por ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM usuarios WHERE id = ?';
    req.db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).send('Error al eliminar usuario');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.send('Usuario eliminado exitosamente');
    });
});

module.exports = router;
