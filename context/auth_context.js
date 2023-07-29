import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signOut,
  updateProfile,
  updateEmail,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { sanityClient } from "../sanity_client";

import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userDetailSanity, setUserDetailSanity] = useState(null);
  const [curUser, setCurUser] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  const [updationState, setupdationState] = useState(false);
  const [seq, setSeq] = useState(1);
  const router = useRouter();

  useEffect(() => {
    let curUserId = localStorage.getItem("currentUser") || null;
    if (curUserId) {
      sanityClient
        .fetch(`*[_type=="users" && _id=="${curUserId}"]`)
        .then((res) => {
          if (res.length > 0) {
            setUserDetailSanity(res[0]);
          }
        })
        .catch((err) => console.log("error while set user", err));
    }
  }, []);

  const Logout = () => {
    localStorage.removeItem("currentUser");
    signOut(auth);
    setActivePlan(null);
  };

  function updateUserDetailSanityLogin(profileData) {
    setUserDetailSanity(profileData);
  }

  function UpdateProfileName(profileData) {
    return updateProfile(auth.currentUser, {
      displayName: profileData.userName,
    })
      .then((res) => console.log("Profile name updated", res))
      .catch((err) => console.log("error while update profile name", err));
  }

  function UpdateProfileEmail(profileData) {
    return updateEmail(auth.currentUser, profileData.userEmail)
      .then(async (res) => {
        console.log("profile email updated", res);
        let data = await reload(auth.currentUser);
        console.log("data after reload", data);
        VerifyEmailFunction();
      })
      .catch((err) => console.log("error while update email", err));
  }

  function VerifyEmailFunction() {
    console.log("veri function run", auth);
    if (!auth.currentUser.emailVerified && auth.currentUser.email !== null) {
      sendEmailVerification(auth.currentUser)
        .then((res) => {
          console.log("email sent successfully for verify", res);

          Swal.fire({
            title: "Email Sent",
            text: "Email sent successfully please Verify our email",
            icon: "success",
            confirmButtonColor: "#26215c",
            confirmButtonText: "Close",
          });
        })
        .catch((err) => console.log("error while sending verify email", err));
    }
  }

  async function ChangeProfileNameAndEmail(profileData) {
    setUserDetailSanity(profileData);
    let profile_name = await UpdateProfileName(profileData);
    let profile_email = await UpdateProfileEmail(profileData);
    console.log("profile_name", profile_name, "profile_email", profile_email);
  }

  useEffect(() => {
    console.log("this useEffect of membership");
    let curUserId = localStorage.getItem("currentUser") || null;
    console.log("cur user id", curUserId);
    if (curUserId) {
      sanityClient
        .fetch(
          `*[_type=="memberships" && user._ref=="${curUserId}"]{
                ...,
                "userDetails" : user->,
                "planDetail" : plan->  
              }`
        )
        .then((res) => {
          if (res.length > 0) {
            console.log("it is fetching cur plan", res);

            setActivePlan(res[0]);
          }
        })
        .catch((err) => console.log("error while set plan", err));
    }
  }, [updationState]);

  useEffect(() => {
    console.log("useEffect two", seq);
    setSeq(seq + 1);
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setCurUser(curUser);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        curUser,
        setCurUser,
        Logout,
        setupdationState,
        updationState,
        ChangeProfileNameAndEmail,
        VerifyEmailFunction,
        updateUserDetailSanityLogin,
        activePlan,
        setActivePlan,
        userDetailSanity,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
