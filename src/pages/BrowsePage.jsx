import React, { useState, useEffect } from "react";
import SearchCategoriesNav from "../components/SearchCategoriesNav/SearchCategoriesNav";
import SearchBar from "../components/SearchBar/SearchBar";
import BrowseCategory from "../components/BrowseCategory/BrowseCategory";
import BrowseSection from "../components/BrowseSection/BrowseSection";
import c from "./BrowsePage.module.css";
import MoonLoader from "react-spinners/MoonLoader";

const BrowsePage = () => {
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setchosenCategory] = useState("");
  const [prod, setprod] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://minastop-mern.herokuapp.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setprod(data);
      });
    return () => {};
  }, []);

  useEffect(() => {
    const gatheredCategories = [];
    prod.forEach((p) => {
      if (!gatheredCategories.includes(p.category)) {
        gatheredCategories.push(p.category);
      }
    });
    setCategories(
      gatheredCategories.sort((a, b) => {
        return b.length - a.length;
      })
    );
    console.log(gatheredCategories);
    return ()=>{setIsLoading(false)}
  }, [prod]);

  const filterByCategory = (cat) => {
    setchosenCategory(cat);
  };
  return (
    <section className={`section ${c.section}`}>
      {isLoading && <MoonLoader />}
      {!isLoading && (
        <SearchCategoriesNav className={c.nav}>
          <SearchBar placeholder="Find products" />
          <BrowseCategory
            filterByCategory={filterByCategory}
            categories={categories}
          />
        </SearchCategoriesNav>
      )}
      {!isLoading && (
        <BrowseSection products={prod} chosenCategory={chosenCategory} />
      )}
    </section>
  );
};

export default BrowsePage;
