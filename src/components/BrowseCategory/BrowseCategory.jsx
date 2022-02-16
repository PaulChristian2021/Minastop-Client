import React from "react";
import { useSelector } from "react-redux";

import c from './BrowseCategory.module.css'
import { Link } from "react-router-dom";

const BrowseCategory = ({filterByCategory, categories}) => {
  // const cat = useSelector(state => state.productCategories)
  console.log(categories)
  
  return (
    <div className={`${c.categories} ${c.maxwidth500px}`}>
      <p onMouseEnter={() => {}}>Browse Categories</p>
      <ul className={c.maxwidth500px}>
        {categories.map((el) => {
          return (
            <li
              key={el}
              className={c.li}
              onClick={() => filterByCategory(el)}
            >
              <Link to={`/products/${el}`}>{el}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BrowseCategory;
