import { FaHandHolding } from "react-icons/fa";
import { Input, Modal, TableProveedor } from "..";
import { useBarContext } from "../../../context/useContext"
import { useForm } from "../../../hooks/useForm";
import { InputSelectProps, ProveedorProps } from "../../../interfaces/barInterface";


export const Proveedores = () => {
    const {errorBar, isLoading, setErrorBar, openModal, startRegisterProveeInDb} = useBarContext();
    const{onChangeInput,nombre, direccion, email, telefono,  form, onResetForm, validateForm, validate, setform} = useForm<ProveedorProps>(
      {nombre:'', direccion:'', email:'', telefono:'',}
    );
  
    
    const onSaveData = () => {
      const ok = validateForm(form);
      if(!ok) return;
      startRegisterProveeInDb(form);
    };
  
    const inputs:InputSelectProps[] = [
  
      {label:'Nombre', placeholder:'Nombre', name:'nombre', value:nombre, onChangeInput,  type:'text', 
      valid:validate.find(v => v.name === 'nombre'), tag:'input'},
  
      {label:'Direccion', placeholder:'Direccion', name:'direccion', value:direccion, onChangeInput,  type:'text', 
      valid:validate.find(v => v.name === 'direccion'), tag:'input'},
  
      {label:'Correo', placeholder:'Email', name:'email', value:email, onChangeInput,  type:'email', 
      valid:validate.find(v => v.name === 'email'), tag:'input'},
  
      {label:'Telefono', placeholder:'Telefono', name:'telefono', value:telefono, onChangeInput,  type:'text', 
      valid:validate.find(v => v.name === 'telefono'), tag:'input'},
    ];
  
    return (
      <section className={`animate__animated animate__fadeIn`}>
  
        <div className="my-5 mx-4 flex justify-between gap-2 items-center">
        <h1 className="md:text-2xl text-lg font-bold border-b border-b-primaryColor flex items-center gap-1.5">
          <FaHandHolding className={`text-primaryColor`}/>
          Proveedores
        </h1>
          <Modal
            titleHeader={`${form.id ? "Editar" : "Nueva"} Proveedor`}
            titleBtn="Nuevo Proveedor"
            btnColor={"bg-primaryColor"}
            onResetForm={onResetForm}
            onSaveData={onSaveData}
            isLoading={isLoading}
            error={errorBar}
            setError={setErrorBar}
            openModal={openModal}
          >
            <div className="grid md:grid-cols-2 gap-2">
              {inputs.map((data) => (
                <Input key={data.name} data={data} />
              ))}
            </div>
          </Modal>
        </div>
  
        <TableProveedor setform={setform} />
      </section>
    )
  }
