import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../UserContext/UserContext";
import OrdersRow from "./OrdersRow";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user?.email]);
//   console.log(orders);

const handlerDelete = (_id) => {
  const agree = window.confirm("are you sure delete this");
  if (agree) {
    fetch(`http://localhost:5000/orders/${_id}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("your order is deleted");
          const remaining = orders.filter((ser) => ser._id !== _id);
          setOrders(remaining);
        }
      });
  }
};

  


  return (
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
              </th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
                orders.map(order => <OrdersRow 
                    key={order._id}
                    order={order}
                    handlerDelete={handlerDelete}
                ></OrdersRow>)
            }
          </tbody>
        </table>
      </div>
  );
};

export default Orders;
