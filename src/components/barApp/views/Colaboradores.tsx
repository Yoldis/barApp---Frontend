import { FaExclamationCircle, FaUser } from "react-icons/fa"
import { Input, Modal, TableColab } from ".."
import { ColabProps, InputSelectProps } from "../../../interfaces/barInterface";
import { useForm } from "../../../hooks/useForm";
import { useEffect } from "react";
import { useAuthContext, useBarContext } from "../../../context/useContext";


export const Colaboradores = () => {
    const{user} = useAuthContext();
    const{startRegisterUpdateColabInDb, isLoading, errorBar, setErrorBar, openModal, getPassowrd} = useBarContext();

    const{onChangeInput, nombre, apellido, dni, email, telefono, usuario, form, onResetForm, validateForm, validate, setform} = useForm<ColabProps>(
        {nombre:'', apellido:'', dni:'', telefono:'', email:'', usuario:'', userId:'', role:'colab', cambioPassword:false}
    );

    
    const onSaveData = () => {
        const{userId, cambioPassword, ...rest} = form;
        const ok = validateForm(rest);
        if(!ok) return;
        if(user.session){
            const{access_token, refresh_token} = user.session
            startRegisterUpdateColabInDb({...form,  cambioPassword, userId, access_token, refresh_token});
        }
    }

    useEffect(() => {
        if(getPassowrd?.password) return openModal(getPassowrd.password);
    }, [getPassowrd?.password]);

    const inputs:InputSelectProps[] = [
        {label:'Nombre', placeholder:'Nombre', name:'nombre', value:nombre, onChangeInput,  type:'text', 
        valid:validate.find(v => v.name === 'nombre'), tag:'input'},

        {label:'Apellido', placeholder:'Apellido', name:'apellido', value:apellido, onChangeInput,  type:'text',
        valid:validate.find(v => v.name === 'apellido'), tag:'input'},

        {label:'Identificacion', placeholder:'Identificacion', name:'dni', value:dni, onChangeInput,  type:'text', 
        valid:validate.find(v => v.name === 'dni'), tag:'input'},

        {label:'Telefono', placeholder:'Telefono', name:'telefono', value:telefono, onChangeInput,  type:'text', 
        valid:validate.find(v => v.name === 'telefono'), tag:'input'},

        {label:'Email', placeholder:'Email', name:'email', value:email, onChangeInput,  type:'email', 
        valid:validate.find(v => v.name === 'email'), tag:'input'},

        {label:'Usuario', placeholder:'Correo de Usuario', name:'usuario', value:usuario, onChangeInput,  type:'email',
        valid:validate.find(v => v.name === 'usuario'), tag:'input'},
    ];


  return (
    <section className={`animate__animated animate__fadeIn `}>
      <div className="flex justify-between items-center gap-2 mx-4 my-5">
       <h1 className="md:text-2xl text-lg font-bold border-b border-b-primaryColor flex items-center gap-1.5">
        <FaUser className={`text-primaryColor`}/>
          Colaboradores
        </h1>
        <Modal
          titleHeader={`${form.id ? "Editar" : "Nuevo"} Colaborador`}
          titleBtn="Nuevo Colaborador"
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
      
      <TableColab setform={setform} />

      <dialog id={getPassowrd?.password || ''} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Usuario - Inicio de sesion</h3>
          <div className="py-4 text-red-500 flex items-center gap-x-2 font-medium">
            <FaExclamationCircle className="text-2xl" />
            <p className="">Esta ventana es de un solo uso, Por favor anotar los datos proporcionados</p>
          </div>
          
            <div className="px-4">
                <p className="font-semibold text-primaryColor">Colaborador: <span className="font-medium text-black">{getPassowrd?.nombre} {getPassowrd?.apellido}</span></p>
                <p className="font-semibold text-primaryColor">Usuario: <span className="font-medium text-black">{getPassowrd?.usuario}</span></p>
                <p className="font-semibold text-primaryColor">Passowrd: <span className="font-medium text-black">{getPassowrd?.password}</span></p>
            </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
}
