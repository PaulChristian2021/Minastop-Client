import React from "react";
import { Link } from "react-router-dom";

import { MdOutlineAdd } from "react-icons/md";
import IconButton from "../../components/ui/IconButton";
import c from "./ProductCard.module.css";
import { useDispatch } from "react-redux";

import { CART, crement } from '../../store/slice/cartSlice'


const ProductCard = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  function addToCart(id){
    console.log(props._id)
    dispatch(crement({ type: CART.INCREMENT_ITEMS }))
  }

  return (
    <li className={c.li} title={props.description}>
      <Link to={`/products/${props.category}/${props.title.toLowerCase().trim()}`}>
        <p className={c.category}>{props.category}</p>
        <img src={props.image} alt={props.title} />
        <p className={c.name}>{props.title}</p>
        <span>Stock: {props.stock}</span>
      </Link>
      <div className={c.div}>
        <IconButton className={c.addCartBtn} onClick={addToCart}>
          Add <MdOutlineAdd />
        </IconButton>
        <span className={c.price}>$ {props.price}</span>
      </div>
    </li>
  );
};

export default ProductCard;
