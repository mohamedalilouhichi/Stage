import React, { Fragment, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './loginform.css';

function Menu() {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');

    const handleSignout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const tokenRequiredPages = ['index#about', 'index#services', 'index#plans', 'index#calendar'];

    if (tokenRequiredPages.includes(location.pathname + location.hash) && !token) {
        navigate('/');
    }

    return (
        <Fragment>
            <nav id="navbar" className="navbar navbar-expand-lg fixed-top navbar-dark" aria-label="Main navigation">
                <div className="container">
                    <h3> Offre n°180NCYQ</h3>
                    <button
                        className="navbar-toggler p-0 border-0"
                        type="button"
                        id="navbarSideCollapse"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ms-auto navbar-nav-scroll">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href={`/index?token=${token}`}>
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={`/index?token=${token}#about`}>
                                    Reports
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={`/index?token=${token}#services`}>
                                    Services
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={`/index?token=${token}#plans`}>
                                    Plans
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={`/index?token=${token}#calendar`}>
                                    Calendar
                                </a>
                            </li>
                            <li>
                                <Link className="dropdown-item" to={`/article?token=${token}`}>
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={(e) => {
                                    e.preventDefault();
                                    if (window.confirm("Are you sure you want to log out?")) {
                                        handleSignout();
                                    }
                                }}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                        <span className="nav-item social-icons">
                            <span className="fa-stack">
                                <a >
                                    <i className="fas fa-circle fa-stack-2x"></i>
                                    <i className="fab fa-facebook-f fa-stack-1x"></i>
                                </a>
                            </span>
                            <span className="fa-stack">
                                <a href="#your-link">
                                    <i className="fas fa-circle fa-stack-2x"></i>
                                    <i className="fab fa-twitter fa-stack-1x"></i>
                                </a>
                            </span>
                        </span>
                    </div>
                </div>
            </nav>
        </Fragment>
    );
}

export default Menu;