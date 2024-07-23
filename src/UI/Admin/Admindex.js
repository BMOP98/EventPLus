import React, { useEffect, useState } from 'react';

const Admindex = () => {
    const [data_user, setUser] = useState("0");
    const [data_reservations, setReservations] = useState("0");
    const [data_date, setDate] = useState("NONE");
    const [data_hall, setHall] = useState("NONE");

    const fetchData = async () => {
        const resp = await fetch("http://localhost:4006/apicount");
        const data1 = await resp.json();
        
        if(resp.ok){
            setUser(data1.clientCount);
            setReservations(data1.reservcount);
            setDate(data1.datereserv);
            setHall(data1.hallreserv);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="admin-container">
            <section className="menu inicio">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="cart__total border-box">
                                <h2>Welcome Admin!!</h2>
                                <br />
                                <h5>Type of user: Administrator</h5>
                                <br />
                                <a href="/Home" className="primary-btn">Log out</a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cart__total border-box">
                                <h2>Reports:</h2>
                                <ul>
                                    <li id="total_clients">Total clients: {data_user}</li>
                                    <li id="total_reservations">Number of reservations: {data_reservations}</li>
                                    <li id="last_reservation">Date of last reservation: {data_date}</li>
                                    <li id="name_hall">Hall: {data_hall}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="cart__total border-box">
                                <h2>Quick Access:</h2>
                                <ul className="quick-access-list">
                                    <li><a href="./Admin"><i className="fab fa-diaspora"></i>  Home</a></li>
                                    <li><a href="./Admhalls"><i className="fab fa-buffer"></i>  List of Halls</a></li>
                                    <li><a href="#"><i className="fab fa-buffer"></i>  List of Rentals</a></li>
                                    <li><a href="#"><i className="fab fa-buffer"></i>  List of Services</a></li>
                                    <li><a href="#"><i className="fab fa-pushed" aria-hidden="true"></i>  Comments </a></li>
                                </ul>
                            </div>
                        </div>
                        <br />
                        <br />
                    </div>
                </div>
            </section>
            <br />
            <br />
        </div>
    );
};

export default Admindex;
