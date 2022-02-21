import React from 'react';
import Card from '../components/Card/index.js';

function Home({ items, searchValue, setSearchValue, onChengeSearchInput, onAddToFavorite
   , onAddToCard, isLoading, }
) {
   const renderItems = () => {
      const filtredItems = items.filter((item) =>
         item.title.toLowerCase().includes(searchValue.toLowerCase()));

      return (isLoading ? [...Array(8)] : filtredItems)
         .map((item, index) => (
            <Card
               key={index}
               onFavorite={(obj) => onAddToFavorite(obj)}
               onPlus={(obj) => onAddToCard(obj)}
               {...item}
               loading={isLoading}
            />)
         )

   }
   return (

      <div className="content p-40">
         <div className="d-flex align-center justify-between mb-40">
            <h1 >{searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}</h1>
            <div className="search-block">
               <img src="/img/search.svg" alt="Search" />
               {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btn-remove.svg" alt="remove" />}
               <input onChange={onChengeSearchInput} value={searchValue} placeholder="поиск" />
            </div>
         </div>
         < div className="sneakers d-flex flex-wrap ">
            {renderItems()}
         </div>
      </div >
   )
}

export default Home;
