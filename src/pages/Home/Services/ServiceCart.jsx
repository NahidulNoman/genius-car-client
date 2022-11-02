import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCart = ({service}) => {
  const {title,img,price,_id} =service;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img
          src={img}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-2xl font-semibold">{title}</h2>
        <div className="flex justify-between items-center">
        <p className="font-semibold text-orange-700">Price : ${price}</p>
        <Link to={`/checkout/${_id}`}> <FaArrowRight></FaArrowRight></Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCart;
