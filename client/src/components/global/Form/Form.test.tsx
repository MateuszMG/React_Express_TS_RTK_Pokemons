import { render } from '@testing-library/react';

import { Form } from './Form';

describe('<Form/>', () => {
  it('renders children and applies className', () => {
    const { getByText } = render(
      <Form className='custom-class'>
        <div>Form content</div>
      </Form>,
    );

    const formElement = getByText('Form content');
    expect(formElement).toBeInTheDocument();
    expect(formElement.parentElement).toHaveClass('custom-class');
  });

  it('applies default className', () => {
    const { container } = render(
      <Form>
        <div>Form content</div>
      </Form>,
    );

    expect(container.firstChild).toHaveClass('form');
  });
});

describe('<Form.ButtonsWrapper/>', () => {
  it('renders children inside a buttons wrapper', () => {
    const { getByText } = render(
      <Form>
        <Form.ButtonsWrapper>
          <button>Button 1</button>
          <button>Button 2</button>
        </Form.ButtonsWrapper>
      </Form>,
    );

    const button1 = getByText('Button 1');
    const button2 = getByText('Button 2');

    expect(button1).toBeInTheDocument();
    expect(button1.parentElement).toHaveClass('buttonsWrapper');
    expect(button2).toBeInTheDocument();
    expect(button2.parentElement).toHaveClass('buttonsWrapper');
  });
});
