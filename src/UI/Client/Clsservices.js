import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Clsservices = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [expandedServices, setExpandedServices] = useState([]);

    const FetchData = async () => {
        const resp = await fetch(process.env.GET_SERVICES);
        const data1 = await resp.json();
        setData(data1);
    };

    
    const toggleExpandServices = (servicesId) => {
        setExpandedServices((prevExpandedServices) =>
            prevExpandedServices.includes(servicesId)
                ? prevExpandedServices.filter((id) => id !== servicesId)
                : [...prevExpandedServices, servicesId]
        );
    };

    useEffect(() => {
        setLoading(true);
        FetchData();
        setLoading(false);
    }, []);

    return (
        <div className="Clsservices">
            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop__product__option">
                            </div>
                            <div className="row product__filter">
                                {data.map((service) => (
                                    <div className="col-lg-3 col-md-6 col-sm-6 mix new-arrivals" key={service._id}>
                                        <div className="product__item" onClick={() => toggleExpandServices(service._id)}>
                                            <div className="product__item__pic set-bg">
                                                <img style={{ width: 300, height: 300 }} src={`${process.env.GET_IMAGES}/${service.name}`} alt={service.name} />
                                            </div>
                                            <div className="product__item__text">
                                                <h6>{service.name}</h6>
                                                <h5>Price: ${service.price}</h5>
                                                {expandedServices.includes(service._id) && (
                                                    <>
                                                        <div className="product__color__select">
                                                            {service.description}
                                                        </div>  
                                                        <Link to={`/Clsservice/${service.idservices}/${sessionStorage.getItem("item_key")}`} className="add-cart">View Details</Link>
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

export default Clsservices;
