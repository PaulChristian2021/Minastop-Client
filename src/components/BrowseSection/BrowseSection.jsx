import React, { useEffect, useState } from "react";
import c from "./BrowseSection.module.css";
import ProductCard from "./ProductCard";
import { GiShrug } from "react-icons/gi";

const BrowseSection = (props) => {
  const productCards = props.products.map((el) => (
    <ProductCard
      key={el._id}
      _id={el._id}
      description={el.description}
      price={el.price}
      category={el.category}
      title={el.title}
      image={el.image}
      ratingrate={el.ratingrate}
      ratingcount={el.ratingcount}
      stock={el.stock}
    />
  ));

  return (
    <section className={c.section}>
      <ul>
        {productCards}
        {!props.products.length && (
          <div className={c.noresult}>
            <li >
              <GiShrug style={{ fontSize: "100px", color: "#49494D" }} />
              <br />
              Nothing here.
            </li>
          </div>
        )}
        {/* {!props.products.length && <span>...</span>} */}
      </ul>
    </section>
  );
};

export default BrowseSection;
