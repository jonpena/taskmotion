import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAlertDialogStore } from '@/store/dialogStore';
import UserWelcome from '@/components/UserWelcome';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const mockUser = {
  fullname: 'John Doe',
};

vi.mock('@/store/dialogStore', () => ({
  useAlertDialogStore: vi.fn(),
}));

vi.mocked(useAlertDialogStore).mockReturnValue({
  title: 'My list',
});

vi.mock('@/utils/getGreeting', () => ({
  getGreeting: () => 'Good morning!',
}));

vi.mock('@uidotdev/usehooks', () => ({
  useDocumentTitle: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('@/context/AuthContext', () => ({
  UserAuth: () => ({
    user: mockUser,
  }),
}));

describe('UserWelcome', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render user name when listId is home', () => {
    vi.mocked(useParams).mockReturnValue({ listId: 'home' });
    render(<UserWelcome />);
    expect(screen.getByText(mockUser?.fullname)).toBeInTheDocument();
  });

  it('should render list name when listId is not home', () => {
    vi.mocked(useParams).mockReturnValue({
      listId: '123e4567-e89b-12d3-a456-426614174000',
    });
    render(<UserWelcome />);
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render greeting message', () => {
    render(<UserWelcome />);
    const formatedDate = format(new Date(), 'EEEE, MMMM d');
    expect(
      screen.getByText(`Good morning! Today is ${formatedDate}`)
    ).toBeInTheDocument();
  });
});
