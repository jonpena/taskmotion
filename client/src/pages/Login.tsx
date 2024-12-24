import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GithubIcon } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '@/context/AuthContext';

const Login = () => {
  const { signInWithGoogle } = UserAuth();
  const navigate = useNavigate();

  const handleClose = () => navigate('/');

  return (
    <Modal open={true} onClose={handleClose}>
      <Card className='w-full mx-auto shadow-none border-none'>
        <CardHeader className='text-center'>
          <CardTitle>Login</CardTitle>
          <CardDescription>Choose a provider to sign in</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4 shadow-none'>
          <Button
            variant='outline'
            className='flex items-center justify-center gap-2'
            onClick={signInWithGoogle}
          >
            <img src='/google.svg' alt='google' width={20} height={20} />
            Sign in with Google
          </Button>
          <Button
            disabled
            variant='outline'
            className='flex items-center justify-center gap-2'
          >
            <GithubIcon className='w-5 h-5' />
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default Login;
