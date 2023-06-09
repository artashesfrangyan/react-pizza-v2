import React from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Корзина загружается...</div>,
});
const FullPizza = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'),
  loading: () => <div>Пицца загружается...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/react-pizza-v2/" element={<MainLayout />}>
        <Route path="/react-pizza-v2/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="pizza/:id" element={<FullPizza />}></Route>
        <Route path="cart" element={<Cart />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
