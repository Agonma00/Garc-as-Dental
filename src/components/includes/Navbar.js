import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function NavbarComponent({ handleLogout }) {
    return (
        <header className="topbar">
            <Navbar className="top-navbar navbar-expand-md navbar-light">
                <div className="navbar-header border-end">
                    <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="">
                        <i className="ti-menu ti-close"></i>
                    </a>
                    <Navbar.Brand href="">
                        <b className="logo-icon">
                            <img src="" height="35px" alt="" className="dark-logo"/>
                            <img src="" height="35px" alt="" className="light-logo"/>
                        </b>
                        <span className="logo-text">
                            <img src="" style={{ height: '25px', marginLeft: '5px' }} alt="" className="dark-logo"/>
                            <img src="" style={{ height: '25px', marginLeft: '5px' }} className=""/>
                        </span>
                    </Navbar.Brand>
                    <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="ti-more"></i>
                    </a>
                </div>
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className="me-auto">
                        <Nav.Item className="d-none d-md-block">
                            <Nav.Link className="sidebartoggler waves-effect waves-light" href="" data-sidebartype="mini-sidebar">
                                <i className="mdi mdi-menu fs-5"></i>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav>
                        <Nav.Item className="nav-item dropdown">
                            <Nav.Link className="dropdown-toggle waves-effect waves-dark" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="ms-2 font-weight-medium">Bienvenido, {localStorage.getItem('username').charAt(0).toUpperCase() + localStorage.getItem('username').slice(1)}</span><span className="fas fa-angle-down ms-2"></span>
                            </Nav.Link>
                            <div className="dropdown-menu dropdown-menu-end user-dd animated flipInY">
                                <Button className="dropdown-item text-black" onClick={handleLogout}>
                                    <i data-feather="log-out" className="feather-sm text-danger me-1 ms-1"></i> Cerrar Sesion
                                </Button>
                            </div>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default NavbarComponent;
