import { useState } from 'react';
import ReactPaginate from 'react-paginate';

import {
  defaultPage,
  defaultPageSize,
  defaultPageSizeOption,
  pageSizeOptions,
} from '../../../utils/config/const';

import { NextIcon, PreviousIcon } from '../Icon/Icon';
import { SelectInput } from '../SelectInput/SelectInput';
import styles from './Pagination.module.scss';

export interface HandleRefetchFilter {
  pageSize: number;
  page: number;
}

interface PaginationProps {
  handleRefetch: (data: HandleRefetchFilter) => void;
  loading: boolean;
  page: number;
  total: number;
}

export const Pagination = ({
  handleRefetch,
  loading,
  page,
  total,
}: PaginationProps) => {
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const pageCount = Math.ceil(total / pageSize);

  const handlePageChange = (newPage: number) => {
    if (loading) return;
    handleRefetch({ pageSize, page: ++newPage });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (loading) return;
    setPageSize(newPageSize);
    handleRefetch({ pageSize: newPageSize, page: defaultPage });
  };

  return (
    <div className={styles.wrapper}>
      <ReactPaginate
        activeClassName={styles.active}
        breakLabel={'...'}
        className={styles.pagination}
        forcePage={--page}
        nextLabel={<NextIcon />}
        onPageChange={(event) => handlePageChange(event.selected)}
        pageCount={pageCount}
        pageRangeDisplayed={4}
        marginPagesDisplayed={1}
        previousLabel={<PreviousIcon />}
        renderOnZeroPageCount={null}
      />

      <SelectInput
        defaultValue={defaultPageSizeOption}
        onChange={({ value }) => handlePageSizeChange(+value)}
        options={pageSizeOptions}
      />
    </div>
  );
};
