import { PostgrestError } from "@supabase/supabase-js";
import { CarritoProps, MarcasProps, ventasProps } from "../interfaces/barInterface";
import { supabase } from "./config";
import { addDays, format, isValid } from "date-fns";

interface DataProve {
    ok:boolean,
    data?:CarritoProps[]|null,
    marca?:MarcasProps[]|null,
    error?:null|string,
}

export const addItemsCarrito = async(items:CarritoProps, isMasOrMenos:boolean = true):Promise<DataProve> => {
    try {
        let data:CarritoProps[]|null;
        let error:null|PostgrestError|string;
        
        const{unidades, ...rest} = items;
        const { data:marca} = await supabase.from('marcas').update([{unidades}]).eq('id', items.marcasID).select();

        const { data:carrito, } = await supabase.from('carrito').select().eq('marcasID', items.marcasID).select();

        if(carrito && carrito?.length > 0) {
            let cantidad:number;
            let precio:number
            if(isMasOrMenos) {
                cantidad = carrito[0].cantidad + items.cantidad;
                precio = carrito[0].precio + items.precio;
            }
            else {
                cantidad = carrito[0].cantidad - items.cantidad;
                precio = carrito[0].precio - items.precio;   
            }
            
            const { data:carritoUpdate, error:errorCarrito } = await supabase.from('carrito').update([{...rest, cantidad, precio}]).eq('marcasID', items.marcasID).select('*, marcas (*)');
            data = carritoUpdate;
            error = errorCarrito;

            if(!cantidad && !precio) await supabase.from('carrito').delete().eq('marcasID', items.marcasID);
        }
        else {
            const { data:carrito, error:errorCarrito } = await supabase.from('carrito').insert([rest]).select('*, marcas (*)');
            data = carrito;
            error = errorCarrito;
        }

        return {
            ok:true,
            data,
            marca,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
        }
    }
};


export const getItemsCarritoInDB = async() => {
    try {
       
        const { data, error } = await supabase.from('carrito').select('*, marcas (*)');

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



export const registerVentasInDb = async (carrito:CarritoProps[], cliente:string) => {

    const total:number = carrito.reduce((acc , num) => {
        return acc + num.precio;
      }, 0);
    
      const unidades:number = carrito.reduce((acc , num) => {
        return acc + num.cantidad;
      }, 0);

    const venta:ventasProps = {cliente, fecha:new Date(), total, unidades};
    
    try {
        const { data, error } = await supabase.from('ventas').insert(venta).select();

        if(data){
            const ventasPromise = carrito.map(c => {
                return supabase.from('ventas_marcas').insert({ventasID:data[0].id, marcasID:c.marcasID, cantidad:c.cantidad, precio:c.precio});
            });

            const carritoPromise = carrito.map(c => {
                return supabase.from('carrito').delete().eq('marcasID', c.marcasID);
            });

            const marcasPromise = carrito.map(async(c) => {
                const { data } = await supabase.from('marcas').select().eq('id', c.marcasID);
                const vendidas = data ? data[0].vendidas + c.cantidad : 0;
                return supabase.from('marcas').update({vendidas, isNew:false}).eq('id', c.marcasID);
            });

            await Promise.all([...ventasPromise, ...carritoPromise, ...marcasPromise]);
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


export const getVentasInDb = async (search:string, pagina:number) => {
    let data:ventasProps[]|null;
    let error:null|PostgrestError|string;

    try {
        
        if(isValid(new Date(`${search}`))){
            const {data:dataVenta, error:errorVenta } = await supabase.from('ventas').select('*, ventas_marcas (cantidad, precio, marcas(*))')
            .eq('fecha', `${format(addDays(search, 2), 'yyyy-MM-dd')}`);
            data = dataVenta;
            error = errorVenta;
        }
        else{
            const {data:dataVenta, error:errorVenta } = await supabase.from('ventas').select('*, ventas_marcas (cantidad, precio, marcas(*))')
            .ilike('cliente', `%${search}%`)
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


export const deleteVentasInDb = async (id:string) => {
    try {
        const { error } = await supabase.from('ventas').delete().eq('id', id);

        return {
            ok:true,
            error:error?.message
        }

    } catch (error) {
        console.log(error);
        return {
            ok:false,
        }
    }
};
