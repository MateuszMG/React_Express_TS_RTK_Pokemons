import { ReactNode, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { pageLimitOptions } from '../../../utils/config/const';

import { NextIcon, PreviousIcon } from '../Icon/Icon';
import { SelectInput } from '../SelectInput/SelectInput';
import styles from './Pagination.module.scss';

export interface HandleRefetchData {
  limit: number;
  page: number;
}

interface PaginationProps {
  children?: ReactNode;
  handleRefetch: (data: HandleRefetchData) => void;
  limit: number;
  page: number;
  total: number;
}

export const Pagination = ({
  children,
  handleRefetch,
  limit,
  page,
  total,
}: PaginationProps) => {
  const [newLimit, setNewLimit] = useState(limit);

  const pageCount = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    handleRefetch({
      limit: newLimit,
      page: newPage,
    });
  };

  const handleLimitChange = (newLimit: number) => {
    setNewLimit(newLimit);
    handleRefetch({ limit: newLimit, page: 0 });
  };

  if (!total) return null;

  return (
    <div className={styles.wrapper}>
      <ReactPaginate
        activeClassName={styles.active}
        breakLabel={'...'}
        className={styles.pagination}
        forcePage={page}
        nextLabel={<NextIcon />}
        onPageChange={(event) => handlePageChange(event.selected)}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        previousLabel={<PreviousIcon />}
        renderOnZeroPageCount={null}
      />

      <SelectInput
        onChange={({ value }) => handleLimitChange(+value)}
        options={pageLimitOptions}
      />

      {children}
    </div>
  );
};
