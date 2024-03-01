import { PropsWithChildren, useState } from "react"
import { BarContext } from "./useContext"
import { registerProveeInDb, deleteColabInDb, getColabInDB, registerColabInDb, updateColabInDb, getProveeInDb, updateProveeInDb, deleteProveeInDb, deleteImgSinDestino, deleteMarcaInDb, deleteRegisterCompraInDb, getMarcasInDb, getRegisterCompras, registerMarcaInDb, updateMarcaInDb, uploadImg, addItemsCarrito, getItemsCarritoInDB, getVentasInDb, registerVentasInDb, deleteVentasInDb, getMarcasMasVendidasInDb } from "../supabase";
import { ColabProps, UsuarioProps, ProveedorProps, errorBarProv, MarcasProps, ComprasProps, CarritoProps, ventasProps } from "../interfaces/barInterface";

import { toastAlert } from "../helpers";


export const BarProvider = ({children}:PropsWithChildren) => {
    const [colaboradores, setColaboradores] = useState<ColabProps[]>([]);
    const [proveedores, setProveedores] = useState<ProveedorProps[]>([]);
    const [marcas, setMarcas] = useState<MarcasProps[]>([]);
    const [marcasMasVendidas, setMarcasMasVendidas] = useState<MarcasProps[]>([]);
    const [compras, setCompras] = useState<ComprasProps[]>([]);
    const [carrito, setCarrito] = useState<CarritoProps[]>([]);
    const [ventas, setVentas] = useState<ventasProps[]>([]);
    
    const [toogleSidebar, setToogleSidebar] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorBar, setErrorBar] = useState<errorBarProv>({ok:true, msg:''});
    const [getPassowrd, setGetPassowrd] = useState<UsuarioProps|null>(null);
    const [changeGrafico, setChangeGrafico] = useState<string>('Barras');
    const [loadingImg, setLoadingImg] = useState<boolean>(false);
    


    // Redireccionar si existe algun error
    const redirect = (error?:null|string, time:number = 4000) => {
        if(error) {
            toastAlert({type:2,  title:`${error}`, description:'Error', });
            setErrorBar({ok:false, msg:error});
        }

        setIsLoading(false);
        setInterval( () => {
            setErrorBar({ok:true, msg:''})
        }, time)
    };
    
    // Abrir Modal
    const openModal = (id:string) => {
        const myModal: HTMLDialogElement|null|string = document.getElementById(id) as HTMLDialogElement;
        if(myModal) myModal.showModal();
        else console.log('No existe el Id');
    };

    // Cambiar vista de distintos Graficos
    const startChangeGrafico = (grafica:string) => {
        setChangeGrafico(grafica);
    };

    // Registrar y Actualizar Colaboradores DB
    const startRegisterUpdateColabInDb = async(colab:ColabProps) => {
        setIsLoading(true);
        if(colab.id){
            const{ok, data, error} = await updateColabInDb(colab);
            if(!ok || error) return redirect(error);
            if(data) setColaboradores(colaboradores.map(c => c.id === colab.id ? data[0] : c ));
            toastAlert({type:1,  title:`${colab.nombre} actualizada con exito!`, description:'Actualizada.', });
        }
        else {
            const{ok, data, error, password} = await registerColabInDb(colab);
            if(!ok || error) return redirect(error);
            const{apellido, nombre, usuario} = colab;
            if(data){
                setGetPassowrd({password, apellido, nombre, usuario});
                setColaboradores([...colaboradores, data[0]]);
                toastAlert({type:1,  title:`${colab.nombre} registrado con exito!`, description:'Registrado.', });
            } 
        }
        setIsLoading(false);
        setErrorBar({ok:true, msg:''});
    };

    // Borrar Colaboradores DB
    const startDeleteColabInDb = async(id:string) => {
        setIsLoading(true);
        const{error, ok} = await deleteColabInDb(id);
        if(!ok || error) return redirect(error);
        setColaboradores(colaboradores.filter(c => c.email !== id ));
        setIsLoading(false);
        setErrorBar({ok:true, msg:''});
        toastAlert({type:1,  title:`Colaborador eliminado con exito!`, description:'Eliminado.', });
    };

    // Obtener Colaboradores de DB
    const startGetColabInDb = async () => {
         const{ok, data, error} = await getColabInDB();
        if(!ok || error) return redirect(error);
        if(data) setColaboradores([...colaboradores, ...data]);
    };


    // Registar y Actualizar Proveedores
    const startRegisterProveeInDb = async(provee:ProveedorProps) => {
        setIsLoading(true);
        if(provee.id){
            const{ok, data, error} = await updateProveeInDb(provee);
            if(!ok || error) return redirect(error);
            if(data) setProveedores(proveedores.map(p => p.id === provee.id ? data[0] : p));
            toastAlert({type:1, title:`${provee.nombre} actualizada con exito!`, description:'Actualizada.', });
        }
        else{
            const{ok, data, error} = await registerProveeInDb(provee);
            if(!ok || error) return redirect(error);
            if(data) setProveedores([...proveedores, data[0]]);
            toastAlert({type:1,  title:`${provee.nombre} registrada con exito!`, description:'Registrado.', });
        }
        setIsLoading(false);
    }

    // Obtener Proveedores
    const startGetProveeInDb = async() => {
        const{ok, data, error} = await getProveeInDb();
        if(!ok || error) return redirect(error);
        if(data) setProveedores(data);
    };

    // Eliminar Proveedores
    const startDeleteProveeInDb = async(id:string) => {
        setIsLoading(true);
        const{ok, error} = await deleteProveeInDb(id);
        if(!ok || error) return redirect(error);
        setProveedores(proveedores.filter(p => p.id !== +id));
        setIsLoading(false);
        toastAlert({type:1,  title:`Proveedor eliminado con exito!`, description:'Eliminado.', });
    };
    

    // Cargar Imagen a Supabase
    const startUploadFile = async(file:File, img:string):Promise<string|undefined> => {
        setLoadingImg(true);
        const{ok, publicUrl} = await uploadImg(file, img);
        if(!ok) {
            setLoadingImg(false);
            return;
        }
        setLoadingImg(false);
        return publicUrl;
    };

    // Eliminar archivos sin destino de Supabase
    const startDeleteFileSinDestino = () => {
        deleteImgSinDestino();
    };


    // Registrar y Actualizar Marcas 
    const startRegisterUpdateMarca = async(marca:MarcasProps) => {
        setIsLoading(true);
        if(marca.id){
            const{ok, data,error} = await updateMarcaInDb(marca);
            if(!ok || error) return redirect(error);
            if(data) setMarcas(marcas.map(p => p.id === marca.id ? data[0] : p).sort((a, b) => a.id && b.id ? b.id - a.id : 0));
            toastAlert({type:1,  title:`${marca.nombre} actualizada con exito!`, description:'Modificado.', });
            await startGetRegisterComprasDB('', 0);
        }
        else {
            const{ok, data,error} = await registerMarcaInDb(marca);
            if(!ok || error) return redirect(error);
            if(data) setMarcas([...marcas.slice(0, 5), data[0]].sort((a, b) => a.id && b.id ? b.id - a.id : 0));
            toastAlert({type:1,  title:`${marca.nombre} creada con exito!`, description:'Registrado.', });
        }
        setIsLoading(false);
    };

    // Obtener todas las marcas de la BD
    const startGetMarcasInDB = async(search:string, pagina:number) => {
        setIsLoading(true);
        const{ok, error, data} = await getMarcasInDb(search, pagina);
        if(!ok || error) return redirect(error);
        if(data) setMarcas(data.sort((a, b) => a.id && b.id ? b.id - a.id : 0));
        setIsLoading(false);
    };
    
    // Obtener Marcas mas vendidas de la DB
    const startGetMarcasMasVendidas = async() => {
        const{ok, error, data} = await getMarcasMasVendidasInDb();
        if(!ok || error) return redirect(error);
        if(data) setMarcasMasVendidas(data);
    }

    // Eliminar Marcas de la DB
    const startDeleteMarcaInDB = async(id:string) => {
        setIsLoading(true);
        const{ok, error} = await deleteMarcaInDb(id);
        if(!ok || error) return redirect(error);
        setMarcas(marcas.filter(m => m.id !== +id).sort((a, b) => a.id && b.id ? b.id - a.id : 0));
        setIsLoading(false);
        toastAlert({type:1,  title:`Marca eliminada con exito!`, description:'Eliminado.', });
    };

    // Obtener registros de compras de la DB
    const startGetRegisterComprasDB = async(search:string, pagina:number) => {
        setIsLoading(true);
        const{ok, data, error} = await getRegisterCompras(search, pagina);
        if(!ok || error) return redirect(error);
        if(data) setCompras(data);
        setIsLoading(false);
    }

     // Eliminar Registro de compras de la DB
     const startDeleteRegisterComprasInDB = async(id:string) => {
        setIsLoading(true);
        const{ok, error} = await deleteRegisterCompraInDb(id);
        if(!ok || error) return redirect(error);
        setCompras(compras.filter(m => m.id !== +id));
        setIsLoading(false);
        toastAlert({type:1,  title:`Registro eliminado con exito!`, description:'Eliminado.', });
    };
    

    // Agregar Items en el carrito para DB
    const startAddItemsCarritoDB = async(items:CarritoProps, isMasOrMenos:boolean = true) => {
        
        setIsLoading(true);
        const{ok, data, marca, error} = await addItemsCarrito(items, isMasOrMenos);
        if(!ok || error) return redirect(error);
        if(data){
            const exist = carrito.some(i => i.marcasID === data[0].marcasID);
            if(exist){
                if(!data[0].cantidad) setCarrito(carrito.filter(c => c.marcasID !== items.marcasID));
                
                else setCarrito(carrito.map(c => c.marcasID === items.marcasID ? data[0] : c));
            }
            else setCarrito([...carrito, data[0]]);
            toastAlert({type:1, title:`${items.cantidad} ${+items.cantidad === 1 ? 'unidad' : 'unidades'} de ${data[0].marcas?.nombre} ${isMasOrMenos ? 'Agregado al' : 'Removido del' }  carrito!`, description:`${isMasOrMenos ? 'Agregado' : 'Removido'}.`, });
        }

        if(marca) setMarcas(marcas.map(m => m.id === items.marcasID ? marca[0] : m));
        setIsLoading(false);
    };

    // Obtener los Itmes del Carrito
    const startGetItemsCarrito = async() => {
        const{ok, data, error} = await getItemsCarritoInDB();
        if(!ok || error) return redirect(error);
        if(data) setCarrito(data);
    };


    // Registrar ventas en DB
    const startRegisterVentasInDb = async(carrito:CarritoProps[], cliente:string) => {
        setIsLoading(true);
        const{ok, error} = await registerVentasInDb(carrito, cliente);
        if(!ok || error) return redirect(error);
        await Promise.all([ startGetItemsCarrito(), startGetMarcasMasVendidas(), startGetMarcasInDB('', 0), startGetVentasInDB('', 0) ]);
        toastAlert({type:1,  title:`Items vendidos con exito!`, description:'Vendidos.', });
        setIsLoading(false);
    }


    // Obtener ventas de la BD
    const startGetVentasInDB = async(search:string, pagina:number) => {
        setIsLoading(true);
        const{ok, data, error} = await getVentasInDb(search, pagina);
        if(!ok || error) return redirect(error);
        if(data) setVentas(data);
        setIsLoading(false);
    };

    // Eliminar venta de la DB
    const startDeleteVentaInDb = async(id:string) => {
        setIsLoading(true);
        const{ok, error} = await deleteVentasInDb(id);
        if(!ok || error) return redirect(error);
        setVentas(ventas.filter(v => v.id !== +id));
        toastAlert({type:1,  title:`Venta eliminado con exito!`, description:'Eliminado.', });
        setIsLoading(false);
    };



    const startLogoutBar = () => {
        setColaboradores([]);
        setProveedores([]);
        setMarcas([]);
        setCompras([]);
        setCarrito([]);
        setVentas([]);
        
        setToogleSidebar(false);
        setIsLoading(false);
        setErrorBar({ok:true, msg:''});
        setGetPassowrd(null);
        setChangeGrafico('Barras');
        setLoadingImg(false);
    }
        

  return (
    <BarContext.Provider value={{
        toogleSidebar,
        isLoading,
        errorBar,
        getPassowrd,
        changeGrafico,
        setErrorBar,
        setToogleSidebar,
        openModal,
        startChangeGrafico,

        // Colaboradores
        colaboradores,
        startRegisterUpdateColabInDb,
        startGetColabInDb,
        startDeleteColabInDb,

        // Proveedores
        proveedores,
        startRegisterProveeInDb,
        startGetProveeInDb,
        startDeleteProveeInDb,

        // Cargar Archivo
        startUploadFile,
        loadingImg,
        startDeleteFileSinDestino,
        
        // Marcas
        marcas,
        marcasMasVendidas,
        startRegisterUpdateMarca,
        startGetMarcasInDB,
        startDeleteMarcaInDB,
        startGetMarcasMasVendidas,

        // Registro de compras
        compras,
        startGetRegisterComprasDB,
        startDeleteRegisterComprasInDB,

        // Carrito
        carrito,
        startAddItemsCarritoDB,
        startGetItemsCarrito,

        // Ventas
        ventas,
        startGetVentasInDB,
        startRegisterVentasInDb,
        startDeleteVentaInDb,

        // InicialState con los estado al cerrar session
        startLogoutBar

    }} >
    {children}
    </BarContext.Provider>
  )
}
