import React, { useEffect, useState } from "react";
import c from "./BrowseSection.module.css";
import ProductCard from "./ProductCard";

const BrowseSection = (props) => {
  

  const productCards = props.products.map((el) => (
    <ProductCard
      key={el._id}
      id={el._id}
      description={el.description}
      price={el.price}
      category={el.category}
      name={el.title}
      img={el.image}
      ratingrate={el.ratingrate}
      ratingcount={el.ratingcount}
      stock={el.stock}
    />
  ));

  return (
    <section className={c.section}>
      <ul>{productCards}</ul>
    </section>
  );
};

export default BrowseSection;
