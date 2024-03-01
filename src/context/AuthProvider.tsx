import { PropsWithChildren, useState } from "react"
import { AuthContext } from "./useContext"
import { changePassword, checkingSession, loginWithEmailAndPassowrd, signOut } from "../supabase/authProvider"
import { LoginInterface, UserAuth } from "../interfaces/authInterface";



export const AuthProvider = ({children}:PropsWithChildren) => {
  const [user, setuser] = useState<UserAuth>({session:null});
  const [checking, setChecking] = useState<string|null>(null);
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);
  // const [error, setError] = useState();
  
  // Login
  const startLogin = async (payload: LoginInterface) => {
    setChecking('checking');
    const { ok, data, error, colab } = await loginWithEmailAndPassowrd(payload);
    if (!ok || error) {
      // console.log(error)
      setChecking(null);
      return;
    }
  
    if (data && data.session !== undefined && data.session !== null) {
      setuser({session:data.session, colab:colab ? colab[0]: null });
      setChecking(data.session.user.aud);
    }
  };

  // Checkear Usuario
  const startCheckingSession = async() => {
    setChecking('checking');
    const{ok, data, error, colab} = await checkingSession();
    if (!ok || error) {
      setChecking(null);
      return;
    }
    if(data && data?.session !== undefined && data.session !== null){
      setuser({session:data.session, colab: colab ? colab[0] :null });
      setChecking(data.session.user.aud);
    }
    else setChecking(null);
  }


  // Cambiar contrasena
  const startChangePassword = async(password:string) => {
    setLoadingPassword(true);
    let userId:string= '';
    if(user.colab?.userId) userId = user.colab?.userId;
    const{ok,  error,} = await changePassword(password, userId);
    if (!ok || error) {
      setLoadingPassword(false);
      return;
    }
    setLoadingPassword(false);
  }

  // Cerrar Sesion
  const startSignOut = async() => {
    setChecking('checking');
    const{ok, error} = await signOut(user.colab?.userId);
    if (!ok || error) {
      setChecking(null);
      return;
    }
    setChecking(null);
    setuser({session:null});
    setLoadingPassword(false);
  };


  return (
    <AuthContext.Provider value={{
      user,
      checking,
      startLogin,
      startCheckingSession,
      startSignOut,
      loadingPassword,
      startChangePassword
    }}>
        {children}
    </AuthContext.Provider>
  )
}


