import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Admedithall = () => {
    const { idhalls } = useParams();
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [address, setAddress] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHallData = async () => {
            try {
                const response = await fetch(`http://localhost:4010/apiedithall/${idhalls}`);
                const hallData = await response.json();
                setName(hallData.name);
                setOriginalName(hallData.name); // Guardar el nombre original
                setPrice(hallData.price);
                setDescription(hallData.description);
                setCapacity(hallData.capacity);
                setAddress(hallData.address);
            } catch (error) {
                console.error("Failed to fetch hall data", error);
            }
        };

        fetchHallData();
    }, [idhalls]);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url1 = "http://localhost:4010/apiedithall";
            const response = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idhalls, name, originalName, price, description, capacity, address })
            });
            const message = await response.json();
            if (!response.ok) {
                throw new Error("Response Status: " + response.status);
            } else {
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    formData.append('name', name);
                    await fetch('http://localhost:4009/apiimages', {
                        method: 'POST',
                        body: formData
                    });
                }
                alert(message);
                navigate('/Admhalls');
            }
        } catch (error) {
            console.error("Failed to submit edited hall data", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this hall?")) {
            try {
                const url = `http://localhost:4010/apiedithall/${idhalls}` + "/" + originalName;
                const response = await fetch(url, {
                    method: 'DELETE'
                });
                const message = await response.json();
                if (!response.ok) {
                    throw new Error("Response Status: " + response.status);
                }
                alert(message);
                navigate('/Admhalls');
            } catch (error) {
                console.error("Failed to delete hall", error);
            }
        }
    };

    const handleCancel = () => {
        navigate('/Admhalls');
    };

    return (
        <div className="container_register">
            <div className="form-container">
                <h2 className="text-center">Edit Hall</h2>
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
                    <div className="checkout__input">
                        <p>Select Image:</p>
                    </div>
                    <div className="checkout__input">
                        <input id="pro_urlimg" type="file" placeholder="Enter the url of the image" name="file" onChange={changeHandler} accept=".png, .jpg, .jpeg" />
                    </div>
                    <br />
                    <div className="text-center-btns">
                        <button type="submit" className="site-btn" id="btn_edit_hall">Save Changes</button>
                        <button type="button" className="site-btn" id="btn_cancel" onClick={handleCancel}>Cancel</button>
                        <button type="button" className="site-btn" id="btn_delete" onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Admedithall;
