import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '@/supabase/supabase.config';
import { userProps } from '@/interfaces/user.interface';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({
  signInWithGoogle: () => {},
  signInWithGithub: () => {},
  signout: async () => {},
  user: {
    email: '',
    fullname: '',
    picture: '',
  } as userProps,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as userProps);
  const location = useLocation();

  async function signInWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error)
        throw new Error('A ocurrido un error durante la autenticación');
      return data;
    } catch (error) {
      throw new Error('A ocurrido un error durante la autenticación');
    }
  }

  async function signInWithGithub() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error)
        throw new Error('A ocurrido un error durante la autenticación');
      return data;
    } catch (error) {
      throw new Error('A ocurrido un error durante la autenticación');
    }
  }

  const signout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error)
      throw new Error('A ocurrido un error durante el cierre de sesión');
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session === null) {
          navigate(location.pathname.includes('login') ? '/login' : '/');
          setUser({} as userProps);
        } else {
          const { user } = session;

          setUser({
            email: user.user_metadata.email,
            fullname: user.user_metadata.full_name,
            picture: user.user_metadata.picture,
          });
        }
      }
    );
    return () => {
      authListener.subscription;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signInWithGoogle, signInWithGithub, signout, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
