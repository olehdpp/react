import Header from './components/Header';
import Drawer from './components/Drawer';
import React from 'react';
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from './context';
import Orders from './pages/Orders';



function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(true);


  React.useEffect(() => {
    async function fetchData() {
      const cartRespons = await axios.get("https://61f7a2cb39431d0017eaf920.mockapi.io/cart");
      const favoriteRespons = await axios.get("https://61f7a2cb39431d0017eaf920.mockapi.io/favorites");
      const itemsRespons = await axios.get("https://61f7a2cb39431d0017eaf920.mockapi.io/items");

      setisLoading(false)

      setCartItems(cartRespons.data);
      setFavorites(favoriteRespons.data);
      setItems(itemsRespons.data);
    }
    fetchData();
  }, []);
  const onRemoveItem = (id) => {
    axios.delete(`https://61f7a2cb39431d0017eaf920.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };
  const onAddToCard = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://61f7a2cb39431d0017eaf920.mockapi.io/cart/${obj.id}`)
      setCartItems((prev) => [...prev.filter(item => Number(item.id) != Number(obj.id))]);

    } else {
      axios.post("https://61f7a2cb39431d0017eaf920.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favobj => favobj.id === obj.id)) {
        axios.delete(`https://61f7a2cb39431d0017eaf920.mockapi.io/favorites/${obj.id}`)

      } else {
        const { data } = await axios.post("https://61f7a2cb39431d0017eaf920.mockapi.io/favorites", obj)
        setFavorites((prev) => [...prev, data]);
      }

    } catch (error) {
      alert("error")
    }
  };

  const onChengeSearchInput = (event) => {
    setSearchValue(event.target.value)
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems }}><div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <Routes>
        <Route path='/' exact element={<Home cartItems={cartItems} items={items} searchValue={searchValue} setSearchValue={setSearchValue}
          onChengeSearchInput={onChengeSearchInput} onAddToFavorite={onAddToFavorite} onAddToCard={onAddToCard} isLoading={isLoading} />} />
        <Route path='/favorites' exact element={<Favorites />} />
        <Route path='/orders' exact element={<Orders />} />
      </Routes>
    </div >
    </AppContext.Provider>
  );

}

export default App;
