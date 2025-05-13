import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useShortcut } from '@/hooks/useShortcut';
import { useAlertDialogStore } from '@/store/dialogStore';
import { useEffect } from 'react';

export function AlertDialogMessage() {
  const { open, listTitle, setOpen, handleDelete } = useAlertDialogStore();
  const keydown = useShortcut(['Escape', 'Enter']);

  const handleDeleteClick = () => {
    handleDelete();
    setOpen(false);
  };

  useEffect(() => {
    if (keydown && open && keydown === 'Escape') setOpen(false);
  }, [keydown]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            <span className='text-neutral-200 font-bold'> {listTitle} </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='!bg-red-600 !hover:bg-red-700 dark:text-neutral-200'
            autoFocus
            onClick={handleDeleteClick}
          >
            Delete list
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
