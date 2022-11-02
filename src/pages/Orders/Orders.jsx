import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../UserContext/UserContext';

const Orders = () => {
    const {user} = useContext(AuthContext);
    const [orders , setOrders] = useState([])
    
    useEffect( () => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[user?.email])

    return (
        <div>
            {orders.title}
        </div>
    );
};

export default Orders;