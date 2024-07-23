import React, { useState } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';

import room1 from '../img/index/room1.png';
import room2 from '../img/index/room2.png';
import room3 from '../img/index/room3.png';
import room4 from '../img/index/room4.png';
import rent1 from '../img/index/chairs.png';
import rent2 from '../img/index/table.png';
import rent3 from '../img/index/sound.png';
import serv1 from '../img/index/serv1.png';
import serv2 from '../img/index/serv2.png';
import serv3 from '../img/index/serv3.png';
import bn1 from '../img/index/compras.jpg';
import bn2 from '../img/index/maquinaria.jpg';
import bn3 from '../img/index/repuestos.jpg';

const items = [
    { src: bn1 },
    { src: bn2 },
    { src: bn3 },
];

const rooms = [
    { src: room1, title: "Esplendor Hall", description: "16 Sep 2022" },
    { src: room2, title: "Hall of Joy", description: "21 Sep 2022" },
    { src: room3, title: "Hall The Enchantment", description: "28 Sep 2022" }
];

const rents = [
    { src: rent1, title: "Chairs", description: "Plastic chairs for all types of events" },
    { src: rent2, title: "Tables", description: "Square, rectangular and round tables" },
    { src: rent3, title: "Sound equipment", description: "Rental of various types of sound equipment" }
];

const services = [
    { src: serv1, title: "Waiters", description: "Service of Catering" },
    { src: serv2, title: "Snacks", description: "Snacks Services" },
    { src: serv3, title: "Entertainers services", description: "Entertainers, crazy hour and more" }
];

function Usrindex(args) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    const Redir_Hall = () => window.location.href = "/Catalogofil/Hall";
    const Redir_Rent = () => window.location.href = "/Catalogofil/Rent";
    const Redir_Serv = () => window.location.href = "/Catalogofil/Services";

    return (
        <div>
            <Carousel activeIndex={activeIndex} next={next} previous={previous} {...args}>
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>

            <section class="latest spad">
                <div class="container">
                    <div class="section-title text-center">
                        <br></br>
                        <span class="text-uppercase text-danger">Our Event Halls</span>
                        <h2 class="text-uppercase">Event Halls</h2>
                    </div>
                    <div class="row">
                        {rooms.map((room, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                <div className="card">
                                    <img src={room.src} className="card-img-top" alt={room.title} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{room.title}</h5>
                                        <p className="card-text">{room.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="text-center">
                        <button class="btn btn-dark text-uppercase" onClick={Redir_Hall}>See More</button>
                    </div>
                </div>
                <br></br>
            </section>

            <section class="latest spad">
                <div class="container">
                    <div class="section-title text-center">
                        <span class="text-uppercase text-danger">Ours Service of Rent</span>
                        <h2 class="text-uppercase">Implements</h2>
                    </div>
                    <div class="row">
                        {rents.map((rent, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                <div className="card">
                                    <img src={rent.src} className="card-img-top" alt={rent.title} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{rent.title}</h5>
                                        <p className="card-text">{rent.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="text-center">
                        <button class="btn btn-dark text-uppercase" onClick={Redir_Rent}>See More</button>
                    </div>
                </div>
                <br></br>
            </section>

            <section class="latest spad">
                <div class="container">
                    <div class="section-title text-center">
                        <span class="text-uppercase text-danger">Ours Service</span>
                        <h2 class="text-uppercase">Services</h2>
                    </div>
                    <div class="row">
                        {services.map((serv, index) => (
                            <div key={index} className="col-lg-4 col-md-6 col-sm-6 mb-4">
                                <div className="card">
                                    <img src={serv.src} className="card-img-top" alt={serv.title} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{serv.title}</h5>
                                        <p className="card-text">{serv.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="text-center">
                        <button class="btn btn-dark text-uppercase" onClick={Redir_Serv}>See More</button>
                    </div>
                </div>
                <br></br>
            </section>

            <section class="instagram spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="instagram__pic d-flex flex-wrap">
                                {[room1, room2, room3, room4, serv1, serv3].map((img, index) => (
                                    <div key={index} class="instagram__pic__item col-lg-4 col-md-4 col-sm-6 p-1">
                                        <img src={img} class="img-fluid" alt="" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="instagram__text p-3">
                                <h2>Information</h2>
                                <p>Evento Plus, we are dedicated to providing ideal spaces for all types of celebrations, from corporate meetings to weddings and private parties. In addition, we offer a wide range of additional implements and services to ensure that every event is a memorable success.</p>
                                <h3>#EVENTPLUS</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br></br>
        </div>
    );
}

export default Usrindex;
