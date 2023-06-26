import {createContext,useState,useEffect} from "react";
import {onAuthStateChanged,signOut} from "firebase/auth";
import {auth} from "../firebase";
import {useRouter} from "next/router";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [curUser, setCurUser] = useState({});
    const router = useRouter();

    const Logout = ( ) => {
       signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,curUser => {
            setCurUser(curUser)
        })
    
        return unsubscribe;
    },[])

    return (
        <AuthContext.Provider value={{curUser,setCurUser,Logout}}>
            {children}
        </AuthContext.Provider>
    )
}