// import googlelogo from '../assets/logogoogle.png';
import Perfil from '@/components/Perfil';
import { UserAuth } from '../context/AuthContext';
const Home = () => {
  const { signout, user } = UserAuth();

  return (
    <div className="App">
      <Perfil
        picture={user.picture}
        fullname={user.fullname}
        email={user.email}
      />
      <img src="logo-google.png" className="w-10" alt="React logo" />
      <div className="border border-gray-500 px-4 py-3 rounded-md text-white hover:bg-blue-500">
        <button onClick={signout}>Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Home;
