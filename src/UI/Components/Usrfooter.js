import React from 'react';
import logo2 from '../img/logo.png';
import '../../css/style.css';

const Usrfooter = () => {
    return (
        <div>
            <footer class="footer">
                <div class="footer__container">
                    <div class="footer__logo">
                        <a href="/Home"><img src={logo2} alt="Logo" /></a>
                    </div>
                    <div class="footer__social">
                        <h6>Social Networks</h6>
                        <ul>
                            <li><a href="https://www.facebook.com/">Facebook</a></li>
                            <li><a href="https://www.instagram.com/">Instagram</a></li>
                        </ul>
                    </div>
                    <div class="footer__description">
                        <p>Event Plus, we are dedicated to creating unforgettable experiences for every occasion, ensuring that each event is unique and perfectly executed.</p>
                    </div>
                </div>
                <div class="footer__copyright__text">
                    <p>Copyright ©
                        <script>
                            document.write(new Date().getFullYear());
                        </script>
                        All rights reserved |
                        by <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Event Plus S.A.</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Usrfooter;
