import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState();

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
    </div>
  );
};

export default FullPizza;
