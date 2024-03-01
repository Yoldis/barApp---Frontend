import { useEffect, useState } from "react";
import { ComprasProps, MarcasProps, ventasProps } from "../../interfaces/barInterface";

interface PaginacionProps {
    fnPaginacion:(search:string, pagina:number) => void,
    isLoading:boolean,
    array:MarcasProps[]|ComprasProps[]|ventasProps[]
}

export const Paginacion = ({isLoading, fnPaginacion, array}:PaginacionProps) => {
    const [pagina, setPagina] = useState<number>(0);
    const [numPag, setNumPag] = useState<number>(1);
    const [primeraVez, setPrimeraVez] = useState<boolean>(true);

    const onPaginacion = (next:boolean) => {
        if(next) {
          if(!array.length) return;
          setPagina(pagina + 5);
          setNumPag(numPag + 1);
          setPrimeraVez(false);
        } 
        else {
          if(!pagina) return;
          setPagina(pagina - 5);
          setNumPag(numPag - 1);
          setPrimeraVez(false);
        }
      }
    
      useEffect(() => {
        if(primeraVez || pagina < 0) return;
        fnPaginacion('', pagina);
      }, [pagina]);

  return (
    <div className="join">
    <button 
      disabled={isLoading ? true : false}
      onClick={() => onPaginacion(false)} className="join-item btn">
      {isLoading ? <span className="loading loading-spinner loading-md"></span> : <>«</>}
      
      </button>
    <button className="join-item btn">Page {numPag}</button>
    <button
    disabled={isLoading ? true : false}
     onClick={() => onPaginacion(true)} className="join-item btn">
    {isLoading ? <span className="loading loading-spinner loading-md"></span> : <>»</>}
    </button>
</div>
  )
}
