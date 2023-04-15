import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';

const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const Cart = React.lazy(() => import('./pages/Cart'));

function App() {
  return (
    <Routes>
      <Route path="/react-pizza-v2/" element={<MainLayout />}>
        <Route path="/react-pizza-v2/" element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Пицца загружается...</div>}>
              <FullPizza />
            </React.Suspense>
          }></Route>
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Корзина загружается...</div>}>
              <Cart />
            </React.Suspense>
          }></Route>
      </Route>
    </Routes>
  );
}

export default App;
