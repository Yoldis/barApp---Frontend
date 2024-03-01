import { Navigate } from "react-router-dom";
import { Alert, Buttom, Carrito, Input, SideBarColab, Stocks, Ventas } from "..";
import { InputSelectProps, LinksProps } from "../../../interfaces/barInterface";
import { LayoutPages } from "../../../layout"
import { useAuthContext, useBarContext } from "../../../context/useContext";
import { useEffect } from "react";
import { useForm } from "../../../hooks/useForm";


export const ColabPages = () => {

  const{user, loadingPassword, startChangePassword} = useAuthContext();
  const{openModal, startGetItemsCarrito, startGetVentasInDB} = useBarContext();
  const{onChangeInput, password, validate, validateForm} = useForm<{password:string}>({password:''});
  
  const savePassword = () => {
    const ok = validateForm({password});
    if(!ok) return;
    startChangePassword(password);
  };


  useEffect(() => {
    startGetItemsCarrito();
    startGetVentasInDB('', 0);
    if(!user.colab?.cambioPassword) openModal('password');
  }, []);



  const inputs:InputSelectProps[] = [
    {label:'Nueva Contraseña', placeholder:'Contraseña', name:'password', value:password, onChangeInput,  type:'text', 
    valid:validate.find(v => v.name === 'password'), tag:'input'}
];

  const routes:LinksProps[] = [
    {path:'/stock', element:<Stocks/>},
    {path:'/carrito', element:<Carrito/>},
    {path:'/ventas', element:<Ventas/>},
    {path:'/*', element:<Navigate to="/colab/stock"/>},
  ];

  return (
    <LayoutPages routes={routes} sidebar={<SideBarColab/>}>

      <Alert title={`Cambio de contraseña`} id={"password"} isloading = {loadingPassword}>
        <div className="text-center">
          {inputs.map((data) => (
            <Input key={data.name} data={data} />
          ))}
        </div>

        <Buttom
          name="Guardar"
          isLoading={loadingPassword}
          onClickBtn={savePassword}
          disabled={loadingPassword ? true : false}
        />
      </Alert>
    </LayoutPages>
  );
}
