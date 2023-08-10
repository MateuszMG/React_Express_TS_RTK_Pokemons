import { fireEvent, render, waitFor } from '@testing-library/react';

import { pageSizeOptions } from '../../../utils/config/const';

import { Pagination } from './Pagination';

const mockHandleRefetch = jest.fn();
const mockLoading = false;
const mockPage = 1;
const mockTotal = 20;

describe('<Pagination/>', () => {
  it('calls handleRefetch with updated page when clicking pagination', async () => {
    const { getByText } = render(
      <Pagination
        handleRefetch={mockHandleRefetch}
        loading={mockLoading}
        page={mockPage}
        total={mockTotal}
      />,
    );

    const nextPageButton = getByText('2');
    fireEvent.click(nextPageButton);

    await waitFor(() => {
      expect(mockHandleRefetch).toHaveBeenCalledWith({
        pageSize: 10,
        page: 2,
      });
    });
  });

  it('calls handleRefetch with updated pageSize when changing select input', async () => {
    const { getByTestId } = render(
      <Pagination
        handleRefetch={mockHandleRefetch}
        loading={mockLoading}
        page={mockPage}
        total={mockTotal}
      />,
    );

    const selectInput = getByTestId('select__pagination');
    fireEvent.keyDown(selectInput.firstChild!, { key: 'ArrowDown' });
    const option = getByTestId(`option__${pageSizeOptions[2].label}`);
    fireEvent.click(option);

    await waitFor(() => {
      expect(mockHandleRefetch).toHaveBeenCalledWith({
        pageSize: +pageSizeOptions[2].value,
        page: 1,
      });
    });
  });

  it('does not call handleRefetch when loading is true', () => {
    const { getByText } = render(
      <Pagination
        handleRefetch={mockHandleRefetch}
        loading={true}
        page={mockPage}
        total={mockTotal}
      />,
    );

    const nextPageButton = getByText('2');
    fireEvent.click(nextPageButton);

    expect(mockHandleRefetch).not.toHaveBeenCalled();
  });

  it('does not allow page change during loading', () => {
    const { getByText } = render(
      <Pagination
        handleRefetch={mockHandleRefetch}
        loading={true}
        page={mockPage}
        total={mockTotal}
      />,
    );

    const nextPageButton = getByText('2');
    fireEvent.click(nextPageButton);

    expect(mockHandleRefetch).not.toHaveBeenCalled();
  });

  it('does not allow page size change during loading', () => {
    const { getByTestId } = render(
      <Pagination
        handleRefetch={mockHandleRefetch}
        loading={true}
        page={mockPage}
        total={mockTotal}
      />,
    );

    const selectInput = getByTestId('select__pagination');
    fireEvent.keyDown(selectInput.firstChild!, { key: 'ArrowDown' });
    const option = getByTestId(`option__${pageSizeOptions[2].label}`);
    fireEvent.click(option);

    expect(mockHandleRefetch).not.toHaveBeenCalled();
  });
});
