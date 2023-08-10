import { render } from '@testing-library/react';

import {
  CancelIcon,
  CopyIcon,
  IconsWrapper,
  LogoutIcon,
  NextIcon,
  PersonIcon,
  PreviousIcon,
} from './Icon';

describe('<IconsWrapper/>', () => {
  it('renders children inside an icon wrapper', () => {
    const { getByText } = render(
      <IconsWrapper>
        <span>Icon content</span>
      </IconsWrapper>,
    );

    const iconContent = getByText('Icon content');

    expect(iconContent).toBeInTheDocument();
    expect(iconContent.parentElement).toHaveClass('iconWrapper');
  });
});

describe('<Icon/>', () => {
  it('renders LogoutIcon correctly', () => {
    const { getByTestId } = render(<LogoutIcon data-testid='logout-icon' />);
    const logoutIcon = getByTestId('logout-icon');

    expect(logoutIcon).toBeInTheDocument();
    expect(logoutIcon).toHaveClass('icon');
  });

  it('renders PersonIcon correctly', () => {
    const { getByTestId } = render(<PersonIcon data-testid='icon__person' />);
    const personIcon = getByTestId('icon__person');

    expect(personIcon).toBeInTheDocument();
    expect(personIcon).toHaveClass('icon');
  });

  it('renders CopyIcon correctly', () => {
    const { getByTestId } = render(<CopyIcon data-testid='icon__copy' />);
    const copyIcon = getByTestId('icon__copy');

    expect(copyIcon).toBeInTheDocument();
    expect(copyIcon).toHaveClass('icon');
  });

  it('renders PreviousIcon correctly', () => {
    const { getByTestId } = render(
      <PreviousIcon data-testid='icon__previous' />,
    );
    const previousIcon = getByTestId('icon__previous');

    expect(previousIcon).toBeInTheDocument();
    expect(previousIcon).toHaveClass('icon');
  });

  it('renders NextIcon correctly', () => {
    const { getByTestId } = render(<NextIcon data-testid='icon__next' />);
    const nextIcon = getByTestId('icon__next');

    expect(nextIcon).toBeInTheDocument();
    expect(nextIcon).toHaveClass('icon');
  });

  it('renders CancelIcon correctly', () => {
    const { getByTestId } = render(<CancelIcon data-testid='icon__cancel' />);
    const cancelIcon = getByTestId('icon__cancel');

    expect(cancelIcon).toBeInTheDocument();
    expect(cancelIcon).toHaveClass('icon');
  });
});
