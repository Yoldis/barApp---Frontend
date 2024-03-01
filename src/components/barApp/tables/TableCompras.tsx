import { format } from "date-fns";
import { BtnEditDelete } from "..";
import { useBarContext } from "../../../context/useContext"
import { TableThProps } from "../../../interfaces/barInterface";
import { LayoutTable } from "../../../layout"


export const TableCompras = () => {
    const{compras, isLoading, openModal, startDeleteRegisterComprasInDB} = useBarContext();

    const thHeader:TableThProps[] = [
      {th:''}, {th:'Producto'}, {th:'Registrado'}, {th:'Proveedor'}, {th:'Nuevas Unidades'},  {th:'Unidades Vendidas'}, {th:''},
    ];

    const onEliminar = (id:string) => {
        startDeleteRegisterComprasInDB(id);
    };

  return (
    <LayoutTable thHeader={thHeader}>
        {compras.map((m, i) => (
           <tr key={m.id} className="odd:bg-white even:bg-slate-50">
           <td className="font-bold">{i + 1}</td>
           <td>
             <div className="flex items-center gap-3">
               <div className="avatar">
                 <div className="mask mask-squircle w-12 h-12">
                   <img
                     src={m.marcas.img}
                     alt={m.marcas.nombre}
                   />
                 </div>
               </div>
               <div>
                 <div className="font-bold">{m.marcas.nombre}</div>
                 <div className="text-sm text-base-400 font-medium">Disponibles:<span className="badge bg-yellow-600 text-white">x{m.unidades}</span></div>
               </div>
             </div>
           </td>
          <td><div className="font-medium ">{format(m.fecha, 'yyyy-MM-dd')} </div></td>

           <td><span className="font-semibold">{m.marcas.proveedores?.nombre}</span></td>
           <td><span className="badge bg-green-600 text-white">{m.newUnidades > 0 ? '+' + m.newUnidades : m.newUnidades}</span></td>
           <td><p className="flex font-semibold">Vendidas: <span className="badge bg-orange-500 text-white">x{m.marcas.vendidas ? m.marcas.vendidas : 0}</span></p></td>


           <td>
           <BtnEditDelete
              isLoading={isLoading}
              nombre={`Marca - ${m.marcas.nombre}`}
              id={m.id?.toString() || ''}
              openModal={openModal}
              callbackDelete={onEliminar}
              enaobleEdit={false}
            />
           </td>
         </tr>
        ))}
      </LayoutTable>
  )
}
