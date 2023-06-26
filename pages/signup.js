import { useState, useContext } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth_context";
import { sanityClient } from "../sanity_client";
import { v4 as uuidv4 } from 'uuid';


const LoginSignUpStyle = {
    textDecoration: "underline", color: "blue", cursor: "pointer"
}

export default function Signup() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [verify, setVerify] = useState(true);
    const router = useRouter();
    const { curUser } = useContext(AuthContext);
    const [signIn, setSignIn] = useState(true);
    const [currentId, setCurrentId] = useState("");
    const [newUserPost, setNewUserPost] = useState(true);
    console.log("user", curUser);

    const signInWithMobile = async () => {
        try {
            let recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                "size": "invisible"
            }, auth);
            let phNum = "+91" + phoneNumber;
            window.confirmationResult = await signInWithPhoneNumber(auth, phNum, recaptchaVerifier);
            await console.log("otp sent");
            await setVerify(!verify);
        } catch (error) {
            console.log("error", error);
        }

    }

    const verifyOtp = () => {
        let date = new Date();
        let formatDate = date.toISOString();

        let obj = {
            _type: "users",
            _id: uuidv4(),
            userPhone: phoneNumber,
            userName: name,
            userEmail: email,
            lastLogin: formatDate,
            activePlan: false
        }

        let editObj = {
            lastLogin: formatDate
        }

        window.confirmationResult.confirm(verificationCode)
            .then((result) => {
                if (newUserPost) {
                    sanityClient.create(obj)
                        .then((res) => {
                            console.log("user created successfully")
                            router.push("/");
                        })
                        .catch((err) => console.log("error while creating new", err))
                } else {
                    sanityClient.patch(currentId)
                        .set(editObj)
                        .commit()
                        .then((res) => {
                            console.log("user edited successfully")
                            router.push("/");
                        })
                        .catch((err) => console.log("error while editing user", err))
                }
            }).catch((err) => {
                console.log("error", err);
            })
    }

    const verifyPhoneNumber = async () => {
        if (phoneNumber.length !== 10) {
            console.log("incorrect phone number");
            return;
        }
        let exist = false;
        let mobiledata = await sanityClient.fetch(`*[_type=="users"]{
            "userPhone" : userPhone,
            _id
          }`).then((res) => {
            let checkIfExist = res.filter((el) => {
                return el.userPhone == phoneNumber
            })
            if (checkIfExist.length > 0) {
                exist = true;
                setCurrentId(checkIfExist[0]._id);
            }
        }).catch((err) => {
            console.log("error in fetching", err);
        })

        if (signIn && exist) {
            alert("You already have an Account, Login with Mobile Number");
            setSignIn(!signIn);
        }
        else if (!signIn && !exist) {
            alert("first sign up you do not have an account");
            setSignIn(!signIn);
        }
        else if (!signIn && exist) {
            setNewUserPost(false);
            signInWithMobile();
        }
        else if (signIn && !exist) {
            setNewUserPost(true);
            signInWithMobile();
        }


    }


    const SignInchange = () => {
        setSignIn(!signIn);
        setPhoneNumber("");
    }

    return (
        <div className="fugu-breadcrumb-section">
            <div className="container">
                {verify ?
                    <>
                        {signIn ?
                            <>
                                <h3>If you Already have an accout <span style={LoginSignUpStyle} onClick={SignInchange}>Login</span></h3>
                                <input type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input type="email" placeholder="Enter Your Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                <input type="number" placeholder="Enter Your Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                <button onClick={verifyPhoneNumber}>Submit</button>
                            </> :
                            <>
                                <h3>If you do not have an accout <span style={LoginSignUpStyle} onClick={SignInchange}>Sign Up</span></h3>
                                <input type="number" placeholder="Enter Your Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                <button onClick={verifyPhoneNumber}>Submit</button>
                            </>
                        }
                    </>
                    :
                    <>
                        <input type="number" placeholder="type your otp here" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                        <button onClick={verifyOtp}>Verify</button>
                    </>
                }
            </div>
            <div id="recaptcha-container"></div>
        </div>
    )
} 