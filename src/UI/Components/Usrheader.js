import React from 'react';
import logo2 from '../img/logo.png';
import { Link } from 'react-router-dom';

const Usrheader = () => {
    return (
        <div>
            <header className="header">
                <div className="header__top">
                    <div className="header__top__left">
                        <p>Memorable Events, Unforgettable Experiences.</p>
                    </div>
                    <div className="header__top__right">
                        <div className="header__top__links">
                            <Link to="/Login">Login</Link>
                            <Link to="/Register">Register</Link>
                        </div>
                    </div>
                </div>  
                <div className="header__bottom">
                    <div className="header__logo">
                        <Link to="/Home"><img src={logo2} style={{ width: 100 }} alt="Logo" /></Link>
                    </div>
                    <nav className="header__menu">
                        <ul>
                            <li><Link to="/Home">Home</Link></li>
                            <li><Link to="/Halls">Events Rooms</Link></li>
                            <li><Link to="/Rental">Rental</Link></li>
                            <li><Link to="/Services">Services</Link></li>
                            <li><Link to="/About">About Us</Link></li>
                        </ul>
                    </nav>
                    <div className="canvas__open"><i className="fa fa-bars"></i></div>
                </div>
            </header>
        </div>
    )
}

export default Usrheader;
