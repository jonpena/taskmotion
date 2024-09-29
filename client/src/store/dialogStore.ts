import { create } from 'zustand';

interface AlertDialogState {
  title: string;
  open: boolean;
  handleDelete: () => void;
  setOpen: (open: boolean) => void;
  setHandleDelete: (fn: () => void) => void;
  setTitle: (title: string) => void;
}

export const useAlertDialogStore = create<AlertDialogState>()((set) => ({
  title: '',
  open: false,
  handleDelete: () => {},
  setTitle(title) {
    set(() => ({ title }));
  },
  setOpen: (open) => set(() => ({ open })),
  // Función para actualizar la referencia a handleDelete
  setHandleDelete: (fn) => set(() => ({ handleDelete: fn })),
}));
