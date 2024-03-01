import { InputSelectProps } from "../../interfaces/barInterface";


interface DataInput {
    data:InputSelectProps,
}

const imgDefault:string  = 'https://hojvsvuskuuewqjoiiyv.supabase.co/storage/v1/object/public/marcas/default-bebida.jpg';

export const Input = <T extends DataInput>({data}:T) => {
    const{type, name, placeholder, value, onChangeInput, readonly, label, valid, accept, loadingImg, hidden, maxLength} = data;

  return (
    <div className={`${hidden ? 'hidden' :''}`}>
      {label ? (
        <>
          <label className="my-2 font-medium block" htmlFor={label}> {label} </label>
          <p className={`ml-1 my-1 text-red-600 font-medium ${ !valid?.ok && valid?.name === name ? "" : "hidden" }`} >{valid?.msg}</p>
        </>
      ) : (
        <></>
      )}

      {
        type === 'file' && <div className="flex justify-center mb-2.5 min-h-[80px]">
          {
            loadingImg ? <span className="loading loading-spinner loading-lg text-warning"></span> :
            <img className="ring ring-orange-300 w-20 h-20 rounded-full object-cover text-center" src={value ? value : imgDefault } alt="" />
          }
            
        </div> 
      }
      <input
        id={label}
        type={type}
        name={name}
        value={type === 'file' ? '' : value}
        placeholder={placeholder}
        onChange={onChangeInput}
        readOnly={readonly}
        className={`w-full max-w-xs focus:input-warning ${type === 'file' ? 'file-input file-input-bordered file-input-warning' : 'input input-bordered'} `}
        accept={accept}
        maxLength={maxLength}
      />
    </div>
  );
}
