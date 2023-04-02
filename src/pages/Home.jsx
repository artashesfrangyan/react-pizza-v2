import React from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortOption, setSortOption] = React.useState({ name: 'популярности', parameter: 'rating' });
  const [currentPage, setCurrentPage] = React.useState(1);

  const url = new URL('https://64283422161067a83b092b04.mockapi.io/items?limit=4');
  categoryId && url.searchParams.append('category', categoryId);
  sortOption && url.searchParams.append('sortBy', sortOption.parameter);
  searchValue && url.searchParams.append('title', searchValue);
  currentPage && url.searchParams.append('page', currentPage);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortOption, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} handleCategory={(id) => setCategoryId(id)} />
        <Sort value={sortOption} handleSort={(id) => setSortOption(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <div id="container">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default Home;
