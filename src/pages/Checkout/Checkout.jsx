import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const { title, price ,_id} = useLoaderData();

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || 'unregistered';
    const phone = form.phone.value;
    const message = form.message.value;
    
    const order = {
        serviceId: _id,
        serviceName: title,
        price,
        customer: name,
        email,
        phone,
        message
    }
    

    fetch(`http://localhost:5000/orders` , {
        method : 'post',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(order)
    })
    .then(res => res.json())
    .then(data => {
        if(data.acknowledged){
            alert('your service added')
            form.reset();
        }
    })
  };

  return (
    <div>
      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-4xl text-center font-semibold">You are about to order: {title}</h2>
        <h4 className="text-3xl text-center font-semibold">Price: {price}</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-ghost w-full  input-bordered"
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-ghost w-full  input-bordered"
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-ghost w-full  input-bordered"
            required
          />
          <input
            name="email"
            type="text"
            placeholder="Your email"
            defaultValue={user?.email}
            className="input input-ghost w-full  input-bordered"
            readOnly
          />
        </div>
        <textarea
          name="message"
          className="textarea textarea-bordered h-24 w-full mt-5"
          placeholder="Your Message"
          required
        ></textarea>

        <input className="btn" type="submit" value="Place Your Order" />
      </form>
    </div>
  );
};

export default Checkout;
