import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { options } from '../components/Sort';
import Pagination from '../components/Pagination';

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectFilter,
} from '../redux/slices/filterSlice';
import { fetchItems, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import { ItemProps } from '../types/ItemProps';

const Home = () => {
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { sortOption, categoryId, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = React.useCallback((id: number) => dispatch(setCategoryId(id)), []);

  const getPizzas = async () => {
    let url = new URL('https://64283422161067a83b092b04.mockapi.io/items?limit=4');
    categoryId && url.searchParams.append('category', categoryId.toString());
    sortOption && url.searchParams.append('sortBy', sortOption.parameter);
    searchValue && url.searchParams.append('title', searchValue);
    currentPage && url.searchParams.append('page', currentPage.toString());

    dispatch(fetchItems(url.href));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params: any = qs.parse(window.location.search.substring(1));
      const sortOption = options.find((obj) => obj.parameter === params.parameter);

      dispatch(
        setFilters({
          ...params,
          sortOption,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) getPizzas();

    isSearch.current = false;
  }, [categoryId, sortOption, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        parameter: sortOption.parameter,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortOption, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} handleCategory={onChangeCategory} />
        <Sort value={sortOption} />
      </div>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось загрузить пиццы. Пожалуйста, повторите попытку позже</p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === 'loading'
              ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
              : items.map((item: ItemProps) => <PizzaBlock key={item.id} {...item} />)}
          </div>
          <div id="container">
            <Pagination setCurrentPage={(id: number) => dispatch(setCurrentPage(id))} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
