const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const pacientesRoutes = require('./routes/pacientes');
const citasRoutes = require('./routes/citas');
const usuariosRouter = require('./routes/usuarios');
const historialRoutes = require('./routes/historial');

const app = express();
const port = 5000;

// Configuración de middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'garciasdental'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL');
});

// Rutas
app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/pacientes', pacientesRoutes); // Usar rutas de pacientes
app.use('/api/citas', citasRoutes); // Usar rutas de pacientes
app.use('/api/usuarios', usuariosRouter);
app.use('/api/historial', historialRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
