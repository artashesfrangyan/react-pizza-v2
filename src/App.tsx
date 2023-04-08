import React from 'react';

import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Cart from './pages/Cart.jsx';

import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="pizza/:id" element={<FullPizza />}></Route>
        <Route path="cart" element={<Cart />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
