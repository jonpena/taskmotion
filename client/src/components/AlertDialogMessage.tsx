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

  const handleCancelClick = () => setOpen(false);

  const handleDeleteClick = () => {
    setOpen(false);
    handleDelete();
  };

  useEffect(() => {
    if (keydown) {
      if (open && keydown === 'Escape') handleCancelClick();
      if (open && keydown === 'Enter') handleDeleteClick();
    }
  }, [keydown]);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            <span className='ml-1 text-indigo-400'>{listTitle}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            autoFocus
            className='bg-red-500 dark:bg-red-600 hover:bg-red-700 dark:hover:bg-red-700 dark:text-neutral-200'
            onClick={handleDeleteClick}
          >
            Delete list
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
