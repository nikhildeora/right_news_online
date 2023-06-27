import { useState, useContext } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth_context";
import { sanityClient } from "../sanity_client";
import { v4 as uuidv4 } from 'uuid';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';



const buttonStyle = {padding:"8px 15px",backgroundColor:"blue",borderRadius:"8px",color:"white",fontWeight:"bold",marginTop:"50px",position:"relative",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"20%"}

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
                            localStorage.setItem("currentUser",res._id)
                            router.push("/");
                        })
                        .catch((err) => console.log("error while creating new", err))
                } else {
                    sanityClient.patch(currentId)
                        .set(editObj)
                        .commit()
                        .then((res) => {
                            console.log("user edited successfully");
                            localStorage.setItem("currentUser",res._id)
                            router.push("/");
                        })
                        .catch((err) => console.log("error while editing user", err))
                }
            }).catch((err) => {
                console.log("error", err);
            })
    }

    const verifyPhoneNumber = async (e) => {
        e.preventDefault();
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
            <Container className="container">
                {verify ?
                    <div>
                        {signIn ?
                            <div className="sign_user_card">
                                <h3 className="mb-3 text-center">Sign Up</h3>    
                                <form onSubmit={verifyPhoneNumber}>
                                <input className="form-control mb-2" type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                <input className="form-control mb-2" type="email" placeholder="Enter Your Email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                                <input className="form-control mb-2" type="number" placeholder="Enter Your Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                <input style={buttonStyle} type="submit" value={"Sign up"} />
                                </form>
                                <div className="mt-3">
                                    <div className="d-flex justify-content-center links">
                                        Already have an account?
                                        <span style={{cursor:"pointer"}} onClick={SignInchange} className="text-primary ml-2">Login</span>
                                    </div>
                                </div>
                            </div> :
                            <div>
                                <h3 className="mb-3 text-center">Sign In</h3>    
                                <form onSubmit={verifyPhoneNumber}>
                                <input className="form-control mb-2" type="number" placeholder="Enter Your Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                <input style={buttonStyle} type="submit" value={"Login"} />
                                </form>
                                <div className="mt-3">
                                    <div className="d-flex justify-content-center links">
                                        Don't have an account?
                                        <span style={{cursor:"pointer"}} onClick={SignInchange} className="text-primary ml-2">Sign up</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    :
                    <div>
                        <h3 className="mb-3 text-center">Verify OTP</h3>    
                        <input className="form-control mb-2" type="number" placeholder="type your otp here" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                        <button style={buttonStyle} onClick={verifyOtp}>Verify</button>
                    </div>
                }
            </Container>
            <div id="recaptcha-container"></div>
        </div>
    )
} 