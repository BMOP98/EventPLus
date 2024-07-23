import React from 'react';
import logo2 from '../img/logo.png';
import { Link } from 'react-router-dom';

const Admheader = () => {

    const close = () =>{
        sessionStorage.setItem("item_rol", "")
        window.location.href = "/"
    }

    return (
        <div>
            <header className="header">
                <div className="header__top">
                    <div className="header__top__left">
                        <p>Memorable Events, Unforgettable Experiences.</p>
                    </div>
                    <div className="header__top__right">
                        <div className="header__top__links">
                        <button  id="btn_close" class="site-btn" onClick={() => close()}>Log out</button> 
                        </div>
                    </div>
                </div>  
                <div className="header__bottom">
                    <div className="header__logo">
                        <Link to="/Admin"><img src={logo2} style={{ width: 100 }} alt="Logo" /></Link>
                    </div>
                    <nav className="header__menu">
                        <ul>
                            <li><Link to="/Admin">Home</Link></li>
                            <li><Link to="/">Reservations</Link></li>
                            <li><Link to="/Admhalls">Halls</Link></li>
                            <li><Link to="/Admrent">Rental</Link></li>
                            <li><Link to="/Admservices">Services</Link></li>
                            <li><Link to="/">List Products</Link></li>
                            <li><Link to="/">Comments</Link></li>
                        </ul>
                    </nav>
                    <div className="canvas__open"><i className="fa fa-bars"></i></div>
                </div>
            </header>
        </div>
    )
}

export default Admheader