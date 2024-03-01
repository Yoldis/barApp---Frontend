import { FaMinusCircle, FaPlus, FaShoppingCart, FaStore } from "react-icons/fa";
import { Alert, Buttom, Card, Input, Paginacion, Search } from ".."
import { useBarContext } from "../../../context/useContext";
import { CarritoProps, InputSelectProps } from "../../../interfaces/barInterface";
import { useForm } from "../../../hooks/useForm";
import { useState } from "react";
import { toastAlert } from "../../../helpers";



export const Stocks = () => {
  const{marcas, carrito, isLoading, openModal, startAddItemsCarritoDB, startRegisterVentasInDb, startGetMarcasInDB} = useBarContext();
  const{onChangeInput, cantidad, cliente, validate, validateForm, onResetForm} = useForm<{cantidad:string, cliente:string}>({cantidad:'', cliente:''});
  const [masOrMenos, setMasOrMenos] = useState<boolean>(false);
  
  const startOpenModal = (id:string, isMasOrMenos:boolean) => {
      openModal(id);
      setMasOrMenos(isMasOrMenos)
  }

  const onAddOrRemoveItems = (items:CarritoProps) => {
    const ok = validateForm({cantidad});
    if(!ok) return;
    if(+cantidad < 0) return toastAlert({type:2,  title:`Las unidades no pueden ser menor que cero`, description:'Unidades negativas.', });
    if(items.marcas){
      const newPrecio = +cantidad * items.marcas.venta;

      if(masOrMenos){
        const restoUnidades = Math.abs(items.marcas.unidades) - +cantidad;
        if(+restoUnidades < 0) return toastAlert({type:2,  title:`Las unidades no pueden ser menor que ${items.marcas.unidades}`, description:'Unidades negativas.', });
        startAddItemsCarritoDB({marcasID:items.marcasID, cantidad:+cantidad, precio:newPrecio, unidades:restoUnidades});
      }
      else {
        const restoUnidades = Math.abs(items.marcas.unidades) + +cantidad;
        if(+cantidad > items.cantidad) return toastAlert({type:2,  title:`Las unidades no pueden ser mayor que ${items.cantidad}`, description:'Unidades negativas.', });
        startAddItemsCarritoDB({marcasID:items.marcasID, cantidad:+cantidad, precio:newPrecio, unidades:restoUnidades}, false);
      }
    }
  };

  const onVenderItems = () => {
    const ok = validateForm({cliente});
    if(!ok) return;
    startRegisterVentasInDb(carrito, cliente);
    onResetForm();
  }


  const total:number = carrito.reduce((acc , num) => {
    return acc + num.precio;
  }, 0);

  const items:number = carrito.reduce((acc , num) => {
    return acc + num.cantidad;
  }, 0);

  const inputs:InputSelectProps[] = [
    {label:`Cantidad`, placeholder:'Cantidad', name:'cantidad', value:cantidad, onChangeInput,  type:'number', 
    valid:validate.find(v => v.name === 'cantidad'), tag:'input'},

    {label:`Cliente`, placeholder:'Nombre Cliente', name:'cliente', value:cliente, onChangeInput,  type:'text', 
    valid:validate.find(v => v.name === 'cliente'), tag:'input'}
  ];

  return (
    <section className=" pt-0 animate__animated animate__fadeIn select-none">
      <div className="px-4 flex items-center justify-between sticky top-[56px] z-10 bg-gray-300 py-2 shrink">
        <h1 className="text-2xl font-bold border-b border-b-primaryColor flex items-center gap-1.5">
          <FaStore className={`text-primaryColor`}/>
          Productos</h1>


          <Paginacion array={marcas} fnPaginacion={startGetMarcasInDB} isLoading={isLoading}/>


        {/* Buscador */}
        <Search placeholder="Buscar Productos" searchFunction= {startGetMarcasInDB}/>

        
        <label  htmlFor="my-drawer-4" className="relative cursor-pointer drawer-button ml-4 tooltip tooltip-bottom transition-all ease-in-out hover:scale-110" data-tip="Carrito">
          <FaShoppingCart className="text-3xl text-blue-500 "/>
          <span className={`badge bg-red-500 text-white absolute top-0 ${!carrito.length ? 'hidden' : ''} `}>{carrito.length > 9  ? '9+' : carrito.length}</span>
        </label>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 my-5 justify-items-center gap-5 px-4">
       {
          marcas.map(c => (
            <Card key={c.nombre} data={c} />
          ))
       }
      </div>

    {/* Carrito === Se puede construir un componente aparte para que el codigo sea mas corto */}
      <div className="drawer drawer-end ">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="menu p-4 max-w-sm w-[300px] bg-base-200 mt-[130px] ml-[200px] text-base-content rounded-md">
              {/* Sidebar content here */}
              <div className="flex items-center gap-1 justify-between text-blue-500 ">
                <h1 className="flex items-center gap-1 text-lg font-bold"> <FaShoppingCart className="text-xl "/>Carrito</h1>
                <Buttom
                    btnColor="bg-blue-500"
                    name="Guardar"
                    isLoading={isLoading}
                    onClickBtn={onVenderItems}
                    disabled ={!carrito.length || isLoading ? true : false}
                    />
              </div>
              {
                !carrito.length ? <></> :
                <div className="mb-3">
                  <Input data={inputs[1]} />
                </div>
              }


              {
                carrito.map(c => (
                  <div key={c.id} >
                    <div className="flex items-center justify-between mr-1 gap-2 my-2">
                      <div className="flex items-center gap-2">
                        <figure><img className="h-12 w-12 object-cover rounded-xl" src={c.marcas?.img} alt={c.marcas?.nombre} /></figure>  
                        <div className="">
                          <p className="font-bold">{c.marcas?.nombre} <span className="bg-red-500 px-1 badge text-white font-semibold">x{c.cantidad}</span></p>
                          <p className="font-semibold badge bg-yellow-600 text-white">RD$ {c.precio}.00</p>
                        </div>
                        
                      </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() =>  startOpenModal(c.id?.toString() || '', false)} className="tooltip text-red-500 active:scale-95 transition-all ease-in-out" data-tip='Remover'>
                            <FaMinusCircle />
                          </button>

                          <button
                          disabled={c.marcas && c.marcas?.unidades > 0 ? false : true}
                          onClick={() => startOpenModal(c.id?.toString() || '', true)} 
                          className={`${c.marcas && c.marcas?.unidades  > 0 ? 'text-blue-500' : 'text-gray-400'} tooltip active:scale-95 transition-all ease-in-out`} data-tip='Agregar'>
                            <FaPlus />
                          </button>

                          <Alert title={ `${!masOrMenos ? 'Remover' : 'Agregar'} ${c.marcas?.nombre }` || ''} id={c.id?.toString() || ''} isloading = {isLoading} onResetForm={onResetForm}>
                            <div className="text-center">
                              <figure className="flex items-center flex-col"><img className=" h-40 w-40 object-cover rounded-xl" src={c.marcas?.img} alt={c.marcas?.nombre} /></figure>  
                              <Input data={inputs[0]} />
                            </div>

                            <Buttom
                              name="Guardar"
                              isLoading={isLoading}
                              onClickBtn={() => onAddOrRemoveItems(c)}
                              disabled ={isLoading  ? true : false }
                            />
                        </Alert>
                        </div>
                        
                    </div>
                  </div> 
                ))
              }

              {
                !carrito.length ? <></> :
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-center">Total: <span className="badge bg-blue-500 text-white">RD$ {total}.00</span></p>

                  <p className="font-bold text-center">Unidades: <span className="badge bg-blue-500 text-white">x{items}</span></p>
              </div>
              }
              
            </div>
          </div>
        </div>
    </section>
  );
}
