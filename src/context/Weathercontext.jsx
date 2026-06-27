import {createContext,useContext} from 'react';
export const Weathercontext=createContext();

  export const usecontext=()=>{
        useContext(Weathercontext);
}