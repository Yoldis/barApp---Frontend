import { MarcasProps,  TableThProps } from "../../../interfaces/barInterface"
import { LayoutTable } from "../../../layout"
import { useBarContext } from "../../../context/useContext";
import { BtnEditDelete } from "..";

interface TableChildrenProps {
    setform:(data:MarcasProps) => void,
  }

export const TableMarcas = <T extends TableChildrenProps>({setform}:T) => {
    const {marcas, openModal, isLoading, startDeleteMarcaInDB} = useBarContext();

    const onEdit = (marca:MarcasProps) => {
      setform({...marca, newUnidades:0});
      openModal('my_modal');
    }
  
    const onDelete = (id:string) => {
      startDeleteMarcaInDB(id);
    }
  
    const thHeader:TableThProps[] = [
      {th:''}, {th:'Nombre'}, {th:'Proveedor'}, {th:'Compra'}, {th:'Venta'},  {th:'Unidades Vendidas'}, {th:''},
      ];
  
  
    return (
      <LayoutTable thHeader={thHeader}>
        {marcas.map((m, i) => (
          <tr key={m.nombre} className="odd:bg-white even:bg-slate-50">
            <td className="font-bold">{i + 1}</td>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={m.img}
                      alt={m.nombre}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{m.nombre}</div>
                  <div className="text-sm text-base-400 font-medium">Disponibles:<span className="badge bg-yellow-600 text-white">x{m.unidades}</span></div>
                </div>
              </div>
            </td>

            <td><span className="font-semibold">{m.proveedores?.nombre}</span></td>
            <td><p className="flex font-semibold">RD$ <span className="badge bg-red-600 text-white">{m.compra}.00</span></p></td>
            <td><p className="flex font-semibold">RD$ <span className="badge bg-green-600 text-white">{m.venta}.00</span></p></td>
            <td><p className="flex font-semibold">Vendidas: <span className="badge bg-orange-500 text-white">x{m.vendidas ? m.vendidas : 0}</span></p></td>

            <td>
              <BtnEditDelete
                isLoading={isLoading}
                nombre={`el Producto - ${m.nombre}`}
                id={m.id ? m.id?.toString(): ''}
                openModal={openModal}
                callbackDelete={onDelete}
                callbackEdit={() => onEdit(m)}
              />
            </td>
          </tr>
        ))}
      </LayoutTable>
    );
  }
