import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

type ModalProps = {
  children: React.ReactNode | React.ReactNode[];
  open: boolean;
  onClose: () => void;
};

export const Modal = ({ children, open, onClose }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className='sm:max-w-[425px]'>{children}</DialogContent>
    </Dialog>
  );
};
