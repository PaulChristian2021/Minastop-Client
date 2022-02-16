import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  const [filteredProd, setFilteredProd] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    fetch("https://minastop-mern.herokuapp.com/products")
      .then((response) => response.json())
      .then((data) => {
        setprod(data);
        console.log(data);
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
    setFilteredProd(prod);

    return () => {
      setIsLoading(false);
      if (category) setchosenCategory(category); //sets initial selected categories from params
    };
  }, [prod]);

  //changes products displayed based on chosenCategory
  useEffect(() => {
    if (chosenCategory == "") {
      setFilteredProd(prod);
    } else {
      const filtered = prod.filter((el) => {
        return el.category == chosenCategory;
      });
      setFilteredProd(filtered);
    }
  }, [chosenCategory]);

  const filterByCategory = (cat) => {
    if (chosenCategory === "" || chosenCategory !== cat) {
      setchosenCategory(cat);
    } else if (chosenCategory === cat) {
      setchosenCategory("");
    }
  };
  const search = (typed) => {
    // (typed)
    console.log(typed);
    const searchProd = prod.filter((el) => {
      return (
        el.title.toLowerCase().includes(typed.toLowerCase()) ||
        el.description.toLowerCase().includes(typed.toLowerCase())
      );
    });
    console.log(searchProd)
    setFilteredProd(searchProd)
    setchosenCategory('')
  };

  return (
    <section className={`section ${c.section}`}>
      {isLoading && <MoonLoader />}
      {!isLoading && (
        <SearchCategoriesNav className={c.nav}>
          <SearchBar placeholder="Find products" onSubmit={search} />
          <BrowseCategory
            filterByCategory={filterByCategory}
            chosenCategory={chosenCategory}
            categories={categories}
          />
        </SearchCategoriesNav>
      )}
      {!isLoading && (
        <BrowseSection
          products={filteredProd}
          chosenCategory={chosenCategory}
        />
      )}
    </section>
  );
};

export default BrowsePage;
