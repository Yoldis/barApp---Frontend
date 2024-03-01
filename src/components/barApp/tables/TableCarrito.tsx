import { useState } from "react";
import { useBarContext } from "../../../context/useContext";
import { CarritoProps, InputSelectProps, TableThProps } from "../../../interfaces/barInterface";
import { LayoutTable } from "../../../layout"
import { toastAlert } from "../../../helpers";
import { FaMinusCircle, FaPlus } from "react-icons/fa";
import { Alert, Buttom, Input } from "..";
import { useForm } from "../../../hooks/useForm";

export const TableCarrito = () => {
    const {carrito, isLoading, openModal, startAddItemsCarritoDB} = useBarContext();
    const{onChangeInput, cantidad, validate, validateForm, onResetForm} = useForm<{cantidad:string}>({cantidad:''});
    const [masOrMenos, setMasOrMenos] = useState<boolean>(false);


    const startOpenModal = (id:string, isMasOrMenos:boolean) => {
        openModal(id);
        setMasOrMenos(isMasOrMenos)
    };
  
    const onAddOrRemoveItems = (items:CarritoProps) => {
      const ok = validateForm({cantidad});
      if(!ok) return;
      if(+cantidad < 0) return toastAlert({type:2,  title:`Las unidades no pueden ser menor que cero`, description:'Unidades negativas.', });
      if(items.marcas){
        const newPrecio = +cantidad * items.marcas.venta;
  
        if(masOrMenos){
          const restoUnidades = Math.abs(items.marcas.unidades) - +cantidad;
          if(+restoUnidades < 0) return toastAlert({type:2,  title:`Las unidades no pueden ser mayor que ${items.marcas.unidades}`, description:'Unidades negativas.', });
          startAddItemsCarritoDB({marcasID:items.marcasID, cantidad:+cantidad, precio:newPrecio, unidades:restoUnidades});
        }
        else {
          const restoUnidades = Math.abs(items.marcas.unidades) + +cantidad;
          if(+cantidad > items.cantidad) return toastAlert({type:2,  title:`Las unidades no pueden ser mayor que ${items.cantidad}`, description:'Unidades negativas.', });
          startAddItemsCarritoDB({marcasID:items.marcasID, cantidad:+cantidad, precio:newPrecio, unidades:restoUnidades}, false);
        }
      }
    };

    const thHeader:TableThProps[] = [
      {th:''}, {th:'Producto'}, {th:'Total'},  {th:''},
      ];

      const inputs:InputSelectProps[] = [
        {label:`Cantidad`, placeholder:'Cantidad', name:'cantidad', value:cantidad, onChangeInput,  type:'number', 
        valid:validate.find(v => v.name === 'cantidad'), tag:'input'},
      ];

  return (
    <LayoutTable thHeader={thHeader}>
    {carrito.map((c, i) => (
      <tr key={c.marcasID} className="odd:bg-white even:bg-slate-50">
        <td className="font-bold">{i + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={c.marcas?.img}
                  alt={c.marcas?.nombre}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{c.marcas?.nombre}</div>
              <div className="badge bg-red-600 text-white font-medium text-sm"> x{c.cantidad}</div>
            </div>
          </div>
        </td>

        <td>
              <div className="text-sm flex font-medium">RD$ <span className="text-white badge bg-yellow-600">{c.precio}.00</span></div>
        </td>

        <td>
            <div className="flex items-center gap-3">
                <button onClick={() =>  startOpenModal(c.id?.toString() || '', false)} className="tooltip text-red-500 active:scale-95 transition-all ease-in-out" data-tip='Remover'>
                <FaMinusCircle />
                </button>

                <button 
                  disabled={c.marcas && c.marcas?.unidades > 0 ? false : true}
                  onClick={() => startOpenModal(c.id?.toString() || '', true)} 
                  className={`${c.marcas && c.marcas?.unidades  > 0 ? 'text-blue-500' : 'text-gray-400'} tooltip active:scale-95 transition-all ease-in-out`} data-tip='Agregar'>
                  <FaPlus />
                </button>

                <Alert title={`${!masOrMenos ? 'Remover' :  'Agregar'} ${c.marcas?.nombre}` || ''} id={c.id?.toString() || ''} isloading = {isLoading} onResetForm={onResetForm}>
                <div className="text-center">
                    <figure className="flex items-center flex-col"><img className=" h-40 w-40 object-cover rounded-xl" src={c.marcas?.img} alt={c.marcas?.nombre} /></figure>  
                    <Input data={inputs[0]} />
                </div>

                <Buttom
                    name="Guardar"
                    isLoading={isLoading}
                    onClickBtn={() => onAddOrRemoveItems(c)}
                    disabled={isLoading ? true : false}
                />
            </Alert>
        </div>
        </td>
      </tr>
    ))}
  </LayoutTable>
  )
}
