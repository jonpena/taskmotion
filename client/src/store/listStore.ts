import { ListProps } from '@/interfaces/list.interface';
import { create } from 'zustand';

interface ListState {
  lists: ListProps[];
  setLists: (lists: ListProps[]) => void;
}

export const useListStore = create<ListState>()((set) => ({
  lists: [],
  setLists: (lists) => set({ lists }),
}));
  