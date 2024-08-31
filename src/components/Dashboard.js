import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Footer from './includes/Footer';

function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [newPaciente, setNewPaciente] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: '',
    });
    const [patientToDelete, setPatientToDelete] = useState(null); // Paciente a eliminar
    const [userType, setUserType] = useState(null); // Tipo de usuario

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tipo = localStorage.getItem('tipo');

        if (token) {
            setIsAuthenticated(true);
            setUserType(tipo);
            fetchPacientes();
        } else {
            window.location.href = '/login';
        }
    }, [navigate]);

    const fetchPacientes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/pacientes/');
            const data = await response.json();
            setPacientes(data);
        } catch (error) {
            console.error("Error al obtener pacientes:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('tipo');
        window.location.href = '/login';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPaciente({ ...newPaciente, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/pacientes/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPaciente),
            });

            if (response.ok) {
                fetchPacientes(); // Actualizar la lista de pacientes
                setShowModal(false); // Cerrar el modal
                setNewPaciente({ nombre: '', apellidos: '', email: '', telefono: '' }); // Limpiar el formulario
            }
        } catch (error) {
            console.error("Error al añadir paciente:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/pacientes/${patientToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchPacientes(); // Actualizar la lista de pacientes
                setShowConfirmDeleteModal(false); // Cerrar el modal de confirmación
                setPatientToDelete(null); // Limpiar el paciente a eliminar
            }
        } catch (error) {
            console.error("Error al eliminar paciente:", error);
        }
    };

    const openConfirmDeleteModal = (id) => {
        setPatientToDelete(id);
        setShowConfirmDeleteModal(true);
    };

    if (!isAuthenticated) {
        return null; // O un mensaje de carga si prefieres
    }

    const backgroundStyle = {
        backgroundImage: 'url("https://www.latevaweb.com/diseno-web/clinica-dental.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
    };

    return (
        <div id="main-wrapper">
            <NavbarComponent handleLogout={handleLogout} />
            <Sidebar handleLogout={handleLogout} />
            <div className="page-wrapper" style={backgroundStyle}>
                <div className="page-breadcrumb border-bottom">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-xs-12 justify-content-start d-flex align-items-center">
                            <h5 className="font-weight-medium text-uppercase text-white mb-0">
                                PACIENTES
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="page-content container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    {/* Mostrar botón "Añadir Paciente" solo si el tipo es 2 o 3 */}
                                    {userType === '2' || userType === '3' ? (
                                        <Button variant="success" onClick={() => setShowModal(true)}>
                                            Añadir Paciente
                                        </Button>
                                    ) : null}

                                    <Table responsive className="mt-3">
                                        <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellidos</th>
                                            <th>Email</th>
                                            <th>Teléfono</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {pacientes.map((paciente, index) => (
                                            <tr key={index}>
                                                <td>{paciente.nombre}</td>
                                                <td>{paciente.apellidos}</td>
                                                <td>{paciente.email}</td>
                                                <td>{paciente.telefono}</td>
                                                <td>
                                                    <Button
                                                        variant="info"
                                                        className="me-2"
                                                        onClick={() => window.location.href = `/paciente/${paciente.id}`}
                                                    >
                                                        <i className="fa fa-eye"></i>
                                                    </Button>
                                                    {/* Mostrar botones de eliminar solo si el tipo es 2 o 3 */}
                                                    {userType === '2' || userType === '3' ? (
                                                        <Button
                                                            variant="danger"
                                                            onClick={() => openConfirmDeleteModal(paciente.id)}
                                                        >
                                                            <i className="fa fa-trash-alt"></i>
                                                        </Button>
                                                    ) : null}
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
                <Footer />
            </div>

            {/* Modal para añadir pacientes */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Paciente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Introduce el nombre"
                                name="nombre"
                                value={newPaciente.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formApellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Introduce los apellidos"
                                name="apellidos"
                                value={newPaciente.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Introduce el email"
                                name="email"
                                value={newPaciente.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Introduce el teléfono"
                                name="telefono"
                                value={newPaciente.telefono}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Añadir
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal de confirmación para eliminar pacientes */}
            <Modal show={showConfirmDeleteModal} onHide={() => setShowConfirmDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que quieres eliminar este paciente?
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

export default Dashboard;
