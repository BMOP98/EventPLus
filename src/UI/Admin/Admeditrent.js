import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Admeditrent = () => {
    const { idrents } = useParams();
    const [name, setName] = useState('');
    const [originalName, setOriginalName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRentData = async () => {
            try {
                const response = await fetch(`${process.env.EDIT_RENT}/${idrents}`);
                const rentData = await response.json();
                setName(rentData.name);
                setOriginalName(rentData.name); // Guardar el nombre original
                setPrice(rentData.price);
                setBrand(rentData.brand);
                setDescription(rentData.description);
            } catch (error) {
                console.error("Failed to fetch hall data", error);
            }
        };

        fetchRentData();
    }, [idrents]);

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url1 = process.env.EDIT_RENT;
            const response = await fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idrents, name, originalName, price, brand, description })
            });
            const message = await response.json();
            if (!response.ok) {
                throw new Error("Response Status: " + response.status);
            } else {
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile);
                    formData.append('name', name);
                    await fetch(process.env.GET_IMAGES, {
                        method: 'POST',
                        body: formData
                    });
                }
                alert(message);
                navigate('/Admrent');
            }
        } catch (error) {
            console.error("Failed to submit edited rent data", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this rent?")) {
            try {
                const url = `${process.env.EDIT_RENT}/${idrents}` + "/" + originalName;
                const response = await fetch(url, {
                    method: 'DELETE'
                });
                const message = await response.json();
                if (!response.ok) {
                    throw new Error("Response Status: " + response.status);
                }
                alert(message);
                navigate('/Admrent');
            } catch (error) {
                console.error("Failed to delete rent", error);
            }
        }
    };

    const handleCancel = () => {
        navigate('/Admrent');
    };

    return (
        <div className="container_register">
            <div className="form-container">
                <h2 className="text-center">Edit Rent</h2>
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
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            className="form-control small-input"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
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

export default Admeditrent;
