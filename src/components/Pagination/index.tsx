import React from 'react';
import ReactPaginate from 'react-paginate';
import style from './Pagination.module.scss';

type PaginationProps = {
  setCurrentPage: (event: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ setCurrentPage }) => {
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
