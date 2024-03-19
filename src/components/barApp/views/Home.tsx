import { AdminPages, ColabPages,} from '..'
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../../../context/useContext';


export const Home = () => {
  const{user} = useAuthContext();
  
 
  return (
    <section>
      <Routes>
            {
              user.colab?.role !== 'colab' ? 
              <Route  path='/admin/*' element={<AdminPages/>} /> :
              <Route  path='/colab/*' element={<ColabPages/>} /> 
            }
              <Route  path='/*' element={<Navigate to={`/${user.colab?.role || 'admin'}`}/>} /> 
          </Routes>
    </section>
  )
}
