import { describe, it, expect, vi, beforeEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateList from '@/components/CreateList';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';

vi.mock('@/hooks/useNotification', () => ({
  useUpdateNotifications: vi.fn().mockReturnValue({
    mutate: vi.fn(),
  }),
}));

vi.mock('@/hooks/useLists', () => ({
  useLists: () => ({
    lists: [],
  }),
  useCreateList: vi.fn().mockReturnValue({
    mutate: vi.fn(),
  }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('@uidotdev/usehooks', () => ({
  useMediaQuery: vi.fn(),
}));

vi.mocked(useNavigate).mockReturnValue(vi.fn());

vi.mock('@/services/listService', () => ({
  createList: () => Promise.resolve([]),
}));

vi.mock('@/services/notificationsService', () => ({
  updateNotifications: vi.fn().mockResolvedValue([]), // O lo que esperes
}));

describe('CreateList', () => {
  beforeEach(() => {
    render(<CreateList />);
  });

  it('renders input field with correct placeholder', () => {
    expect(screen.getByPlaceholderText(/Create new list.../i)).toBeInTheDocument();
  });

  it('updates input value when typing', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.type(input, 'New List');
    expect(input).toHaveValue('New List');
  });

  it('creates new list when Enter is pressed', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.type(input, 'Creating a new list');
    await user.keyboard('{Enter}');
    expect(input).toHaveValue('');
  });

  it('creates new list when Add button is clicked', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    const addButton = screen.getByTestId('add-button');
    await user.type(input, 'New List');
    await user.click(addButton);
    expect(input).toHaveValue('');
  });

  it('focuses input when Add button is clicked with empty input', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    const addButton = screen.getByTestId('add-button');
    await user.click(addButton);
    expect(document.activeElement).toBe(input);
  });

  it('shows shortcut button on desktop devices', () => {
    cleanup();
    vi.mocked(useMediaQuery).mockReturnValue(false);
    render(<CreateList />);
    expect(screen.getByText('L')).toBeInTheDocument();
  });

  it('hides shortcut button on mobile devices', () => {
    cleanup();
    vi.mocked(useMediaQuery).mockReturnValue(true);
    render(<CreateList />);
    expect(screen.queryByText('L')).not.toBeInTheDocument();
  });

  it('trims whitespace from start of input', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.type(input, '   Test List');
    expect(input).toHaveValue('Test List');
  });

  it('should focus input when shortcut control+l is pressed', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.keyboard('{Control>}{l}{/Control}');
    expect(document.activeElement).toBe(input);
  });
});
