import { FormEvent} from 'react';
import imgLogin from '../../assets/login-img.jpg';
import { useForm } from '../../hooks/useForm';
import { LoginInterface } from '../../interfaces/authInterface';
import { useAuthContext } from '../../context/useContext';

export const Login = () => {

  const{startLogin}  = useAuthContext();
  const {email, password, onChangeInput, validateForm, validate} = useForm<LoginInterface>({email:'', password:''});

  const onLogin = (e:FormEvent<HTMLFormElement>):void => {
      e.preventDefault();
      const ok = validateForm({email, password});
      if(!ok) return;
      // FN Login
      startLogin({email, password});
  }


  return (
    <div className="border border-primaryColor md:w-[640px] xl:max-w-sm m-auto md:mt-20 rounded-md grid md:grid-cols-[265px_auto] grid-cols-1 hover:shadow-primaryColor hover:shadow-sm transition-shadow ease-linear animate__animated animate__fadeIn">
      <div className=''>
        <img
          src={imgLogin}
          className={`object-cover md:rounded-l-md w-full xl:rounded-t-md h-[420px]`}
          alt=""
        />
      </div>

      <div className='p-4'>
        <h1 className='text-3xl text-primaryColor font-semibold text-center md:text-start'>BarApp</h1>
        <h3 className='mt-1 text-gray-400 text-center md:text-start'>Bienvenido de nuevo, inicie sesion en su cuenta.</h3>

        <form action="" className='mt-7' onSubmit={onLogin}>
            <div className='mb-5'>
                <label htmlFor="" className='ml-1 font-medium'>Email</label>
                <p className={`ml-1 my-1 text-red-600 font-medium ${!validate && !email ? '' : 'hidden'}`}>El campo es obligatorio</p>
                <input type="text" name='email' value={email} onChange={onChangeInput}  placeholder="Email" className="input input-bordered input-warning  w-full max-w-xs" />
            </div>

            <div className='mb-5'>
                <label htmlFor="" className='ml-1 font-medium'>Password</label>
                <p className={`ml-1 my-1 text-red-600 font-medium ${!validate && !password ? '' : 'hidden'}`}>El campo es obligatorio</p>
                <input type="text" placeholder="Pasword" name='password' value={password} onChange={onChangeInput} className="input  input-warning w-full max-w-xs" />
            </div>

            <div className='w-full text-center'>
                <button className="btn btn-warning  w-40 text-[16px]">Iniciar</button>
            </div>
        </form>
      </div>
    </div>
  );
}
