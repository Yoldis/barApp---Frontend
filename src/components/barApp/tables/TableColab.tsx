import { ColabProps, TableThProps } from "../../../interfaces/barInterface"
import { LayoutTable } from "../../../layout"
import { useBarContext } from "../../../context/useContext";
import { BtnEditDelete } from "..";
import { format } from "date-fns";

interface TableChildrenProps {
  setform:(data:ColabProps) => void
}


export const TableColab = <T extends TableChildrenProps >({setform}:T) => {

  const {colaboradores, openModal, isLoading, startDeleteColabInDb} = useBarContext();

  const onEdit = (colab:ColabProps) => {
    const{horaEntrada, horaSalida, ...restColab} = colab;
    if(horaEntrada || horaSalida) setform(colab);
    else setform(restColab);
    
    openModal('my_modal');
  }

  const onDelete = (id:string) => {
    startDeleteColabInDb(id);
  }

  const thHeader:TableThProps[] = [
    {th:''}, {th:'Nombre'}, {th:'Dni'}, {th:'Contacto'}, {th:'Ho.Entrada'}, {th:'Ho.Salida'},   {th:'Usuario'},
        {th:''},
    ];


  return (
    <LayoutTable thHeader={thHeader}>
      {colaboradores.map((c, i) => (
        <>
        <tr key={c.email} className="odd:bg-white even:bg-slate-50">
          <th>{i + 1}</th>
          <td>{c.nombre} {c.apellido}</td>
          <td>{c.dni}</td>
          <td>{c.telefono} {c.email} </td>
          <td>{format(c.horaEntrada || '', 'yyyy-MM-dd hh:mm aa')}</td>
          <td>{format(c.horaSalida || '', 'yyyy-MM-dd hh:mm aa')}</td>
          <td>{c.usuario}</td>
          <td>
            <BtnEditDelete
              isLoading={isLoading}
              nombre={`a - ${c.nombre} ${c.apellido}`}
              id={c.email}
              openModal={openModal}
              callbackDelete={onDelete}
              callbackEdit={() => onEdit(c)}
              />
          </td>
        </tr>

        
        </>
      ))}
    </LayoutTable>
  );
}
