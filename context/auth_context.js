import {createContext,useState,useEffect} from "react";
import {onAuthStateChanged,signOut} from "firebase/auth";
import {auth} from "../firebase";
import {useRouter} from "next/router";
import { sanityClient } from "../sanity_client";

export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [curUser, setCurUser] = useState({});
    const [activePlan, setActivePlan] = useState({});
    const router = useRouter();

    const Logout = ( ) => {
       localStorage.removeItem("currentUser")
       signOut(auth)
    }

    useEffect(()=>{
        let curUserId = localStorage.getItem("currentUser") || null;
        if(curUserId){
            sanityClient.fetch(`*[_type=="memberships" && user._ref=="${curUserId}"]{
                ...,
                "userDetails" : user->,
                "planDetail" : plan->  
              }`)
            .then((res)=>{
                if(res.length>0){
                    setActivePlan(res);
                }
            })
            .catch((err)=>console.log("error while set plan",err))
        }

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


// for plan page 
// let date = new Date();
// let endDate = new Date();
// endDate.setDate(endDate.getDate()+30);
// let endDateFormat = endDate.toISOString();
// let formatDate = date.toISOString();


// let planObj = {
//     _id : uuidv4(),
//     _type : "memberships",
//     plan : {
//         _ref : "id of plan",
//         _type : "reference"
//     },
//     user : {
//         _ref : "id of user saved in local storage",
//         _type : "reference"
//     },
//     startDate : formatDate,
//     endtDate : endDateFormat
// }

// sanityClient.create(planObj)
// .then((res)=>console.log(res))
// .catch((err)=>console.log(err))