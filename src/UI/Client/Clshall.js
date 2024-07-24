import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const Clshall = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState("");
    const [address, setAddress] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const navigate = useNavigate();
    let { idhalls } = useParams();
    let { idclients } = useParams();

    const information = () => {
        fetch(process.env.GET_HALLS + "/" + idhalls)
            .then((response) => response.json())
            .then((data) => data.filter(varid => varid).map(filname => (
                setName(filname.name),
                setPrice(filname.price),
                setDescription(filname.description),
                setCapacity(filname.capacity),
                setAddress(filname.address)
            )));
    }

    const handleCancel = () => {
        navigate('/Clshalls');
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    const sendData = async () => {
        if (!eventDate || !eventTime) {
            alert("Please choose date and time of your event.");
            return;
        }else{
            const formattedDate = formatDate(eventDate);
            const state = "Pending";
            const url1 = process.env.CREATE_RESERVE;
            const response = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, idclients, formattedDate, eventTime, state })
            });
            const message = await response.json();
            if(response.ok){
                alert(message);
                navigate('/Clshalls');
            }else{
                alert(message);
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        information();
        setLoading(false);
    }, []);

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
            setEventDate(e.target.value);
        } else {
            alert("Please select a future date.");
        }
    }

    const handleTimeChange = (e) => {
        setEventTime(e.target.value);
    }

    return (
        <div className="clshall-container">
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
                            <b>Capacity: </b> {capacity}
                            <br />
                            <b>Address:</b> {address}
                            <br />
                        </div>
                        <br />
                        <div className="columns col-5">
                            <label>
                                <b>Event Date: </b>
                                <input type="date" value={eventDate} onChange={handleDateChange} />
                            </label>
                            <br />
                            <label>
                                <b>Event Time: </b>
                                <input type="time" value={eventTime} onChange={handleTimeChange} />
                            </label>
                        </div>
                        <br />
                        <div className="button-container">
                            <button className="site-btn" onClick={() => sendData()}>Reserve</button>
                            <button className="site-btn" onClick={() => handleCancel()}>Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
            <br />
            <br />
        </div>
    )
}

export default Clshall;
