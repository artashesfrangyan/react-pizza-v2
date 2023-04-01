import React from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import Cart from './pages/Cart.jsx';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
