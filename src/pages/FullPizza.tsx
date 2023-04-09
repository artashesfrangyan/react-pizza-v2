import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addItem, selectCartItemById } from '../redux/slices/cartSlice';

const FullPizza: React.FC = () => {
  const { id }: any = useParams();
  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
  }>();
  const dispatch = useDispatch();
  const cartItem: any = useSelector(selectCartItemById(id));
  const thicknesses = ['тонкое', 'традиционное'];
  const addedCount = cartItem ? cartItem.count : 0;

  const navigate = useNavigate();
  const [activeThickness, setActiveThickness] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const onClickAdd = () => {
    const chosenItem = {
      id,
      title: item?.title,
      price: item?.price,
      imageUrl: item?.imageUrl,
      type: thicknesses[activeThickness],
      size: item?.sizes[activeSize],
    };
    dispatch(addItem(chosenItem));
  };

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://64283422161067a83b092b04.mockapi.io/items/${id}`);
        setItem(data);
      } catch (error) {
        alert('Ошибка при получении пиццы. Возвращаем вас на главную страницу');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!item) {
    return (
      <div
        style={{
          height: '400px',
        }}>
        <h1 style={{ textAlign: 'center', lineHeight: '400px' }}>Пицца загружается...</h1>
      </div>
    );
  }

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'space-around' }}>
      <img src={item.imageUrl} alt="" />
      <div>
        <h1 style={{ marginBottom: '20px' }}>{item.title}</h1>
        <div className="pizza-block__selector">
          <ul>
            {item.types.map((type: number) => (
              <li
                key={type}
                onClick={() => setActiveThickness(type)}
                className={activeThickness === type ? 'active' : ''}>
                {thicknesses[type]}
              </li>
            ))}
          </ul>
          <ul>
            {item.sizes.map((size: number, i: number) => (
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
          <div style={{ fontSize: '30px' }} className="pizza-block__price">
            {item.price} ₽
          </div>
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
    </div>
  );
};

export default FullPizza;
