import { FaSave } from "react-icons/fa";
import { ButtomProps } from "../../interfaces/barInterface"


export const Buttom = <T extends ButtomProps>({
    icon = <FaSave/>, name = 'Guardar', btnColor = 'bg-primaryColor', btnSize = 'btn-sm', 
    direction = 'float-end mt-2', isLoading, onClickBtn, colorText ='text-white', disabled = false
}:T) => {
  
  return (
    <div className={`${direction}`}>
      <button disabled={disabled} onClick={onClickBtn} className={`flex items-center gap-1 rounded-md 
        ${disabled ? `bg-gray-400 cursor-not-allowed` : `${btnColor} hover:${btnColor}`} ${btnSize} ${colorText} active:scale-95 transition-all ease-in-out font-medium`}>
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <>{icon}</>
        )}
        { isLoading ? 'Guardando...' : name}
      </button>
    </div>
  );
}
