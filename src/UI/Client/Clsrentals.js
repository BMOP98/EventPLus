import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Clsrentals = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [expandedRentals, setExpandedRentals] = useState([]);

    const FetchData = async () => {
        const resp = await fetch(process.env.GET_RENT);
        const data1 = await resp.json();
        setData(data1);
    };

    
    const toggleExpandRental = (rentId) => {
        setExpandedRentals((prevExpandedRentals) =>
            prevExpandedRentals.includes(rentId)
                ? prevExpandedRentals.filter((id) => id !== rentId)
                : [...prevExpandedRentals, rentId]
        );
    };

    useEffect(() => {
        setLoading(true);
        FetchData();
        setLoading(false);
    }, []);

    return (
        <div className="Clsrentals">
            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop__product__option">
                            </div>
                            <div className="row product__filter">
                                {data.map((rent) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 mix new-arrivals" key={rent._id}>
                                        <div className="product__item" onClick={() => toggleExpandRental(rent._id)}>
                                            <div className="product__item__pic set-bg">
                                                <img style={{ width: 300, height: 300 }} src={`${process.env.GET_IMAGES}/${rent.name}`} alt={rent.name} />
                                            </div>
                                            <div className="product__item__text">
                                                <h6>{rent.name}</h6>
                                                <h5>Price: ${rent.price}</h5>
                                                {expandedRentals.includes(rent._id) && (
                                                    <>
                                                        <div className="product__color__select">
                                                            Brand: {rent.brand}
                                                        </div>
                                                        <div className="product__color__select">
                                                            {rent.description}
                                                        </div>  
                                                        <Link to={`/Clsrental/${rent.idrents}/${sessionStorage.getItem("item_key")}`} className="add-cart">View Details</Link>
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

export default Clsrentals;
