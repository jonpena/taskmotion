import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useListStore } from '@/store/listStore';
import { useTaskStore } from '@/store/taskStore';
import ListItem from '../components/ListItem';
import { ListProps } from '@shared/list.interface';
import { useNavigate } from 'react-router-dom';

const mockTasks = [
  { id: '1', checked: false, name: 'Task 1', description: 'Description 1' },
  { id: '2', checked: true, name: 'Task 2', description: 'Description 2' },
];

const mockList: ListProps = {
  listId: '1',
  name: 'Test List',
  created_at: new Date().toISOString(),
  tasks: mockTasks,
};

// Mock the modules
vi.mock('@/store/listStore');
vi.mock('@/store/taskStore');
vi.mock('@/services/requestUpdateList');
vi.mock('@/services/requestDeleteList');

vi.mocked(useListStore).mockReturnValue({
  lists: [mockList],
  setLists: vi.fn(),
});

vi.mocked(useTaskStore).mockReturnValue({
  tasks: mockTasks,
});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: () => ({
    listId: '123e4567-e89b-12d3-a456-426614174000',
  }),
}));

vi.mocked(useNavigate).mockReturnValue(() => {});

describe('ListItem', () => {
  beforeEach(() => {
    render(<ListItem list={mockList} />);
  });

  it('renders list item with correct name', () => {
    expect(screen.getByText('Test List')).toBeInTheDocument();
  });

  it('shows input field on double click', async () => {
    const user = userEvent.setup();

    const listItem = screen.getByText('Test List');
    await user.dblClick(listItem);

    const input = screen.getByDisplayValue('Test List');
    expect(input).toBeVisible();
  });

  it('updates list name on input change and blur', async () => {
    const user = userEvent.setup();

    const listItem = screen.getByText('Test List');
    await user.dblClick(listItem);

    const input = screen.getByDisplayValue('Test List');
    await user.clear(input);
    await user.type(input, 'Updated List Name');
    await user.click(document.body); // blur the input

    expect(screen.getByText('Updated List Name')).toBeInTheDocument();
  });

  it('shows delete button on hover', async () => {
    const user = userEvent.setup();

    const listItem = screen.getByRole('listitem');
    await user.hover(listItem);

    const deleteButton = screen.getByTestId('delete-icon');
    expect(deleteButton).toBeInTheDocument();
  });

  it('shows task count when not hovering', async () => {
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
