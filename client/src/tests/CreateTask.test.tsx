import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateTask from '@/components/CreateTask';
import { useMediaQuery } from '@uidotdev/usehooks';

vi.mock('@/store/listStore', () => ({
  useListStore: () => ({
    lists: [],
    setLists: vi.fn(),
  }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: () => ({
    listId: '123e4567-e89b-12d3-a456-426614174000',
  }),
}));

vi.mock('@/hooks/useShortcut', () => ({
  useShortcut: vi.fn(),
}));

vi.mock('@uidotdev/usehooks', () => ({
  useMediaQuery: vi.fn(),
}));

describe('CreateTask', () => {
  beforeEach(() => {
    render(<CreateTask />);
  });

  it('renders input field with correct placeholder', () => {
    expect(
      screen.getByPlaceholderText('Create new task...')
    ).toBeInTheDocument();
  });

  it('updates input value when typing', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    await user.type(input, 'New Task');
    expect(input).toHaveValue('New Task');
  });

  it('creates new task when Enter is pressed', async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Create new task...');
    await user.type(input, 'new task');
    await user.keyboard('{Enter}');
    expect(input).toHaveValue('');
  });

  it('creates new task when Add button is clicked', async () => {
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    const addButton = screen.getByTestId('add-button');
    await user.type(input, 'new Task');
    await user.click(addButton);
    expect(input).toHaveValue('');
  });

  it('focuses input when Add button is clicked with empty input', async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Create new task...');
    const addButton = screen.getByTestId('add-button');
    await user.click(addButton);
    expect(document.activeElement).toBe(input);
  });

  it('shows shortcut button on desktop devices', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);

    expect(screen.getByText('E')).toBeInTheDocument();
  });

  it('hides shortcut button on mobile devices', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);

    expect(screen.queryByText('E')).not.toBeInTheDocument();
  });

  it('trims whitespace from start of input', async () => {
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText('Create new task...');

    await user.type(input, '   Creating a new task');
    expect(input).toHaveValue('Creating a new task');
  });
});
