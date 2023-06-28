import { useState, useContext } from "react";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth_context";
import { sanityClient } from "../sanity_client";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import BreadcrumbOne from "../components/common/breadcrumb/breadcrumb-one";
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';



export default function Signup() {
    const [country, setCountry] = useState("91");
    const [verify, setVerify] = useState(true);
    const router = useRouter();
    const { curUser } = useContext(AuthContext);
    const [signIn, setSignIn] = useState(true);
    const [currentId, setCurrentId] = useState("");
    const [newUserPost, setNewUserPost] = useState(true);
    console.log("user", curUser);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const signInWithMobile = async (formData) => {
        const { name, email, phoneNumber, verificationCode } = formData;

        try {
            let recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                "size": "invisible"
            }, auth);
            let phNum = "+" + country + phoneNumber;
            window.confirmationResult = await signInWithPhoneNumber(auth, phNum, recaptchaVerifier);
            await console.log("otp sent");
            await setVerify(!verify);
        } catch (error) {
            console.log("error", error);
        }

    }

    const verifyOtp = (formData) => {
        const { name, email, phoneNumber, verificationCode } = formData;

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
                            localStorage.setItem("currentUser", res._id)
                            router.push("/");
                        })
                        .catch((err) => console.log("error while creating new", err))
                } else {
                    sanityClient.patch(currentId)
                        .set(editObj)
                        .commit()
                        .then((res) => {
                            console.log("user edited successfully");
                            localStorage.setItem("currentUser", res._id)
                            router.push("/");
                        })
                        .catch((err) => console.log("error while editing user", err))
                }
            }).catch((err) => {
                console.log("error", err);
            })
    }

    const verifyPhoneNumber = async (formData) => {
        const { name, email, phoneNumber, verificationCode } = formData;

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
            signInWithMobile(formData);
        }
        else if (signIn && !exist) {
            setNewUserPost(true);
            signInWithMobile(formData);
        }


    }


    const SignInchange = () => {
        setSignIn(!signIn);
    }


    const SelectFlag = (status, countryC) => {
        setCountry(countryC.dialCode)
    }

    return (
        <div>
            <BreadcrumbOne title={verify ? signIn ? "Sign up" : "Login" : "Verify OTP"} />
            <div className="section fugu-section-padding">
                <div className="container">
                    {verify ?
                        <div>
                            {signIn ?
                                <div className="fugu-contact-wrap  wow fadeInUpX">
                                    <form onSubmit={handleSubmit(verifyPhoneNumber)}>
                                        <div className="fugu-input-field">
                                            <label>Your name</label>
                                            <input
                                                type="text"
                                                placeholder="Your Name*"
                                                {...register("name", { required: true })}
                                                aria-invalid={errors.name ? "true" : "false"}
                                            />
                                            {errors.name?.type === "required" && (
                                                <p role="alert" className="error">
                                                    First name is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="fugu-input-field">
                                            <label>Email address</label>
                                            <input
                                                type="email"
                                                placeholder="Your Email*"
                                                {...register("email", { required: true })}
                                                aria-invalid={errors.email ? "true" : "false"}
                                            />
                                            {errors.email?.type === "required" && (
                                                <p role="alert" className="error">
                                                    Email is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="fugu-input-field">
                                            <label>Mobile Number</label>
                                            <div style={{ display: "flex" }}>
                                                <IntlTelInput
                                                    style={{ flex: "1" }}
                                                    containerClassName="intl-tel-input"
                                                    inputClassName="form-control"
                                                    onSelectFlag={SelectFlag}
                                                    preferredCountries={['in']}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Your Mobile Number*"
                                                    {...register("phoneNumber", { required: true })}
                                                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                                                />
                                            </div>
                                            {errors.phoneNumber?.type === "required" && (
                                                <p role="alert" className="error">
                                                    Mobile Number is required
                                                </p>
                                            )}
                                        </div>
                                        <button id="fugu-input-submit" type="submit">
                                            Sign up
                                        </button>
                                    </form>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-center links">
                                            Already have an account?
                                            <span style={{ cursor: "pointer" }} onClick={SignInchange} className="text-primary ml-2">Login</span>
                                        </div>
                                    </div>
                                </div> :
                                <div className="fugu-contact-wrap  wow fadeInUpX">
                                    <form onSubmit={handleSubmit(verifyPhoneNumber)}>
                                        <div className="fugu-input-field">
                                            <label>Mobile Number</label>
                                            <div style={{ display: "flex" }}>
                                                <IntlTelInput
                                                    style={{ flex: "1" }}
                                                    containerClassName="intl-tel-input"
                                                    inputClassName="form-control"
                                                    onSelectFlag={SelectFlag}
                                                    preferredCountries={['in']}
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Your Mobile Number*"
                                                    {...register("phoneNumber", { required: true })}
                                                    aria-invalid={errors.phoneNumber ? "true" : "false"}
                                                />
                                            </div>
                                            {errors.phoneNumber?.type === "required" && (
                                                <p role="alert" className="error">
                                                    Mobile Number is required
                                                </p>
                                            )}
                                        </div>
                                        <button id="fugu-input-submit" type="submit">
                                            Login
                                        </button>
                                    </form>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-center links">
                                            Don't have an account?
                                            <span style={{ cursor: "pointer" }} onClick={SignInchange} className="text-primary ml-2">Sign up</span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div> :
                        <div className="fugu-contact-wrap  wow fadeInUpX">
                            <form onSubmit={handleSubmit(verifyOtp)}>
                                <div className="fugu-input-field">
                                    <label>Verfiy OTP</label>
                                    <input
                                        type="number"
                                        placeholder="Your OTP*"
                                        {...register("verificationCode", { required: true })}
                                        aria-invalid={errors.verificationCode ? "true" : "false"}
                                    />
                                    {errors.verificationCode?.type === "required" && (
                                        <p role="alert" className="error">
                                            OTP Number is required
                                        </p>
                                    )}
                                </div>
                                <button id="fugu-input-submit" type="submit">
                                    Verify
                                </button>
                            </form>
                        </div>
                    }
                </div>
                <div id="recaptcha-container"></div>
            </div>
        </div>
    )
}


