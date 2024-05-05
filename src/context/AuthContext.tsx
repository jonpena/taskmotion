import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '@/supabase/supabase.config';
import { useNavigate } from 'react-router-dom';
import { userProps } from '@/interfaces/user.interface';

const AuthContext = createContext({
  signInWithGoogle: () => {},
  signout: async () => {},
  user: {} as userProps,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as userProps);

  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error)
        throw new Error('A ocurrido un error durante la autenticación');
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();

    if (error)
      throw new Error('A ocurrido un error durante el cierre de sesión');
  }

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(event, session);
        if (session === null) {
          // navigate('/', { replace: true });
        } else {
          const { user } = session;
          setUser({
            email: user.user_metadata.email,
            fullname: user.user_metadata.full_name,
            picture: user.user_metadata.picture,
          });

          navigate('/board');
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signInWithGoogle, signout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
