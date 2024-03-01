import { FaDollarSign, FaSearch } from "react-icons/fa"
import { Buttom, Paginacion, Search, TableVentas } from ".."
import { useBarContext } from "../../../context/useContext"
import { useForm } from "../../../hooks/useForm";
import { toastAlert } from "../../../helpers";


export const Ventas = () => {
  const{startGetVentasInDB, isLoading, ventas} = useBarContext();
  const{onChangeInput, search} = useForm<{search:string}>({search:''});

   const searchVentas = () =>{
    if(!search) return toastAlert({type:2,  title:`Debes introducir una fecha valida para buscar!`, description:'Error.', });
    startGetVentasInDB(search, 0)
   }

  return (
    <section className={`animate__animated animate__fadeIn`}>
  
    <div className="my-5 mb-7 mx-4 flex justify-between gap-2 items-center">
        <h1 className="md:text-2xl text-lg font-bold border-b border-b-primaryColor flex items-center gap-1.5">
        <FaDollarSign className={`text-primaryColor`}/>Ventas</h1>

        <div className="flex items-center gap-2">
          <input onChange={onChangeInput} type="date" placeholder="Type here" name="search" value={search} className="input input-bordered w-full max-w-xs" />
          
          <Buttom
              name="Buscar"
              icon={<FaSearch/>}
              direction="float-end mt-2"
              isLoading={isLoading}
              onClickBtn={searchVentas}
              disabled={isLoading ? true : false}
              />
        </div>

        <Paginacion array={ventas} fnPaginacion={startGetVentasInDB} isLoading={isLoading}/>
        <Search placeholder="Buscar Cliente" searchFunction={startGetVentasInDB}/>
    </div>

    <TableVentas />
  </section>
  )
}
