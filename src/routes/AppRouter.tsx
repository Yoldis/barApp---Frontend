import { Route, Routes } from 'react-router-dom'
import { Home } from '../components/barApp';
import { Login } from '../components/auth/Login';
import { useEffect } from 'react';
import { useAuthContext } from '../context/useContext';

export const AppRouter = () => {
  const{checking, startCheckingSession} = useAuthContext();
    
    useEffect(() => {
      startCheckingSession();
    }, []);
    

    if(checking === 'checking'){
      return (
        <div className='m-auto text-center min-h-screen bg-gray-200 w-full'>
          <span className="loading loading-spinner loading-lg text-primaryColor mt-60"></span>
        </div>
      )
    }

    
  return (
    <Routes>
      {checking === "authenticated" ? (
          <Route path="/*" element={<Home />} />
      ) : (
          <Route path="/auth/login" element={<Login />} />
          )}
          {/* <Route path="/*" element={<Navigate to={"/auth/login"} />} /> */}
    </Routes>
  );
}
