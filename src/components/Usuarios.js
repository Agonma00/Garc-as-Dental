import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import NavbarComponent from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Footer from './includes/Footer';

function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [newUsuario, setNewUsuario] = useState({
        username: '',
        password: '',
        tipo: '1', // Rol por defecto: recepcionista
    });
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    // Estado para manejar la edición
    const [showEditModal, setShowEditModal] = useState(false);
    const [editUsuario, setEditUsuario] = useState({
        id: '',
        username: '',
        tipo: '1',
    });



    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('tipo');
        window.location.href = '/login';
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/usuarios/');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUsuario({ ...newUsuario, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/usuarios/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUsuario),
            });

            if (response.ok) {
                fetchUsuarios();
                setShowModal(false);
                setNewUsuario({ username: '', password: '', tipo: '1' });
            }
        } catch (error) {
            console.error("Error al añadir usuario:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/usuarios/${userToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchUsuarios();
                setShowConfirmDeleteModal(false);
                setUserToDelete(null);
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    const openConfirmDeleteModal = (id) => {
        setUserToDelete(id);
        setShowConfirmDeleteModal(true);
    };

    // Funciones para manejar la edición
    const openEditModal = (usuario) => {
        setEditUsuario(usuario);
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditUsuario({ ...editUsuario, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/usuarios/${editUsuario.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tipo: editUsuario.tipo }),
            });

            if (response.ok) {
                fetchUsuarios();
                setShowEditModal(false);
            }
        } catch (error) {
            console.error("Error al editar el usuario:", error);
        }
    };

    const backgroundStyle = {
        backgroundImage: 'url("https://www.latevaweb.com/diseno-web/clinica-dental.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    return (
        <div id="main-wrapper">
            <NavbarComponent handleLogout={handleLogout}/>
            <Sidebar handleLogout={handleLogout}/>
            <div className="page-wrapper" style={backgroundStyle}>
                <div className="page-breadcrumb border-bottom">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-xs-12 justify-content-start d-flex align-items-center">
                            <h5 className="font-weight-medium text-uppercase text-white mb-0">
                                USUARIOS
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="page-content container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <Button variant="success" onClick={() => setShowModal(true)}>
                                        Añadir Usuario
                                    </Button>

                                    <Table responsive className="mt-3">
                                        <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {usuarios.map((usuario, index) => (
                                            <tr key={index}>
                                                <td>{usuario.username}</td>
                                                <td>{['Recepcionista', 'Personal Médico', 'Admin'][usuario.tipo - 1]}</td>
                                                <td>
                                                    <Button
                                                        variant="warning"
                                                        onClick={() => openEditModal(usuario)}
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </Button>
                                                    {' '}
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => openConfirmDeleteModal(usuario.id)}
                                                    >
                                                        <i className="fa fa-trash-alt"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>

            {/* Modal para añadir usuario */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Introduce el username"
                                name="username"
                                value={newUsuario.username}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Introduce la contraseña"
                                name="password"
                                value={newUsuario.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTipo">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select name="tipo" value={newUsuario.tipo} onChange={handleChange} required>
                                <option value="1">Recepcionista</option>
                                <option value="2">Personal Médico</option>
                                <option value="3">Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Añadir
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal para editar rol */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Rol de Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={editUsuario.username}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTipo">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select name="tipo" value={editUsuario.tipo} onChange={handleEditChange} required>
                                <option value="1">Recepcionista</option>
                                <option value="2">Personal Médico</option>
                                <option value="3">Admin</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Guardar Cambios
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal de confirmación para eliminar usuarios */}
            <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar este usuario?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmDeleteModal(false)}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Sí, eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Usuarios;
