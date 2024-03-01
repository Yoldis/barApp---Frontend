import { ChangeEvent, useState } from "react";
import { Valid } from "../interfaces/barInterface";


export const useForm = <T>(initialState:T) => {

    const [form, setform] = useState<T>(initialState);
    const [validate, setValidate] = useState<Valid[]>([{ok:true, msg:'', name:''}]);

    const onChangeInput = (e:ChangeEvent<HTMLInputElement>):void => {
        const value = e.target.value;
        const name = e.target.name;
        setform({...form, [name]:value});
    };

    const onChangeSelect = (e:ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.selectedOptions[0].value;
        const name = e.target.name;
        setform({...form, [name]:value});
    }

    const onChangeFile = (e:ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files ? e.target.files[0] : '';
        return file;
    }

    const onResetForm = ():void => {
        setform(initialState);
        setValidate([{ok:true, msg:'', name:''}]);
    };



    const isEmail = (text:string, name:string):Valid => {
        if(text.length < 6) return {ok:false, msg:'El email debe tener minimo 6 caracteres', name};
        else if(!text.includes('@') || !text.includes('.com')) return {ok:false, msg:'El email no es valido', name};
        else return {ok:true, msg:'', name:''}
    }

    const validateForm = <T>(data:T):boolean => {
        let ok:boolean = true;
        const valid:Valid[] = [];
        const validEmails:string[] = ['email', 'usuario'];

        for (const d in data) {
            if(!data[d]) {
                ok = false;
                valid.push({ ok, msg:'El campo es obligatorio', name:d});
                
            } 
            else if (validEmails.includes(d)) {
                const{ok:okValid, msg, name} = isEmail(data[d] as string, d);
                valid.push({ok:okValid, msg, name});
                ok = okValid;
            }
        }
        setValidate(valid);
        return ok;
    }

  return {
    ...form,
    form,
    validate,
    setform,
    onChangeInput,
    onChangeSelect,
    onChangeFile,
    onResetForm,
    validateForm
  };
}
