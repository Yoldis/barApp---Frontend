import { FaCheck, FaInfoCircle } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { toast } from 'sonner';


enum typeToast {
    success = 1,
    error =  2,
    info = 3
}

interface toastProps {
    title:string,
    className?:string,
    duration?:number,
    description:string,
    type:typeToast
}


export const toastAlert  = ({type = 1, title, description, duration = 4000,  className}:toastProps) => { 

    if(type === 1){
        toast.success(title, {
            className,
            description,
            duration,
            icon:<FaCheck className='text-green-500' />,
            position:`top-right`
        });
    }
    else if(type === 2){
        toast.error(title, {
            className,
            description,
            duration,
            icon:<MdOutlineCancel  className='text-red-500' />,
            position:`top-right`
        });
    }
    else if(type === 3){
        toast.info(title, {
            className,
            description,
            duration,
            icon:<FaInfoCircle className='text-sky-600' />,
            position:`top-right`
        });
    }
    
}