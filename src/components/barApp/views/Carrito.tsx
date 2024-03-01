import { FaShoppingCart } from "react-icons/fa";
import { Buttom, Input, TableCarrito } from ".."
import { useBarContext } from "../../../context/useContext";
import { useForm } from "../../../hooks/useForm";
import {  InputSelectProps } from "../../../interfaces/barInterface";
import { LayoutTable } from "../../../layout";


export const Carrito = () => {
  const{carrito, startRegisterVentasInDb, isLoading} = useBarContext();
  const{onChangeInput, cliente, validate, validateForm} = useForm<{cliente:string}>({cliente:''});

  const onVenderItems = () => {
    const ok = validateForm({cliente});
    if(!ok) return;
    startRegisterVentasInDb(carrito, cliente);
  }
  
  const total:number = carrito.reduce((acc , num) => {
    return acc + num.precio;
  }, 0);

  const items:number = carrito.reduce((acc , num) => {
    return acc + num.cantidad;
  }, 0);

  const inputs:InputSelectProps[] = [

    {label:`Cliente`, placeholder:'Nombre Cliente', name:'cliente', value:cliente, onChangeInput,  type:'text', 
    valid:validate.find(v => v.name === 'cliente'), tag:'input'}
  ];


  return (
    <section className={`animate__animated animate__fadeIn`}>
  
      <div className="my-5 mx-4 flex justify-between gap-2 items-center">
      <h1 className="md:text-2xl text-lg font-bold border-b border-b-primaryColor flex items-center gap-1.5">
        <FaShoppingCart className={`text-primaryColor`}/>
        Carrito
      </h1>
       
        <Buttom
            btnColor="bg-blue-500"
            name="Guardar"
            isLoading={isLoading}
            onClickBtn={onVenderItems}
            disabled ={!carrito.length || isLoading  ? true : false }
            />
      </div>

          <div className="mb-3 m-auto w-1/2 text-center">
              <Input data={inputs[0]} />
          </div>
      
      <TableCarrito />
      <LayoutTable>
        <tr className={`bg-blue-100`}>
          <td className="font-bold">{carrito.length + 1}</td>
          <td>
              <p className="font-bold">Unidades: <span className="badge bg-blue-500 text-white">x{items}</span></p>
          </td>

          <td>
              <p className="font-bold">Total: <span className="badge bg-blue-500 text-white">RD$ {total}.00</span></p>
          </td>
        </tr>
    </LayoutTable>
  </section>
  )
}
