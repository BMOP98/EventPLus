import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const Clsrental = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const navigate = useNavigate();
    let { idservices } = useParams();
    let { idclients } = useParams();

    const fetchServiceData = () => {
        fetch(process.env.GET_SERVICES + "/" + idservices)
            .then((response) => response.json())
            .then((data) => {
                const service = data[0];
                setName(service.name);
                setPrice(service.price);
                setDescription(service.description);
            });
    }

    const fetchReservations = () => {
        fetch(process.env.CREATE_RESERVE + "/" + idclients)
            .then((response) => response.json())
            .then((data) => setReservations(data));
    }

    const handleCancel = () => {
        navigate('/Clsservices');
    };

    const handleReservationChange = (reservationId) => {
        setSelectedReservation(reservationId);
    };

    const sendData = async () => {
        if (!selectedReservation) {
            alert("Please select the room for which you want to reserve the service.");
            return;
        }

        const url1 = process.env.CREATE_SERVICERENT;
        const response = await fetch(url1, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idservices, selectedReservation })
        });
        const message = await response.json();
        if (response.ok) {
            alert(message);
            navigate('/Clsservices');
        } else {
            alert(message);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchServiceData();
        fetchReservations();
        setLoading(false);
    }, []);

    return (
        <div className="Clsrental-container">
            <section className="main-content">
                <div className="row max-inner">
                    <div className="columns col-4 product-media">
                        <img src={'${process.env.GET_IMAGES}/' + name} className="hall-image" alt={name} />
                    </div>
                    <div className="columns col-6 product-info">
                        <h2>{name}</h2>
                        <span className="product-meta">{description}</span>
                        <div className="columns col-5">
                            <b>Price: </b> ${price}
                            <br />
                        </div>
                        <div className="reservation-list">
                            <h3>Select Reservation</h3>
                            <ul className="list-group">
                                {reservations.map((reservation) => (
                                    <li key={reservation.id} className="list-group-item d-flex align-items-center">
                                        <input
                                            type="radio"
                                            name="reservation"
                                            className="radio-input form-check-input me-2"
                                            value={reservation._id}
                                            onChange={() => handleReservationChange(reservation._id)}
                                        />
                                        <label>
                                            Hall: {reservation.hall}, Date: {reservation.date}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <br/>
                        <div className="button-container">
                            <button
                                className="site-btn"
                                onClick={sendData}
                            >
                                Reserve
                            </button>
                            <button className="site-btn" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
                                
        </div>
    );
}

export default Clsrental;
