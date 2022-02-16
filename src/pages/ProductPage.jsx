import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import c from "./ProductPage.module.css";
import SearchCategoriesNav from "../components/SearchCategoriesNav/SearchCategoriesNav";
import SearchBar from "../components/SearchBar/SearchBar";
import BrowseCategory from "../components/BrowseCategory/BrowseCategory";
import IconButton from "../components/ui/IconButton";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const dummyprod = {
  category: "Loading",
  description: "Product descrription",
  image: "image url",
  price: 0.0,
  ratingcount: 0,
  ratingrate: 0,
  stock: 0,
  title: "Title",
  _id: "",
};

//

const categories = [
  "women's clothing",
  "men's clothing",
  "electronics",
  "jewelery",
];

//

const ProductPage = (props) => {
  const { product } = useParams();
  const numberRef = useRef(1);
  const navigate = useNavigate();
  const [theProduct, setTheProduct] = useState(dummyprod);
  console.log(props.products);
  useEffect(() => {
    console.log(props.products);
    const x = props.products.filter((el) => {
      return product.toLowerCase().trim() == el.title.toLowerCase().trim();
    });
    console.log(x);
    setTheProduct(x[0]);
    console.log(theProduct, product);
    return () => {
      console.log(theProduct);
    };
  }, []);

  function filterByCategory(category) {
    navigate.push(`/products/${category}`);
  }

  function setAddNumber(isAdding) {
    if (isAdding) numberRef.current.value++;
    if (!isAdding && numberRef.current.value > 1) numberRef.current.value--;
    else return;
    console.log(numberRef.current.value);
  }
  function typeAddNumber(num) {
    numberRef.current.value = num;
  }
  return (
    <section className={`section`}>
      <SearchCategoriesNav className={c.nav}>
        <SearchBar placeholder="Find Products" />
        <BrowseCategory
          filterByCategory={filterByCategory}
          categories={categories}
        />
      </SearchCategoriesNav>
      <header className={c.header}>
        <h2>{theProduct.title}</h2>
        <sub>{theProduct.category}</sub>
      </header>
      <div className={c.div}>
        <img src={theProduct.image} alt={theProduct.title} />
        <form
          className={c.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <fieldset>
            <IconButton
              onClick={() => setAddNumber(false)}
              className={c.operator}
            >
              <AiOutlineMinus />
            </IconButton>
            <input
              type="number"
              min={1}
              value={1}
              ref={numberRef}
              onChange={(e) => typeAddNumber(e.target.value)}
            />
            <IconButton
              onClick={() => setAddNumber(true)}
              className={c.operator}
            >
              <AiOutlinePlus />
            </IconButton>
          </fieldset>
          <IconButton className={c.addToCart}>Add To Cart</IconButton>
        </form>
      </div>
    </section>
  );
};

export default ProductPage;
