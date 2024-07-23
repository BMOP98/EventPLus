import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Admeditservice = () => {
    const { idservices } = useParams();
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await fetch(`http://localhost:4016/apieditservice/${idservices}`);
                const serviceData = await response.json();
                setName(serviceData.name);
                setOriginalName(serviceData.name); // Guardar el nombre original
                setPrice(serviceData.price);
                setDescription(serviceData.description);
            } catch (error) {
                console.error("Failed to fetch service data", error);
            }
        };

        fetchServiceData();
    }, [idservices]);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url1 = "http://localhost:4016/apieditservice";
            const response = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idservices, name, originalName, price, description })
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
                navigate('/Admservices');
            }
        } catch (error) {
            console.error("Failed to submit edited service data", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                const url = `http://localhost:4016/apieditservice/${idservices}` + "/" + originalName;
                const response = await fetch(url, {
                    method: 'DELETE'
                });
                const message = await response.json();
                if (!response.ok) {
                    throw new Error("Response Status: " + response.status);
                }
                alert(message);
                navigate('/Admservices');
            } catch (error) {
                console.error("Failed to delete service", error);
            }
        }
    };

    const handleCancel = () => {
        navigate('/Admservices');
    };

    return (
        <div className="container_register">
            <div className="form-container">
                <h2 className="text-center">Edit Service</h2>
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

export default Admeditservice;
