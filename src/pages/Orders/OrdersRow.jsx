import React, { useEffect, useState } from "react";

const OrdersRow = ({ order }) => {
  const { serviceId, serviceName, customer, phone, price } = order;
  const [service, setService] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/services/${serviceId}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, [serviceId]);



  const handlerDelete = (service) => {
        fetch(`http://localhost:5000/orders/${serviceId}`, {
            method : 'delete'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                alert('your order is deleted')
                const remaining = service.filter(ser => ser._id !== service._id)
                setService(remaining);
            }
        })
  }

  return (
    <tr>
      <th>
        <label>
          <button onClick={()=> handlerDelete(service)} className="btn btn-square btn-outline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={service.img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm">{price}</span>
      </td>
      <td>Purple</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};

export default OrdersRow;
