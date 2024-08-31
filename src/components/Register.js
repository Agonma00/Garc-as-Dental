import React, { useState } from 'react';
import { Form, Button, Image, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from './logo.jpeg'; // Asegúrate de colocar tu logo en la carpeta 'src'

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Resetear el estado del error
        setSuccess(null); // Resetear el estado del éxito

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            setSuccess('Usuario registrado correctamente');
            setTimeout(() => {
                window.location.href = '/login'; // Redirigir a la página de inicio de sesión después de 3 segundos
            }, 3000);
        } else {
            const errorText = await response.text();
            setError(errorText || 'Error al registrar');
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
                    <div className="logo text-center mb-4">
                        <Image src={logo} alt="Logo" style={{ width: '150px' }} fluid />
                        <h3 className="box-title mb-3">Registro</h3>
                    </div>
                    {success && <Alert variant="success">{success}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} className="form-horizontal mt-3 form-material">
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Introduce tu usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Introduce tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="success"
                            type="submit"
                            className="w-100 mb-3"
                            style={{ borderRadius: '60px' }}
                        >
                            Registrar
                        </Button>
                        <Link to="/login" className="btn btn-danger w-100">
                            Iniciar Sesión
                        </Link>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Register;
