import { supabase } from "./config"
import { ColabProps } from "../interfaces/barInterface"
import { PostgrestError } from "@supabase/supabase-js"
import { generatePassowrd } from "../helpers"


interface DataProve {
    ok:boolean,
    data?:ColabProps[]|null
    error?:null|string,
    password?:string
}


export const registerColabInDb = async(payload:ColabProps):Promise<DataProve> => {
    const password = generatePassowrd();
    console.log(password);
    let userId:string ='';
    let data:ColabProps[]|null = null;
    let error:PostgrestError|null = null;

    try{
        const{access_token, refresh_token, ...rest} = payload;
        const{data:dataColab, error:errorAuth} = await supabase.auth.signUp({email: payload.usuario, password: '123123'});
        if(access_token && refresh_token) await supabase.auth.setSession({ access_token, refresh_token});
        if(dataColab.user) userId = dataColab.user.id;

        if(!errorAuth){
            const {data:dataDb, error:errorDb} = await supabase.from('colaboradores').insert({...rest, userId}).eq('email', payload.email).select();
            data = dataDb;
            error = errorDb;
        }
        
        
        return {
            ok:true,
            data,
            error:error?.message,
            password
        }

    } catch(error){
        console.log(error)
        return {
            ok:false
        }
    }
};

export const getColabInDB = async():Promise<DataProve> => {
    try{
        const {data, error} = await supabase.from('colaboradores').select();
        return {
            ok:true,
            data,
            error:error?.message
        }
    }catch(error){
        console.log(error)
        return {
            ok:false,
        }
    }
};


export const updateColabInDb = async(payload:ColabProps):Promise<DataProve> => {
    try{
        const rest = payload;
        delete rest.access_token;
        delete rest.refresh_token;
        
        const { data, error } = await supabase.from('colaboradores').update(rest).eq('id', payload.id).select();

        return {
            ok:true,
            data,
            error:error?.message
        }
    }catch(error){
        console.log(error)
        return {
            ok:false,
        }
    }
};

export const deleteColabInDb = async(id:string):Promise<DataProve> => {
    try{
        const { error } = await supabase.from('colaboradores').delete().eq('email', id);
        return {
            ok:true,
            error:error?.message
        }

    }catch(error){
        console.log(error)
        return {
            ok:false,
        }
    }
}

