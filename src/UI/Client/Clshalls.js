import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Clshalls = () => {
    const [loading, setLoading] = useState(true);
    const [capacity, setCapacity] = useState('100');
    const [price, setPrice] = useState('100');
    const [isMore, setIsMore] = useState(false);
    const [isMore1, setIsMore1] = useState(false);
    const [data, setData] = useState([]);
    const [expandedHalls, setExpandedHalls] = useState([]);

    const FetchData = async () => {
        const resp = await fetch("http://localhost:4008/apidatahall");
        const data1 = await resp.json();
        setData(data1);
    };

    const FetchFilteredData = async () => {
        const resp = await fetch(`http://localhost:4008/apidatahall/${capacity}/${price}`);
        const data1 = await resp.json();
        if(resp.ok){
            setData(data1);
        }else{
            alert(data1);
            setData([]);
        }
    };

    const handleCapacityChange = (event) => {
        setIsMore(false);
        setCapacity(event.target.value);
    };

    const handlePriceChange = (event) => {
        setIsMore1(false);
        setPrice(event.target.value);
    };

    const handleMoreChange = (event) => {
        setIsMore(event.target.checked);
        if (event.target.checked) {
            setCapacity('More');
        } else {
            setCapacity(300);
        }
    };

    const handleMoreChange1 = (event) => {
        setIsMore1(event.target.checked);
        if (event.target.checked) {
            setPrice('More1');
        } else {
            setPrice(900);
        }
    };

    
    const toggleExpandHall = (hallId) => {
        setExpandedHalls((prevExpandedHalls) =>
            prevExpandedHalls.includes(hallId)
                ? prevExpandedHalls.filter((id) => id !== hallId)
                : [...prevExpandedHalls, hallId]
        );
    };

    useEffect(() => {
        setLoading(true);
        FetchData();
        setLoading(false);
    }, []);

    return (
        <div className="clshalls">
            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop__product__option">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label htmlFor="capacityRange">Max. Capacity: {isMore ? 'More' : capacity}</label>
                                        <input
                                            type="range"
                                            id="capacityRange"
                                            name="capacityRange"
                                            min="100"
                                            max="300"
                                            step="100"
                                            value={isMore ? 300 : capacity}
                                            onChange={handleCapacityChange}
                                            disabled={isMore}
                                        />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={isMore}
                                                onChange={handleMoreChange}
                                            />
                                            More
                                        </label>
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="priceRange">Max. Price: {isMore1  ? 'More1' : price}</label>
                                        <input
                                            type="range"
                                            id="priceRange"
                                            name="priceRange"
                                            min="100"
                                            max="900"
                                            step="100"
                                            value={isMore1 ? 900 : price}
                                            onChange={handlePriceChange}
                                            disabled={isMore1}
                                        />
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={isMore1}
                                                onChange={handleMoreChange1}
                                            />
                                            More
                                        </label>
                                    </div>
                                    <div className="col-lg-12 text-center mt-3">
                                        <button className="site-btn" onClick={FetchFilteredData}>SEARCH</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row product__filter">
                                {data.map((hall) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 mix new-arrivals" key={hall._id}>
                                        <div className="product__item" onClick={() => toggleExpandHall(hall._id)}>
                                            <div className="product__item__pic set-bg">
                                                <img style={{ width: 'auto', height: 275 }} src={`http://localhost:4009/apiimages/${hall.name}`} alt={hall.name} />
                                            </div>
                                            <div className="product__item__text">
                                                <h6>{hall.name}</h6>
                                                <h5>Price: ${hall.price}</h5>
                                                {expandedHalls.includes(hall._id) && (
                                                    <>
                                                        <div className="product__color__select">
                                                            Capacity for: {hall.capacity} people
                                                        </div>
                                                        <div className="product__color__select">
                                                            {hall.description}
                                                        </div>
                                                        <div className="product__color__select">
                                                            Address: {hall.address}
                                                        </div>
                                                        <Link to={`/Clshall/${hall.idhalls}/${sessionStorage.getItem("item_key")}`} className="add-cart">View Details</Link>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Clshalls;
