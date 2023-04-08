import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem, selectCartItemById } from '../redux/slices/cartSlice';

const FullPizza = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState();
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const thicknesses = ['тонкое', 'традиционное'];
  const addedCount = cartItem ? cartItem.count : 0;

  const [activeThickness, setActiveThickness] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const onClickAdd = () => {
    const chosenItem = {
      id,
      title: item.title,
      price: item.price,
      imageUrl: item.imageUrl,
      type: thicknesses[activeThickness],
      size: item.sizes[activeSize],
    };
    dispatch(addItem(chosenItem));
  };

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://64283422161067a83b092b04.mockapi.io/items/${id}`);
        setItem(data);
      } catch (error) {
        console.log('Ошибка при получении пиццы');
      }
    }

    fetchPizza();
  }, []);

  if (!item) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={item.imageUrl} alt="" />
      <h2>{item.title}</h2>
      <h4>{item.price} ₽</h4>
      <div className="pizza-block__selector">
        <ul>
          {item.types.map((type) => (
            <li
              key={type}
              onClick={() => setActiveThickness(type)}
              className={activeThickness === type ? 'active' : ''}>
              {thicknesses[type]}
            </li>
          ))}
        </ul>
        <ul>
          {item.sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}>
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {item.price} ₽</div>
        <button onClick={() => onClickAdd()} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default FullPizza;
