import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavbarComponent from './includes/Navbar';
import Sidebar from './includes/Sidebar';
import Footer from './includes/Footer';

function PatientDetail() {
    const { id } = useParams(); // Obtenemos el ID del paciente desde la URL
    const [patient, setPatient] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        telefono: ''
    });
    const [appointments, setAppointments] = useState([]);
    const [appointmentFormData, setAppointmentFormData] = useState({
        fecha: '',
        hora: ''
    });
    const [historyRecords, setHistoryRecords] = useState([]);
    const [historyFormData, setHistoryFormData] = useState({
        informacion: '',
        antecedentes: '',
        tratamientos_pasados: '',
        diagnostico: '',
        tratamientos: ''
    });
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [editingHistoryId, setEditingHistoryId] = useState(null);
    const [userType, setUserType] = useState(null);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', options); // 'es-ES' para el formato d/m/Y
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('tipo');
        window.location.href = '/login';
    };

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/pacientes/${id}`);
                const data = await response.json();
                setPatient(data);
                setFormData({
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    email: data.email,
                    telefono: data.telefono
                });

                // Fetch appointments for this patient
                const appointmentsResponse = await fetch(`http://localhost:5000/api/citas?paciente_id=${id}`);
                const appointmentsData = await appointmentsResponse.json();
                setAppointments(appointmentsData);

                // Fetch history records for this patient
                const historyResponse = await fetch(`http://localhost:5000/api/historial?paciente_id=${id}`);
                const historyData = await historyResponse.json();
                setHistoryRecords(historyData);
            } catch (err) {
                console.error('Error al obtener datos:', err);
            }
        };

        fetchPatientData();
    }, [id]);

    useEffect(() => {
        const storedUserType = localStorage.getItem('tipo');
        setUserType(storedUserType);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAppointmentInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleHistoryInputChange = (e) => {
        const { name, value } = e.target;
        setHistoryFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/pacientes/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            setPatient(data);
        } catch (err) {
            console.error('Error al guardar los cambios:', err);
        }
    };

    const handleAddAppointment = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/citas/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...appointmentFormData, paciente_id: id }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();
            setAppointments(prevAppointments => [...prevAppointments, data]);
            setAppointmentFormData({ fecha: '', hora: '' });
            setShowAppointmentModal(false);
        } catch (err) {
            console.error('Error al agregar la cita:', err);
        }
    };

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            await fetch(`http://localhost:5000/api/citas/${appointmentId}`, {
                method: 'DELETE',
            });
            setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
        } catch (err) {
            console.error('Error al eliminar la cita:', err);
        }
    };

    const handleAddOrUpdateHistory = async () => {
        try {
            const method = editingHistoryId ? 'PUT' : 'POST';
            const url = editingHistoryId
                ? `http://localhost:5000/api/historial/${editingHistoryId}`
                : `http://localhost:5000/api/historial/add`;

            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...historyFormData, paciente_id: id }),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const data = await response.json();

            if (editingHistoryId) {
                setHistoryRecords(prevRecords =>
                    prevRecords.map(record => (record.id === editingHistoryId ? data : record))
                );
            } else {
                setHistoryRecords(prevRecords => [...prevRecords, data]);
            }

            setHistoryFormData({
                informacion: '',
                antecedentes: '',
                tratamientos_pasados: '',
                diagnostico: '',
                tratamientos: ''
            });
            setEditingHistoryId(null);
            setShowHistoryModal(false);
        } catch (err) {
            console.error('Error al agregar o actualizar el historial:', err);
        }
    };

    const handleEditHistory = (historyRecord) => {
        setHistoryFormData(historyRecord);
        setEditingHistoryId(historyRecord.id);
        setShowHistoryModal(true);
    };

    const handleDeleteHistory = async (historyId) => {
        try {
            await fetch(`http://localhost:5000/api/historial/${historyId}`, {
                method: 'DELETE',
            });
            setHistoryRecords(prevRecords => prevRecords.filter(record => record.id !== historyId));
        } catch (err) {
            console.error('Error al eliminar el historial:', err);
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
            <NavbarComponent handleLogout={handleLogout} />
            <Sidebar handleLogout={handleLogout} />
            <div className="page-wrapper" style={backgroundStyle}>
                <div className="page-breadcrumb border-bottom">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-xs-12 justify-content-start d-flex align-items-center">
                            <h5 className="font-weight-medium text-uppercase text-white mb-0">
                                Ficha del Paciente
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="page-content container-fluid">
                    <div className="row">
                        <div className="col-12 mb-2">
                            <div className="card">
                                <div className="card-body">
                                    <h3>Detalles del Paciente</h3>
                                    {patient && (
                                        <form>
                                            <div className="row">
                                                <div className="col-12 col-md-3 mb-3">
                                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="nombre"
                                                        name="nombre"
                                                        value={formData.nombre}
                                                        onChange={userType === '2' ? handleInputChange : undefined}
                                                        readOnly={userType !== '2'}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3 mb-3">
                                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="apellidos"
                                                        name="apellidos"
                                                        value={formData.apellidos}
                                                        onChange={userType === '2' ? handleInputChange : undefined}
                                                        readOnly={userType !== '2'}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3 mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={userType === '2' ? handleInputChange : undefined}
                                                        readOnly={userType !== '2'}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-3 mb-3">
                                                    <label htmlFor="telefono" className="form-label">Teléfono</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        id="telefono"
                                                        name="telefono"
                                                        value={formData.telefono}
                                                        onChange={userType === '2' ? handleInputChange : undefined}
                                                        readOnly={userType !== '2'}
                                                    />
                                                </div>
                                            </div>
                                            {userType === '2' && (
                                                <button type="button" className="btn btn-primary" onClick={handleSave}>
                                                    Guardar
                                                </button>
                                            )}
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-3 mb-2">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="mt-4">Citas del Paciente</h3>
                                            <table className="table table-striped mt-3">
                                                <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Hora</th>
                                                    <th>Acciones</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {appointments.map(appointment => (
                                                    <tr key={appointment.id}>
                                                        <td>{formatDate(appointment.fecha)}</td>
                                                        <td>{appointment.hora}</td>
                                                        <td>
                                                            {(userType === '1' || userType === '2') && (
                                                                <>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => handleDeleteAppointment(appointment.id)}
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            {(userType === '1' || userType === '2') && (
                                                <button className="btn btn-primary mt-3" onClick={() => setShowAppointmentModal(true)}>
                                                    Agregar Cita
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-md-9 mb-2">
                                    <div className="card">
                                        <div className="card-body">
                                            <h3 className="mt-4">Historial del Paciente</h3>
                                            <table className="table table-striped mt-3">
                                                <thead>
                                                <tr>
                                                    <th>Información</th>
                                                    <th>Antecedentes</th>
                                                    <th>Diagnóstico</th>
                                                    <th>Acciones</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {historyRecords.map(history => (
                                                    <tr key={history.id}>
                                                        <td>{history.informacion}</td>
                                                        <td>{history.antecedentes}</td>
                                                        <td>{history.diagnostico}</td>
                                                        <td>
                                                            {userType === '2' && (
                                                                <>
                                                                    <button
                                                                        className="btn btn-warning btn-sm me-1"
                                                                        onClick={() => handleEditHistory(history)}
                                                                    >
                                                                        Editar
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-danger btn-sm"
                                                                        onClick={() => handleDeleteHistory(history.id)}
                                                                    >
                                                                        Eliminar
                                                                    </button>
                                                                </>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            {userType !== '1' && (
                                                <button className="btn btn-primary mt-3" onClick={() => setShowHistoryModal(true)}>
                                                    Agregar Historial
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

            {/* Modal para agregar citas */}
            {(userType === '1' || userType === '2') && (
                <div className={`modal fade ${showAppointmentModal ? 'show' : ''}`} style={{ display: showAppointmentModal ? 'block' : 'none' }}
                     tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Cita</h5>
                                <button type="button" className="btn-close" onClick={() => setShowAppointmentModal(false)}>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-12 col-md-6 mb-3">
                                            <label htmlFor="fecha" className="form-label">Fecha</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="fecha"
                                                name="fecha"
                                                value={appointmentFormData.fecha}
                                                onChange={handleAppointmentInputChange}
                                            />
                                        </div>
                                        <div className="col-12 col-md-6 mb-3">
                                            <label htmlFor="hora" className="form-label">Hora</label>
                                            <input
                                                type="time"
                                                className="form-control"
                                                id="hora"
                                                name="hora"
                                                value={appointmentFormData.hora}
                                                onChange={handleAppointmentInputChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleAddAppointment}>
                                        Agregar Cita
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para agregar o editar historial */}
            {(userType === '1' || userType === '2') && (
                <div className={`modal fade ${showHistoryModal ? 'show' : ''}`} style={{ display: showHistoryModal ? 'block' : 'none' }}
                     tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editingHistoryId ? 'Editar Historial' : 'Agregar Historial'}</h5>
                                <button type="button" className="btn-close" onClick={() => setShowHistoryModal(false)}>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label htmlFor="informacion" className="form-label">Información</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="informacion"
                                                name="informacion"
                                                value={historyFormData.informacion}
                                                onChange={handleHistoryInputChange}
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="antecedentes" className="form-label">Antecedentes</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="antecedentes"
                                                name="antecedentes"
                                                value={historyFormData.antecedentes}
                                                onChange={handleHistoryInputChange}
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="tratamientos_pasados" className="form-label">Tratamientos Pasados</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tratamientos_pasados"
                                                name="tratamientos_pasados"
                                                value={historyFormData.tratamientos_pasados}
                                                onChange={handleHistoryInputChange}
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="diagnostico" className="form-label">Diagnóstico</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="diagnostico"
                                                name="diagnostico"
                                                value={historyFormData.diagnostico}
                                                onChange={handleHistoryInputChange}
                                            />
                                        </div>
                                        <div className="col-12 mb-3">
                                            <label htmlFor="tratamientos" className="form-label">Tratamientos</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="tratamientos"
                                                name="tratamientos"
                                                value={historyFormData.tratamientos}
                                                onChange={handleHistoryInputChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="button" className="btn btn-primary" onClick={handleAddOrUpdateHistory}>
                                        {editingHistoryId ? 'Actualizar Historial' : 'Agregar Historial'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PatientDetail;
