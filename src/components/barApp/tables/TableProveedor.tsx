import { ProveedorProps,  TableThProps } from "../../../interfaces/barInterface"
import { LayoutTable } from "../../../layout"
import { useBarContext } from "../../../context/useContext";
import { BtnEditDelete } from "..";

interface TableChildrenProps {
    setform:(data:ProveedorProps) => void,
  }

export const TableProveedor = <T extends TableChildrenProps>({setform}:T) => {
    const {proveedores, openModal, isLoading, startDeleteProveeInDb} = useBarContext();

    const onEdit = (provee:ProveedorProps) => {
      setform(provee);
      openModal('my_modal');
    }
  
    const onDelete = (id:string) => {
      startDeleteProveeInDb(id);
    }
  
    const thHeader:TableThProps[] = [
      {th:''}, {th:'Nombre'}, {th:'Direccion'}, {th:'Email'}, {th:'Telefono'}, {th:''},
      ];
  
  
    return (
      <LayoutTable thHeader={thHeader}>
        {proveedores.map((provee, i) => (
          <tr key={provee.email} className="odd:bg-white even:bg-slate-50">
            <th>{i + 1}</th>
            <td>{provee.nombre}</td>
            <td>{provee.direccion}</td>
            <td>{provee.email}</td>
            <td>{provee.telefono}</td>
            
            <td>
              <BtnEditDelete
                isLoading={isLoading}
                nombre={`a - ${provee.nombre}`}
                id={provee.id?.toString() || ''}
                openModal={openModal}
                callbackDelete={onDelete}
                callbackEdit={() => onEdit(provee)}
              />
            </td>
          </tr>
        ))}
      </LayoutTable>
    );
  }
