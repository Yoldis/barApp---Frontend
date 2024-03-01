
import { LoginInterface } from "../interfaces/authInterface";
import { supabase } from "./config";

export const loginWithEmailAndPassowrd = async(payload:LoginInterface) => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({email: payload.email, password: payload.password });
        const{data:colab} = await supabase.from('colaboradores').select().eq('userId', data.user?.id);
        if(colab) await supabase.from('colaboradores').update({horaEntrada:new Date()}).eq('userId', data.user?.id);

        return {
            ok:true,
            data,
            error,
            colab
        };
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            error
        }
    }
};


export const checkingSession = async() => {
    try {
        const { data, error } = await supabase.auth.getSession();
        const{data:colab} = await supabase.from('colaboradores').select().eq('userId', data.session?.user.id);

        return {
            ok:true,
            data,
            error,
            colab
        };
    } catch (error) {
        return {
            ok:false,
            error
        }
    }
};


export const changePassword = async(password:string, userId:string) =>{
    
    try {
        const {error } = await supabase.auth.updateUser({ password});
        if(!error) await supabase.from('colaboradores').update({cambioPassword:true}).eq('userId', userId);
        
        return {
            ok:true,
            error,
        };
        
    } catch (error) {
        return {
            ok:false,
            error
        }
    }
}

export const signOut = async(userId:string|undefined) => {
    try {
        await supabase.from('colaboradores').update({horaSalida:new Date()}).eq('userId', userId);
        const { error } = await supabase.auth.signOut();

        return {
            ok:true,
            error
        }

    } catch (error) {
        console.log(error)
        return {
            ok:false
        }
    }
}