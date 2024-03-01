import { createContext, useContext } from 'react';
import { AuthProps } from '../interfaces/authInterface';
import { BarProps } from '../interfaces/barInterface';

export const AuthContext = createContext<AuthProps>({} as AuthProps);
export const BarContext = createContext<BarProps>({} as BarProps);


export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const useBarContext = () => {
    return useContext(BarContext);
}