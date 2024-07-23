import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

const Usrhalls = () => {
    const [capacity, setCapacity] = useState('100');
    const [isMore, setIsMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    var [data_type] = useState("All");

    const FetchData = async () => {
        try {
            const resp = await fetch("http://localhost:5000/apilisthalls/" + data_type + "/" + capacity);
            if(resp.ok){
                let jsonData = await resp.json();
                setData(await jsonData);
            }else{
                alert("Parameters not found");
            }
        } catch (error) {
            
        }
    };


    useEffect(() => {
        setLoading(true);
        FetchData();
        setLoading(false)
    }, [])

    const handleCapacityChange = (event) => {
        setIsMore(false);
        setCapacity(event.target.value);
      };
    
      const handleMoreChange = (event) => {
        setIsMore(event.target.checked);
        if (event.target.checked) {
          setCapacity('More');
        } else {
          setCapacity(300);
        }
      };

    return (
        <div>
            <section class="breadcrumb-option">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb__text">
                                <h4>Halls</h4>
                                <div>
                                    <Link to="/Home">Home &gt; </Link>
                                    <span>Halls</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="shop spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="shop__product__option">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <p>Order to : &nbsp;&nbsp;</p>
                                        <select onChange={(event) => data_type = event.target.options[event.target.selectedIndex].text}>
                                            <option value="All">All</option>
                                            <option value="Modern">Modern</option>
                                            <option value="Classic">Classic</option>
                                            <option value="Thematic">Thematic</option>
                                            <option value="Outdoor">Outdoor</option>
                                        </select> <br></br><br></br>
                                    </div>
                                    <div class="col-lg-6">
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
                                    <div class="col-lg-2">
                                        <div class="shop__product__option__right">
                                            <button herf="" class="site-btn" id="btn_add_car" onClick={() => FetchData()} >SEARCH</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row product__filter">
                                {data.filter(varid => varid).map(filname => (
                                    <>
                                        <div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                                            <div class="product__item">
                                                <div class="product__item__pic set-bg" >
                                                    <img style={{ width: 'auto', height: 275 }} src={'http://localhost:5000/images/' + filname.ProImagen} />
                                                    <span class="label">{filname.ProTipo}</span>

                                                    <ul class="product__hover"><br></br>
                                                        <li class="label2">{filname.ProColor}</li>
                                                        <li class="label2">{filname.ProPeso} Kg</li>
                                                        <li class="label2">{filname.ProModelo}</li>
                                                        <li class="label2">{filname.ProDimension}</li>
                                                    </ul>

                                                </div>
                                                <div class="product__item__text">
                                                    <h6>{filname.ProNombre}</h6>
                                                    <a href="/Login" class="add-cart">Ver detalles</a>
                                                    <h5>${filname.ProPrecio}</h5>
                                                    <div class="product__color__select">
                                                        {filname.ProDescripcion}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Usrhalls