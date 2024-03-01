import { FaSearch, FaTimes } from "react-icons/fa";
import { Input } from ".";
import { useForm } from "../../hooks/useForm"
import { InputSelectProps } from "../../interfaces/barInterface";
import { useEffect } from "react";

interface SearchProps  {
    placeholder:string,
    searchFunction:(search:string, pagina:number) => void
}


export const Search = <T extends SearchProps>({placeholder, searchFunction}:T) => {
    const{onChangeInput, search, onResetForm} = useForm<{search:string}>({search:''});

    const data:InputSelectProps = {
        name:'search', onChangeInput, type:'text', value:search, placeholder, tag:'input'
    };

    useEffect(() => {
      searchFunction(search, 0);
    }, [search]);

  return (
    <div className="flex items-center gap-1">
        {
          search ? 
          <div>
            <FaTimes onClick={onResetForm} className="text-xl cursor-pointer" /> 
          </div> :

          <div>
            <FaSearch className="text-xl text-primaryColor"/>
          </div>
        }
        <Input data={data}  />
    </div>
  )
}
