import React from 'react';
import Card from '../components/Card';
import axios from 'axios';
import AppContext from "../context"


function Orders() {
   const { onAddToFavorite, onAddToCart } = React.useContext(AppContext)
   const [orders, setOrders] = React.useState([]);
   const [isLoading, setisLoading] = React.useState(true);


   React.useEffect(() => {
      (async () => {
         try {
            const { data } = await axios.get('https://61f7a2cb39431d0017eaf920.mockapi.io/orders');
            setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
            setisLoading(false)
         } catch (error) {
            alert("error")
         }
      })();
   }, []);

   return (
      < div className="content p-40" >
         <div className="d-flex align-center justify-between mb-40">
            <h1 >Мои заказы</h1>
         </div>
         < div className="sneakers d-flex flex-wrap ">
            {(isLoading ? [...Array(8)] : orders).map((item, index) => (
               <Card key={index}
                  loading={isLoading}
                  onFavorite={(obj) => onAddToFavorite(obj)}
                  {...item} />
            ))}
         </div>
      </div >
   )
}
export default Orders;
