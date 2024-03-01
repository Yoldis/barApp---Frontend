import { PostgrestError } from "@supabase/supabase-js";
import { ProveedorProps } from "../interfaces/barInterface";
import { supabase } from "./config";

interface DataProve {
    ok:boolean,
    data?:ProveedorProps[]|null
    error?:null|string,
}

export const registerProveeInDb = async(provee:ProveedorProps):Promise<DataProve> => {
    try {
        const { data, error } = await supabase.from('proveedores').insert([provee]).select();

        return {
            ok:true,
            data,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
        }
    }
};


export const getProveeInDb = async():Promise<DataProve> => {
    try {
        const { data, error } = await supabase.from('proveedores').select();
        return {
            ok:true,
            data,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
        }
    }
};


export const updateProveeInDb = async(provee:ProveedorProps):Promise<DataProve> => {
    try {
        const { data, error } = await supabase.from('proveedores').update(provee).eq('id', provee.id).select();

        return {
            ok:true,
            data,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false
        }
    }
};


export const deleteProveeInDb = async(id:string):Promise<DataProve> => {
    let error:PostgrestError|null|Error = null;
    try {
        const { data } = await supabase.from('marcas').select().eq('idProvee', id);
        if(data){
            throw new Error('El proovedor tiene productos registrados');
        }
        else {
            const { error:errDelete } = await supabase.from('proveedores').delete().eq('id', id);
            error = errDelete;
        }
        return {
            ok:true,
            error:error?.message
        }

    } catch (error) {
        return {
            ok:false,
            error: error instanceof Error ? error.message : null
        }
    }
};