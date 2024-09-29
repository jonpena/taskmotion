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
import { useAlertDialogStore } from '@/store/dialogStore';

export function AlertDialogMessage() {
  const { open, title, setOpen, handleDelete } = useAlertDialogStore();

  const handleCancelClick = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    handleDelete();
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            <span className='ml-1 text-indigo-600'>{title}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelClick}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600 hover:bg-red-700 text-gray-100'
            onClick={handleDeleteClick}
          >
            Delete list
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
