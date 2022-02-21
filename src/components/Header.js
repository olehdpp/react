import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";


function Header(props) {
   const { cartItems } = React.useContext(AppContext);
   const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

   return (
      <header className="header d-flex justify-between p-40" >
         <div className="d-flex justify-center">
            <Link to="">
               <img width={40} height={40} src="/img/logo.png" />
            </Link>
            <div className=" pl-10" >
               <h3 className="text-uppercase">REACT SNEAKERS</h3>
               <p className="opacity-5">Магазин лучших кроссовокs</p>
            </div>
         </div>
         <ul className="d-flex">
            <li onClick={props.onClickCart}
               className="mr-30 cu-p ">
               <img className=" mr-20 " width={18} height={18} src="/img/cart.svg" />
               <span>{totalPrice} руб.</span>
            </li>
            <li className="mr-30 cu-p ">
               <Link to="/favorites">
                  <img width={18} height={18} src="/img/heart.svg" alt="heart" />
               </Link>
            </li>
            <li >
               <Link to="/orders">
                  <img width={18} height={18} src="/img/user.svg" alt="user" />
               </Link>

            </li>
         </ul>
      </header>
   )
}
export default Header;