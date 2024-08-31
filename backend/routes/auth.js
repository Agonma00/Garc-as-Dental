const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    req.db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) return res.status(400).send('Error al registrar el usuario');
        res.status(201).send('Usuario registrado');
    });
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    req.db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
        if (err) return res.status(400).send('Error en la autenticación');

        const user = results[0];
        if (!user) return res.status(400).send('Usuario no encontrado');

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Contraseña incorrecta');

        // Crear un token JWT que incluya el tipo de usuario
        const token = jwt.sign(
            { username: user.username, tipo: user.tipo }, // Incluir 'tipo' en el payload
            'tu_secreto',
            { expiresIn: '1h' }
        );

        // Enviar el token y el tipo de usuario en la respuesta
        res.json({ token, tipo: user.tipo });
    });
});

module.exports = router;
