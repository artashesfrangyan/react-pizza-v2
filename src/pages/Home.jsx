import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setSortOption, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { sortOption, categoryId, currentPage } = useSelector((state) => state.filterSlice);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const url = new URL('https://64283422161067a83b092b04.mockapi.io/items?limit=4');

  categoryId && url.searchParams.append('category', categoryId);
  sortOption && url.searchParams.append('sortBy', sortOption.parameter);
  searchValue && url.searchParams.append('title', searchValue);
  currentPage && url.searchParams.append('page', currentPage);

  React.useEffect(() => {
    setIsLoading(true);
    axios.get(url).then(({ data }) => {
      setItems(data);
      setIsLoading();
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortOption, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} handleCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort value={sortOption} handleSort={(id) => dispatch(setSortOption(id))} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <div id="container">
        <Pagination setCurrentPage={(id) => dispatch(setCurrentPage(id))} />
      </div>
    </div>
  );
};

export default Home;
