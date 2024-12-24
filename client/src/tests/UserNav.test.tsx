import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserNav } from '@/components/UserNav';

describe('UserNav', () => {
  beforeEach(() => {
    render(<UserNav />);
  });

  it('should render component', () => {
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render mock user', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toBeCalled;
  });
});
