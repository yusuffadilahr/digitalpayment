import React from 'react';
import Logo from '../../assets/Logo.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand me-2" href='/dashboard'>
                    <img
                        src={Logo}
                        height="30"
                        alt="MDB Logo"
                        loading="lazy"
                        style={{ marginTop: '-1px' }}
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarButtonsExample"
                    aria-controls="navbarButtonsExample"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarButtonsExample">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/profile" >
                                SIMS PPOB - Yusuf Fadilah Rukmana
                            </a>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center">
                        <a href='/top-up' type="button" className="btn btn-link px-3 me-2" >
                            Top Up
                        </a>
                        <a href='/transaksi' type="button" className="btn btn-link px-3 me-2">
                            Transaction
                        </a>
                        <a href='/profile' type="button" className="btn btn-link px-3 me-2" >
                            Profile
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;