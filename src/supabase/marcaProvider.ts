
import { PostgrestError } from "@supabase/supabase-js";
import { ComprasProps, MarcasProps } from "../interfaces/barInterface";
import { supabase } from "./config";
import { v4 as uuidv4 } from 'uuid';
import { addDays, format, isValid } from "date-fns";

interface uploadProps {
    ok:boolean,
    publicUrl?:string,
}

interface DataProve {
    ok:boolean,
    data?:MarcasProps[]|null
    error?:null|string,
}

const deleteFileInSupaBase = async(img:string) => {
    const urlCortada = img.split('/');
    const idImg = urlCortada[urlCortada.length - 1];
    await supabase.storage.from('marcas').remove([idImg]);
};


export const uploadImg = async(file:File, img:string):Promise<uploadProps> => {

    const uuid = uuidv4();
    try {
        // Eliminar Imagen si existe
        if(img){
            deleteFileInSupaBase(img);
        }

        // Cargar Imagen
        await supabase.storage.from('marcas').upload(uuid, file, {cacheControl: '3600', upsert: false});
        // Obtener Imagen
        const { data:{publicUrl} } = supabase.storage.from('marcas').getPublicUrl(uuid);
        
        return {
            ok:true,
            publicUrl,
        }

    } catch (error) {
        console.log(error)
        return {
            ok:false
        }
    }
};


export const deleteImgSinDestino = async() => {

    try{
        const { data } = await supabase.storage.from('marcas').list('');
        if(data){
            const filterImgDefault = data.filter(i => i.name !== "default-bebida.jpg");
            
            const imgSinDestino = filterImgDefault.map(async(img ):Promise<string> => {
                const{data} = await supabase.from('marcas').select().ilike('img', `%${img.name}%`);
                if(data?.length) return '';
                return  img.name;
            });
    
            const idsImg = await Promise.all(imgSinDestino);
            if(idsImg.filter(i => i !== '').length) await supabase.storage.from('marcas').remove(idsImg.filter(i => i !== ''));
        }

    }catch(error){
        console.log(error)
    }
}


export const registerMarcaInDb = async(marca:MarcasProps):Promise<DataProve> => {
    try {
        
        delete marca.proveedores;

        const { data, error } = await supabase.from('marcas').insert([marca]).select('*, proveedores (nombre)');
        if(data) await supabase.from('compras').insert([{marcasID:data[0].id, unidades:marca.unidades, newUnidades:marca.unidades}]).eq('marcasID', marca.id);
        

        return {
            ok:true,
            data,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            error: error instanceof Error ? error.message : null
        }
    }
};

export const getMarcasInDb = async(search:string, pagina:number):Promise<DataProve> => {
    try {
        const { data, error } = await supabase.from('marcas').select('*, proveedores (nombre)')
        .ilike('nombre', `%${search}%`)
        .range(pagina, !pagina ?  5 : pagina + pagina);
        return {
            ok:true,
            data,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            error: error instanceof Error ? error.message : null
        }
    }
};

export const getMarcasMasVendidasInDb = async():Promise<DataProve> => {
    try {
        const { data, error } = await supabase.from('marcas').select('*, proveedores (nombre)').range(0, 10).order('vendidas', {ascending:true});
        return {
            ok:true,
            data,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            error: error instanceof Error ? error.message : null
        }
    }
};


export const updateMarcaInDb = async(marca:MarcasProps):Promise<DataProve> => {
    try {
        delete marca.proveedores;
        const isNew:boolean = +marca.newUnidades > 0 ? true : false; 
        const { data, error } = await supabase.from('marcas').update({...marca, isNew}).eq('id', marca.id).select('*, proveedores (nombre)');
        if(marca.newUnidades) await supabase.from('compras').insert([{marcasID:marca.id, unidades:marca.unidades, newUnidades:marca.newUnidades}]).eq('marcasID', marca.id);
        
        return {
            ok:true,
            data,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            error: error instanceof Error ? error.message : null
        }
    }
};


export const deleteMarcaInDb = async(id:string):Promise<DataProve> => {
    try {
        const{data} = await supabase.from('marcas').select('unidades').eq('id', id);
        if(data && data[0].unidades > 0){
            throw new Error('No se puede eliminar la marca, aun existen unidades en ventas');
        }
        const { error } = await supabase.from('marcas').delete().eq('id', id);

        return {
            ok:true,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            error: error instanceof Error ? error.message : null
        }
    }
};


export const getRegisterCompras = async(search:string, pagina:number) => {

    let data:ComprasProps[]|null;
    let error:null|PostgrestError|string;

    try {
        
        if(isValid(new Date(`${search}`))){
            const { data:dataVenta, error:errorVenta } = await supabase.from('compras').select('*, marcas (*, proveedores (nombre))')
            .eq('fecha', `${format(addDays(search, 2), 'yyyy-MM-dd')}`);
            data = dataVenta;
            error = errorVenta;
        }
        else{
            const { data:dataVenta, error:errorVenta } = await supabase.from('compras').select('*, marcas!inner (*, proveedores (nombre))')
            .ilike('marcas.nombre', `%${search}%`)
            .range(pagina, !pagina ?  5 : pagina + pagina);
            data = dataVenta;
            error = errorVenta;
        }
        
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


export const deleteRegisterCompraInDb = async(id:string) => {
    try {
        const { error } = await supabase.from('compras').delete().eq('id', id);

        return {
            ok:true,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
            error: error instanceof Error ? error.message : null
        }
    }
};
