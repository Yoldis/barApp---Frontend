import { FaPlus } from "react-icons/fa";
import { ModalProps } from "../../interfaces/barInterface";
import { Buttom } from ".";
import { useEffect, useRef } from "react";


export const Modal = ({
    titleHeader, titleBtn, btnColor = 'primaryColor',  icon = <FaPlus/>, children, onResetForm, onSaveData,
    isLoading, error, setError, openModal
}:ModalProps) => {
  
    const refBtnClose = useRef<HTMLButtonElement>(null);
  
    useEffect(() => {
      if(!isLoading && error.ok) refBtnClose.current?.click();
    }, [isLoading, error.ok])

    
  const onClose = () => {
    if(onResetForm) onResetForm();
    setError({ok:true, msg:''});
  }

  return (
    <div>
      <Buttom
          btnColor={`${btnColor}`}
          icon ={ <>{icon}</> }
          name={titleBtn}
          isLoading={isLoading}
          onClickBtn={() => openModal('my_modal')}
          disabled={isLoading ? true : false}
          />

      <dialog id="my_modal" className="modal">
        <div className="modal-box text-start">

          {/* Error */}
          <div role="alert" className={`${!error.ok ? 'alert alert-error my-2' : 'hidden'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
            <span>{error.msg}</span>
          </div>

          {/* Tittle */}
          <h1 className="font-semibold text-xl">{titleHeader}</h1>
          {children}

          <Buttom
            direction="float-end mt-2"
            isLoading={isLoading}
            onClickBtn={onSaveData}
            disabled={isLoading ? true : false}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            ref={refBtnClose}
            disabled={isLoading ? true : false}
            onClick={onClose}
          >
            close
          </button>
        </form>
      </dialog>
    </div>
  );
}
