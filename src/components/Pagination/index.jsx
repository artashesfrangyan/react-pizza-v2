import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

const Pagination = ({ setCurrentPage }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
export default Pagination;
