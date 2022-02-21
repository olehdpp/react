import React from 'react';
import cardStyles from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from "../../context"


function Card({ id, indexUrl, title, price, onFavorite, onPlus, favorited = false, added = false, loading = false, }) {
   const { isItemAdded } = React.useContext(AppContext);
   const [isFavorite, setIsFavorite] = React.useState(favorited);


   const onClickPlus = () => {
      onPlus({ id, title, indexUrl, price });
      isItemAdded(id, title, indexUrl, price);
   };

   const onClickFavorite = () => {
      onFavorite({ id, title, indexUrl, price });
      setIsFavorite(!isFavorite);
   };

   return (
      <div className={cardStyles.card}>
         {
            loading ? <ContentLoader
               speed={2}
               width={155}
               height={250}
               viewBox="0 0 155 265"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb"
            >
               <rect x="5" y="121" rx="0" ry="0" width="155" height="17" />
               <rect x="5" y="140" rx="0" ry="0" width="93" height="15" />
               <rect x="124" y="185" rx="0" ry="0" width="30" height="30" />
               <rect x="5" y="8" rx="0" ry="0" width="155" height="90" />
               <rect x="5" y="200" rx="0" ry="0" width="90" height="15" />
            </ContentLoader> : <>
               <div className={cardStyles.favorite} onClick={onClickFavorite}>
                  {onPlus && <img
                     src={isFavorite ? "/img/like.svg " : "/img/unlike.svg"}
                     alt="unlike" />}
               </div>
               <img width={133} height={113} src={indexUrl} alt="sneakers1" />
               <h5>{title}</h5>
               <div className="d-flex justify-between align-center">
                  <div className=" d-flex flex-column">
                     <span> Цена</span>
                     <b>{price} руб </b>
                  </div>
                  <div  >
                     {onPlus && <img className={cardStyles.plus}
                        onClick={onClickPlus}
                        src={isItemAdded(id) ? "/img/btn-cheacked.svg " : "/img/btn-plus.svg"}
                        alt="pluss" />}
                  </div>
               </div></>
         }


      </div>

   )
}
export default Card;
