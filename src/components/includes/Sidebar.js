import React from 'react';
import { Link } from "react-router-dom";

function Sidebar({ handleLogout }) {
    const userType = localStorage.getItem('tipo'); // Obtener el tipo de usuario desde localStorage

    return (
        <aside className="left-sidebar">
            <div className="scroll-sidebar">
                <nav className="sidebar-nav">
                    <ul id="sidebarnav">
                        <li className="sidebar-item" id="tab-inicio">
                            <a id="tab-inicio-a" className="sidebar-link waves-effect waves-dark sidebar-link" href="/dashboard" aria-expanded="false">
                                <i className="mdi mdi-account-multiple"></i>
                                <span className="hide-menu">Pacientes</span>
                            </a>
                        </li>

                        {/* Mostrar el enlace de usuarios solo si el tipo de usuario es admin (3) */}
                        {userType !== '1' && (
                            <li className="sidebar-item" id="tab-usuarios">
                                <a id="tab-usuarios-a" className="sidebar-link waves-effect waves-dark sidebar-link" href="/usuarios" aria-expanded="false">
                                    <i className="mdi mdi-account"></i>
                                    <span className="hide-menu">Usuarios</span>
                                </a>
                            </li>
                        )}

                        <div className="devider"></div>

                        <li className="sidebar-item">
                            <a className="sidebar-link waves-effect waves-dark sidebar-link" onClick={handleLogout} aria-expanded="false">
                                <i className="mdi mdi-adjust text-danger"></i>
                                <span className="hide-menu">Cerrar Sesión</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
