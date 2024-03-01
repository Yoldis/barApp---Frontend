import { InputSelectProps } from "../../interfaces/barInterface";

interface DataInput {
    data:InputSelectProps,
}

export const Select = <T extends DataInput>({data}:T) => {
    const{name, onChangeSelect, placeholder, value, label, options, valid} = data;

  return (
    <label className="form-control w-full max-w-xs">
         {label ? (
        <>
          <label className="my-2 font-medium block" htmlFor={label}> {label} </label>
          <p className={`ml-1 my-1 text-red-600 font-medium ${ !valid?.ok && valid?.name === name ? "" : "hidden" }`} >{valid?.msg}</p>
        </>
      ) : (
        <></>
      )}

      <select
        value={value}
        name={name}
        onChange={onChangeSelect}
        className="select select-bordered select-warning">
        <option value={""}> {placeholder} </option>
        {
            options?.map(o => (
                <option key={o.id} value={o.id}>{o.nombre}</option>
            ))
        }
      </select>
    </label>
  );
}
