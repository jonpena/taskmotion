import { UserAuth } from '../context/AuthContext';

const Login = () => {
  const { signInWithGoogle } = UserAuth();

  return (
    <div className="w-full h-screen flex flex-col gap-y-5  justify-center items-center bg-gray-800">
      <h1 className="text-white text-5xl">TASKMOTION</h1>
      <img src="logo-google.png" className="w-10" alt="React logo" />
      <div className="border border-gray-500 px-4 py-3 rounded-md text-white hover:bg-blue-500">
        <button onClick={signInWithGoogle}>Iniciar con Google</button>
      </div>
    </div>
  );
};

export default Login;
