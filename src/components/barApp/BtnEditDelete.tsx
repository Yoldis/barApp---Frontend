import { FaTrashAlt } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { BtnEditDeleteProps } from "../../interfaces/barInterface"
import { Alert, Buttom } from "."



export const BtnEditDelete = ({callbackDelete, callbackEdit, children, 
  openModal, id, nombre, contenidoModal, isLoading, enaobleEdit = true}:BtnEditDeleteProps) => {
  return (
    <div className="flex items-center gap-x-2.5">
      {children}

      <button
        onClick={callbackEdit}
        className={`text-gray-500 tooltip ${enaobleEdit ? '' : 'hidden'}`}
        data-tip="Editar"
      >
        <MdEdit />
      </button>

      <Alert
        buttom={
          <button
            onClick={() => openModal(id)}
            className="text-red-600 tooltip tooltip-error"
            data-tip="Eliminar"
          >
            <FaTrashAlt />
          </button>
        }
        title={`Eliminar ${nombre}`}
        id={id}
      >
        {contenidoModal}

        <Buttom
            name="Eliminar"
            btnColor="bg-red-500"
            icon={<FaTrashAlt/>}
            direction="float-end mt-2"
            isLoading={isLoading}
            onClickBtn={() => callbackDelete(id)}
            disabled={isLoading ? true : false}
          />
      </Alert>
    </div>
  );
}
