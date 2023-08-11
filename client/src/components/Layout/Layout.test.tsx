import { MemoryRouter } from 'react-router-dom';

import { renderWithProviders } from '../../utils/tests/renderWithProviders';

import { Layout } from './Layout';

const Ui = () => (
  <MemoryRouter>
    <Layout>
      <div data-testid='content'>Content</div>
    </Layout>
  </MemoryRouter>
);

describe('<Layout/>', () => {
  it('should render navigation, content, and footer', () => {
    const { getByTestId } = renderWithProviders(<Ui />);

    const navigation = getByTestId('navigation');
    const content = getByTestId('content');
    const footer = getByTestId('footer');

    expect(navigation).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });
});
