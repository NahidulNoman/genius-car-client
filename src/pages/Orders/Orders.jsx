import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../UserContext/UserContext";
import OrdersRow from "./OrdersRow";

const Orders = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(
      `https://genius-car-server-rho-nine.vercel.app/orders?email=${user?.email}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("genius-token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 403) {
          return logout();
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, [user?.email, logout]);
  //   console.log(orders);

  const handlerDelete = (_id) => {
    const agree = window.confirm("are you sure delete this");
    if (agree) {
      fetch(`https://genius-car-server-rho-nine.vercel.app/orders/${_id}`, {
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

  const handlerStatusUpdate = (id) => {
    fetch(`https://genius-car-server-rho-nine.vercel.app/orders/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const remaining = orders.filter((ord) => ord._id !== id);
          const approving = orders.find((ord) => ord._id === id);
          approving.status = "Approved";
          const newUpdate = [approving, ...remaining];
          setOrders(newUpdate);
        }
      });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrdersRow
              key={order._id}
              order={order}
              handlerStatusUpdate={handlerStatusUpdate}
              handlerDelete={handlerDelete}
            ></OrdersRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
