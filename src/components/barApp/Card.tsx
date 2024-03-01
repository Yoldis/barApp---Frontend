import { FaCartPlus, FaWineBottle } from "react-icons/fa";
import { InputSelectProps, MarcasProps } from "../../interfaces/barInterface"
import { Alert, Buttom, Input } from ".";
import { useAuthContext, useBarContext } from "../../context/useContext";
import { useForm } from "../../hooks/useForm";
import { toastAlert } from "../../helpers";


interface Props {
    key:string,
    data:MarcasProps,
}

export const Card = <T extends Props>({data}:T) => {
    const{user} = useAuthContext();
    const {id, img, nombre, isNew, unidades, vendidas, compra, venta, newUnidades} = data;
    const{openModal, startAddItemsCarritoDB, isLoading} = useBarContext();
    const{onChangeInput, cantidad, validate, validateForm, onResetForm} = useForm<{cantidad:string}>({cantidad:''});
    
    const totalUnidades:number = +unidades + +vendidas;
    const porcentaje:number = (+unidades / totalUnidades) * 100;

    const onSaveCarrito = () => {
        const ok = validateForm({cantidad});
        if(!ok) return;
        if(+cantidad < 0) return toastAlert({type:2,  title:`Las unidades no pueden ser menor que cero`, description:'Unidades negativas.', });
        
        const newPrecio = +cantidad * +venta;
        const restoUnidades = Math.abs(+unidades) - +cantidad;
        if(+restoUnidades < 0) return toastAlert({type:2,  title:`Las unidades no pueden ser mayor que ${unidades}`, description:'Unidades negativas.', });
        if(id) startAddItemsCarritoDB({cantidad:+cantidad, precio:newPrecio, marcasID:+id, unidades:restoUnidades});
    }

    const inputs:InputSelectProps[] = [
        {label:`Cantidad de ${nombre}`, placeholder:'Cantidad', name:'cantidad', value:cantidad, onChangeInput,  type:'number', 
        valid:validate.find(v => v.name === 'cantidad'), tag:'input'}
    ];

  return (
    <div className="card max-w-80 bg-base-100 shadow-xl hover:scale-95 transition-all ease-linear animate__animated animate__fadeIn">
        <figure><img className={`${unidades ? '' : 'grayscale'} h-80 w-80 object-cover`} src={img} alt={nombre} /></figure>
        <div className={`card-body`}>
            <button disabled={!unidades ? true : false} className="tooltip w-10 relative left-[215px]" data-tip="Agregar al Carrito">

            <FaCartPlus
                onClick={() => openModal(nombre)}
                className={` active:scale-95 cursor-pointer text-3xl ${unidades ? 'text-blue-500' : 'text-gray-400' }  transition-all ease-in-out`}  />
            </button>

            <Alert title={`Agregar ${nombre}`} id={nombre} isloading = {isLoading} onResetForm={onResetForm}>
                <div className="text-center">
                <figure><img className=" h-40 w-40 object-cover rounded-xl" src={img} alt={nombre} /></figure>  
                {inputs.map((data) => (
                    <Input key={data.name} data={data} />
                ))}
                </div>

                <Buttom
                name="Guardar"
                isLoading={isLoading}
                onClickBtn={onSaveCarrito}
                disabled={isLoading ? true : false}
                />
            </Alert>

        <h2 className="card-title ">
            <FaWineBottle className="text-yellow-500"/>{nombre}
            <div className={`${isNew ? 'flex items-center gap-1 text-base text-accent font-semibold' : 'hidden'}`}>{newUnidades > 0  ? '+' + newUnidades : ''} <span className={`badge badge-accent`}>NEW</span></div>
        </h2>
        {
            porcentaje <= 50 ?
            <p className={`text-red-500 font-bold `}>Stock en {porcentaje.toFixed(0)}%</p> :
            <></>
        }
        <p className="font-bold">{unidades} <span className="font-semibold badge bg-yellow-600 text-white">Unidades Disponibles</span> </p>
        <p className={`${user.colab ? 'hidden': ''} font-bold`}>{vendidas ? vendidas : 0} <span className="font-semibold badge bg-orange-500 text-white">Unidades Vendidas</span></p>
        
        <div className="card-actions justify-between">
            <div className={`${user.colab ? 'hidden': ''}`}>
                <div className="badge badge-outline bg-red-600 text-white">Compra</div> 
                <p className="font-semibold">RD$ {compra}.00</p>
            </div>
            <div>
                <div className="badge badge-outline bg-green-600 text-white">Venta</div>
                <p className="font-semibold">RD$ {venta}.00</p>
            </div>
        </div>
        </div>
  </div>
  )
}
