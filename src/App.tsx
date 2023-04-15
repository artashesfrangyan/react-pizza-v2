import React from 'react';

import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import './scss/app.scss';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

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
