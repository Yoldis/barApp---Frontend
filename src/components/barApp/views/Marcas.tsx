import { ChangeEvent, useState } from "react";
import { Input, Modal, Paginacion, Search, Select, TableMarcas } from "..";
import { useBarContext } from "../../../context/useContext"
import { useForm } from "../../../hooks/useForm";
import { InputSelectProps, MarcasProps } from '../../../interfaces/barInterface';
import { toastAlert } from "../../../helpers";
import { FaWineBottle } from "react-icons/fa";

const imgDefault:string  = 'https://hojvsvuskuuewqjoiiyv.supabase.co/storage/v1/object/public/marcas/default-bebida.jpg';

export const Marcas = () => {
  const {errorBar, marcas, setErrorBar, openModal, proveedores, startUploadFile, loadingImg, isLoading, startRegisterUpdateMarca, startGetMarcasInDB} = useBarContext();
  const{onChangeInput, onChangeSelect, onChangeFile, img, nombre, compra, newUnidades, venta, unidades, idProvee, form, onResetForm, validateForm, validate, setform} = useForm<MarcasProps>(
    {nombre:'', compra:0, venta:0, unidades:0, vendidas:0,  img:'', idProvee:'', isNew:true, newUnidades:0}
  );
  const [imgTemp, setImgTemp] = useState<string>('');

  // Guardar en DB
  const onSaveData = async() => {
    const{img, vendidas, isNew, newUnidades, ...rest} = form;
    const ok = validateForm(rest);
    if(!ok) return;

    if(newUnidades){
      const total = +newUnidades + +rest.unidades;
      if(total < 0) return toastAlert({type:2,  title:`Las nuevas unidades no pueden ser menor que las unidades actuales`, description:'Nuevas unidades por debajo de las actuales.', });
    }

    startRegisterUpdateMarca({
      ...form, vendidas, isNew, 
      unidades:+rest.unidades + +newUnidades,
      img:imgTemp ? imgTemp : img ? img : imgDefault
    });
    setImgTemp('');
  };

  // Cargar Imagen a SupaBase
  const onUploadImg = async(e:ChangeEvent<HTMLInputElement>) => {
    const file = onChangeFile(e);
    if(file) {
      const publicUrl = await startUploadFile(file, imgTemp ? imgTemp : '');
      if(publicUrl) setImgTemp(publicUrl);
    }
  }


  const optionsProve = proveedores.map(p => {
    return {
      id:p.id?.toString(),
      nombre:p.nombre
    }
  });

  
  const inputs:InputSelectProps[] = [
    
    {label:'Proveedor', placeholder:'Seleccionar Proveedor', name:'idProvee', value:idProvee, onChangeSelect,  type:'text', 
    valid:validate.find(v => v.name === 'idProvee'), tag:'select', options:optionsProve},

    {label:'Imagen', placeholder:'Img', name:'img', value:imgTemp ? imgTemp : img ? img : '', onChangeInput:onUploadImg,  type:'file', tag:'input', accept:'image/*', loadingImg},

    {label:'Nombre', placeholder:'Nombre', name:'nombre', value:nombre, onChangeInput,  type:'text', 
    valid:validate.find(v => v.name === 'nombre'), tag:'input'},

    {label:'Compra', placeholder:'Precio compra', name:'compra', value:compra.toString(), onChangeInput,  type:'number', 
    valid:validate.find(v => v.name === 'compra'), tag:'input'},

    {label:'Venta', placeholder:'Precio venta', name:'venta', value:venta.toString(), onChangeInput,  type:'number', 
    valid:validate.find(v => v.name === 'venta'), tag:'input'},

    {label:'Unidades', placeholder:'Unidades Disponibles', name:'unidades', value:unidades.toString(), onChangeInput,  type:'number', 
    valid:validate.find(v => v.name === 'unidades'), tag:'input', readonly:form.id ? true : false},

    {label:'Nuevas Unidades', placeholder:'Nuevas Unidades', name:'newUnidades', value:newUnidades ? newUnidades.toString() : '', onChangeInput,  type:'number', tag:'input', hidden:!form.id ? true : false},

  ];

  return (
    <section className={`animate__animated animate__fadeIn`}>
      <div className="my-5 mx-4 flex justify-between gap-2 items-center flex-wrap">
        <h1 className="md:text-2xl text-lg font-bold border-b border-b-primaryColor flex items-center gap-1.5">
          <FaWineBottle className={`text-primaryColor`}/>
          Marcas
        </h1>
        <Modal
          titleHeader={`${form.id ? "Editar" : "Nueva"} Marca`}
          titleBtn="Nueva Marca"
          btnColor={"bg-primaryColor"}
          onResetForm={onResetForm}
          onSaveData={onSaveData}
          isLoading={isLoading}
          error={errorBar}
          setError={setErrorBar}
          openModal={openModal}
        >
          <div className="grid md:grid-cols-2 gap-2">
            {inputs.map((data, i) => (
              <div
                key={i}
                className={`${data.name === "idProvee" && "self-end"}`}
              >
                {data.tag === "input" ? (
                  <Input data={data} />
                ) : (
                  <Select data={data} />
                )}
              </div>
            ))}
          </div>
        </Modal>

       <Paginacion array={marcas} fnPaginacion={startGetMarcasInDB} isLoading={isLoading}/>

        <Search placeholder="Buscar Producto" searchFunction={startGetMarcasInDB}/>
      </div>

      <TableMarcas setform={setform} />
    
    </section>
  );
}
