import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <Link to="/productos" className="navbar navbar-brand">
                    <p>React CRUD &Routing</p> 
                </Link>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink to="/productos" className="nav-link" activeClassName="active">Productos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/producto/nuevo" className="nav-link" activeClassName="active">Nuevo Producto</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;