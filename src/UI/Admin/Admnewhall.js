import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admnewhall = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [address, setAddress] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const navigate = useNavigate();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url1 = process.env.CREATE_HALL;
            const response = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, description, capacity, address })
            });
            const message = await response.json();
            if (!response.ok) {
                throw new Error("Response Status: " + response.status);
            } else {
                const inputFile = document.getElementById('pro_urlimg');
                const file = inputFile.files[0];
                const name = document.getElementById('name');
                const name_hall = name.value;
                const formData = new FormData();
                formData.append('file', file);
                formData.append('name', name_hall);
                fetch(process.env.GET_IMAGES, {
                    method: 'POST',
                    body: formData
                })
                alert(message);
                navigate('/Admhalls')
            }
        } catch (error) {

        }
        
    };

    const handleCancel = () => {
        navigate('/Admhalls');
    };

    return (
        <div className="container_register">
            <div className="form-container">
                <h2 className="text-center">Register New Hall</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control small-input"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            className="form-control small-input"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control small-input"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="capacity">Max. Capacity</label>
                        <input
                            type="text"
                            className="form-control small-input"
                            id="capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            className="form-control small-input"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div class="checkout__input">
                        <p>Select Image:</p>
                    </div>
                    <div class="checkout__input">
                        <input id="pro_urlimg" type="file" placeholder="Enter the url of the image" name="file" onChange={changeHandler} accept=".png, .jpg, .jpeg" />
                    </div>
                    <br></br>
                    <div className="text-center-btns">
                        <button type="submit" className="site-btn" id="btn_register_hall">Register</button>
                        <button type="button" className="site-btn" id="btn_cancel" onClick={handleCancel}>Cancel</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Admnewhall;
