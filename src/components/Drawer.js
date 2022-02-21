import React from "react";
import axios from "axios";
import Info from "./Info";
import { useCart } from "./hooks/useCart";

const deley = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
   const { cartItems, setCartItems, totalPrice } = useCart();
   const [isOrderComplete, setIsOrderCompleate] = React.useState(null);
   const [orderId, setOrderId] = React.useState(false);
   const [isLoading, setIsLoading] = React.useState(false);


   const onClickOrder = async () => {
      try {
         setIsLoading(true);
         const { data } = await axios.post("https://61f7a2cb39431d0017eaf920.mockapi.io/orders", { items: cartItems, });
         setOrderId(data.id);
         setIsOrderCompleate(true);
         setCartItems([]);
         for (let i = 0; i < cartItems.length; i++) {
            const item = cartItems[i];
            await axios.delete("https://61f7a2cb39431d0017eaf920.mockapi.io/cart/" + item.id);
            await deley(1000)
         }
      } catch (error) {
         alert('error')
      };
      setIsLoading(false)
   }
   return (
      <div className="overlay ">
         <div className="drawer d-flex flex-column ">
            <h2 className="mb-30px d-flex justify-between " onClick={onClose}>Корзина
               <img className="removeBtn cu-p" src="/img/btn-remove.svg" alt="remove" />
            </h2>
            {items.length > 0 ? (<div className="d-flex flex-column flex">
               <div className="items flex mt-30 ">
                  {items.map((obj) => (
                     <div key={obj.id} className="cartItem justify-between	 d-flex align-center mb-20" >
                        <div style={{ backgroundImage: `url(${obj.indexUrl})` }} className="cartItemImg">
                        </div>
                        <div className="mr-20  " >
                           <p className="mb-5">{obj.title}</p>
                           <b>{obj.price} руб.</b>
                        </div>
                        <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                     </div>))}
               </div>
               <div className="cartTotalBlock">
                  <ul >
                     <li className="d-flex">
                        <span>Итого:</span>
                        <b> {totalPrice} руб.</b>
                     </li>
                     <li className="d-flex">
                        <span>Налог 5%:</span>
                        <b>{totalPrice / 100 * 5} руб.</b>
                     </li>
                  </ul>
                  <button disabled={isLoading} onClick={onClickOrder} className="greenButton" >Оформить заказ<img src="/img/arrow.svg" alt="arrow" /> </button>
               </div>
            </div>
            ) :
               (<Info
                  title={isOrderComplete ? "Заказ оформлен" : "Корзина пуста"}
                  description={isOrderComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                  image={isOrderComplete ? "./img/complete-order.jpg" : "./img/empty-cart.jpg"}
               />)

            }
         </div>
      </div>

   )
}
export default Drawer;