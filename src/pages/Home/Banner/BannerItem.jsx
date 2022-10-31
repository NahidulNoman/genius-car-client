import React from "react";

const BannerItem = ({ item }) => {
  const { image, id, next, prev } = item;

  return (
    <div id={`slide${id}`} className="carousel-item relative w-full mb-5">
      <div className="carousel-img">
        <img src={image} className="rounded-2xl" alt="" />
      </div>

      <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/4">
        <h1 className="text-5xl font-bold text-white">
          Affordable <br />
          Price For Car <br />
          Servicing
        </h1>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-1/2">
        <p className="font-semibold text-white">
          There are many variations of passages of available, but the <br />{" "}
          majority have suffered alteration in some form
        </p>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-24 top-3/4">
        <button className="btn btn-warning mr-5">Discover More</button>
        <button className="btn btn-outline btn-accent">Latest Project</button>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle mr-5">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerItem;
