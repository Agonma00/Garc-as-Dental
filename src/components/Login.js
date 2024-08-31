import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.jpeg'; // Asegúrate de colocar tu logo en la carpeta 'src'

function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Recuperar datos guardados en localStorage si están presentes
        const storedUsername = localStorage.getItem('usernamer');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe') === 'true';

        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedPassword) {
            setPassword(storedPassword);
        }
        setRememberMe(storedRememberMe);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Resetear el estado del error

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (data.token) {
            console.log(data)
            setToken(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);
            localStorage.setItem('tipo', data.tipo);

            // Guardar las credenciales si el usuario selecciona "Recuérdame"
            if (rememberMe) {
                localStorage.setItem('usernamer', username);
                localStorage.setItem('password', password);
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('usernamer');
                localStorage.removeItem('password');
                localStorage.removeItem('rememberMe');
            }
            window.location.href = '/dashboard';
        } else {
            setError('Error al iniciar sesión'); // Manejar el error
        }
    };

    const backgroundStyle = {
        backgroundImage: 'url("https://ruanopoliclinicadental.com/wp-content/uploads/2019/07/razones-para-acudir-a-Ruano_2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
    };

    return (
        <div className="main-wrapper" style={backgroundStyle}>
            <div className="auth-wrapper d-flex no-block justify-content-center align-items-center min-vh-100">
                <div className="auth-box p-4 bg-white rounded" style={{ borderRadius: '30px' }}>
                    <div id="loginform">
                        <div className="logo text-center mb-4">
                            <img src={logo} alt="Logo" style={{ width: '150px' }} />
                            <h3 className="box-title mb-3">Inicia Sesión</h3>
                        </div>
                        {/* Form */}
                        <Form onSubmit={handleSubmit} className="form-horizontal mt-3 form-material">
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form.Group className="mb-3">
                                <Form.Control
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    placeholder="Usuario"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="d-flex mb-4 align-items-center">
                                <Form.Check
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="me-2"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    label="Recuérdame"
                                />
                            </Form.Group>
                            <Button
                                variant="info"
                                type="submit"
                                className="d-block w-100 mb-3"
                                style={{ borderRadius: '60px' }}
                            >
                                Inicia Sesión
                            </Button>
                            <Link to="/register" className="btn btn-danger d-block w-100">
                                Regístrate aquí
                            </Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
