
import { useEffect, useRef } from "react";
import { AlertProps } from "../../interfaces/barInterface";


export const Alert = ({buttom, children, title, id, isloading, onResetForm}:AlertProps) => {

    const refBtnClose = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if(!isloading) refBtnClose.current?.click();
    }, [isloading]);

  return (
    <div className="">
      {buttom}
      <dialog id={id} className="modal ">
        <div className="modal-box ">
          <h3 className="font-bold text-lg">{title}</h3>
          {children}

        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={onResetForm} ref={refBtnClose} >close</button>
        </form>
      </dialog>
    </div>
  );
}
