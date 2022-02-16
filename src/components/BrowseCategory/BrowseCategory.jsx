import React from "react";

import c from './BrowseCategory.module.css'
import { Link } from "react-router-dom";

const BrowseCategory = ({filterByCategory, categories, chosenCategory}) => {
  
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
              <Link to={`/products/${el}`} className={chosenCategory === el ? c.chosen : ''}>{el}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BrowseCategory;
