import { describe, it, expect, beforeEach, test } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
// import CreateList from '@/components/CreateList';

const Welcome = () => {
  return (
    <>
      <div>Welcome</div>
      <input type='text' />
    </>
  );
};

describe('CreateList', () => {
  beforeEach(() => {
    render(<Welcome />);
  });

  it('should render component', () => {
    // Agrega una aserción real para verificar que el componente se renderiza
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('should render input', () => {
    screen.getByRole('textbox');
  });

  test('should to focus input and write hello and get hello value', () => {
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'hello' } });
    expect(input).toHaveValue('hello');
  });
});
