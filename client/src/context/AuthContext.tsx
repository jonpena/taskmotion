import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '@/supabase/supabase.config';
import { userProps } from '@/interfaces/user.interface';
import { requestUpdateList } from '@/services/requestUserLists';
import { useListStore } from '@/store/listStore';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext({
  signInWithGoogle: () => {},
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
  const { setLists } = useListStore();
  const location = useLocation();

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
          navigate('/');
          setUser({} as userProps);
        } else {
          const { user } = session;
          setUser({
            email: user.user_metadata.email,
            fullname: user.user_metadata.full_name,
            picture: user.user_metadata.picture,
          });

          const lists = await requestUpdateList(user.user_metadata.email);
          if (lists) {
            setLists(lists);
            const regex = /^\/list\/.+/;
            if (!regex.test(location.pathname)) {
              navigate(`/list/${lists[0].listId}`);
            }
          }
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
