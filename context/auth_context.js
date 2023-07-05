import {createContext,useState,useEffect} from "react";
import {onAuthStateChanged,signOut,updateProfile,updateEmail,sendEmailVerification } from "firebase/auth";
import {auth} from "../firebase";
import {useRouter} from "next/router";
import { sanityClient } from "../sanity_client";


export const AuthContext = createContext();

export default function AuthContextProvider({children}){
    const [userDetailSanity, setUserDetailSanity] = useState(null);
    const [curUser, setCurUser] = useState(null);
    const [activePlan, setActivePlan] = useState(null);
    const [updationState, setupdationState] = useState(false);
    const [seq,setSeq] = useState(1);
    const router = useRouter();

    
    const Logout = ( ) => {
        localStorage.removeItem("currentUser")
        signOut(auth)
    }
    
    const UpdateProfileNameFun = () => {
        console.log("UpdateProfileNameFun",seq);
        setSeq(seq+1);
        console.log("user in updator fun",userDetailSanity);
         updateProfile(auth.currentUser,{
            displayName : userDetailSanity.userName
         }).then((res)=>console.log("Profile name updated in firebase",res))
         .catch((err)=>console.log("error while update Profile Name in firebase",err))
    }

    const UpdateEmailFun = () => {
        console.log("UpdateEmailFun",seq);
        setSeq(seq+1);
        updateEmail(auth.currentUser, userDetailSanity.userEmail)
        .then((res)=>{
           console.log("Profile email updated at firebase",res);
           UpdateEmailVerifiedFun();
        })
        .catch((err)=>console.log("error while updating email at firebase",err))
    }

    const UpdateEmailVerifiedFun = () => {
        console.log("UpdateEmailVerifiedFun",seq);
        setSeq(seq+1);
        sendEmailVerification(auth.currentUser)
        .then(()=>{
            alert("verification email sent")
        })
        .catch((err)=>console.log("error while sending verification email",err))
    }

    const updateCurrentUserProfile = () => {
        console.log("updateCurrentUserProfile",seq);
        setSeq(seq+1);
        console.log("auth current user",auth.currentUser);   
        if(userDetailSanity && auth.currentUser && curUser && curUser.displayName===null){
            UpdateProfileNameFun();
        }   
        if(userDetailSanity && auth.currentUser && curUser && curUser.email===null){
            UpdateEmailFun();
        }   
        else if(userDetailSanity && auth.currentUser && curUser && curUser.email!==null && !curUser.emailVerified){
            UpdateEmailVerifiedFun();
        } 
    }

    useEffect(()=>{
        console.log("use Effect 3",userDetailSanity);
        updateCurrentUserProfileFunction();
    },[userDetailSanity])

    useEffect(()=>{
        console.log("useEffect one",seq);
        setSeq(seq+1);
        console.log("running for updation of sanity user");
        let curUserId = localStorage.getItem("currentUser") || null;
        console.log("curUserId",curUserId,"curUser",curUser,"userDetailSanity",userDetailSanity);
        if(curUserId){
            if(curUser && userDetailSanity==null){
               sanityClient.fetch(`*[_type=="users" && _id=="${curUserId}"]`)
               .then((res)=>{
                setUserDetailSanity(res[0])})
               .catch((err)=>console.log("error while fetching current user detail from sanity",err))
            }
        } 

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
    },[updationState]);

    function updateCurrentUserProfileFunction(){
        console.log(" updateCurrentUserProfileFunction",seq);
        setSeq(seq+1);
        console.log("use effect running","curUser",curUser,"userDetailSanity",userDetailSanity,"auth",auth);
        if(curUser){
            updateCurrentUserProfile();
        }
    }


    useEffect(()=>{
        console.log("useEffect two",seq);
        setSeq(seq+1);
        const unsubscribe = onAuthStateChanged(auth,curUser => {
            if(curUser){   
                setCurUser(curUser);
                setupdationState(!updationState);
            }
            else{
                setCurUser(null);
            }
        })
    
        return unsubscribe;
    },[])

    return (
        <AuthContext.Provider value={{curUser,setCurUser,Logout,setupdationState,updationState}}>
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