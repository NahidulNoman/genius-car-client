import React, { useEffect, useState } from 'react';
import ServiceCart from './ServiceCart';

const Services = () => {
    const [services , setServices] = useState([]);
    console.log(services)
    useEffect( () => {
        fetch('services.json')
        .then(res => res.json())
        .then(data => setServices(data))
    },[])
    return (
        <div>
            <div>
            <h3 className='font-bold text-center text-orange-600 text-3xl mt-5'>Service {services.length}</h3>
            <p className='font-bold text-center text-5xl m-3'>Our Service Area</p>
            <p className='font-semibold text-center text-2xl w-1/2 mx-auto m-3 opacity-80'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-5'>
                {
                    services.map(service => <ServiceCart
                    key={service._id}
                    service={service}
                    ></ServiceCart>)
                }
            </div>
        </div>
    );
};

export default Services;