import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BreadcrumbOne from "../components/common/breadcrumb/breadcrumb-one";
import "react-intl-tel-input/dist/main.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { sanityClient } from "../sanity_client";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [userDetailSanity, setUserDetailSanity] = useState(null);
  const [signIn, setSignIn] = useState(true);

  useEffect(() => {
    let curUserId = localStorage.getItem("currentUser") || null;
    if (curUserId) {
      sanityClient
        .fetch(`*[_type=="users" && _id=="${curUserId}"]`)
        .then((res) => {
          //   console.log("setUserDetailSanity", res, res[0]);
          if (res.length > 0) {
            setUserDetailSanity(res[0]);
          }
        })
        .catch((err) => console.log("Error while Display Details", err));
    }
  }, []);

  return (
    <div>
      <BreadcrumbOne title={signIn ? "Profile Details" : "Login"} />
      <div className="section fugu-section-padding">
        <div className="container">
          <div>
            {signIn ? (
              <div className="fugu-contact-wrap  wow fadeInUpX">
                <div className="d-flex flex-row  fugu-input-field">
                  <label className="fs-5">Your name</label>
                  <div className="h5 mb-4 ms-4 text-danger border-bottom border-danger">
                    {userDetailSanity ? userDetailSanity.userName : "NA"}
                  </div>
                </div>
                <div className="d-flex flex-row  fugu-input-field">
                  <label className="fs-5">Email address</label>
                  <div className="h5 mb-4 ms-4 text-danger border-bottom border-danger">
                    {userDetailSanity ? userDetailSanity.userEmail : "NA"}
                  </div>
                </div>
                <div className="d-flex flex-row  fugu-input-field">
                  <label className="fs-5">Mobile Number</label>
                  <div className="h5 mb-4 ms-4 text-danger border-bottom border-danger">
                    {userDetailSanity
                      ? `${"+91" + " " + userDetailSanity.userPhone}`
                      : "NA"}
                  </div>
                </div>
                <div className="d-flex flex-row  fugu-input-field">
                  <label className="fs-5">Active Plan Details</label>
                  <div className="h5 ms-4">
                    {userDetailSanity &&
                      (userDetailSanity.activePlan === false ? (
                        <>
                          <div className="d-flex flex-row">
                            <p className="text-danger border-bottom border-danger">
                              No Active Plan
                            </p>
                            {"\u00A0"}
                            {"\u00A0"}
                            <Link href="/pricing-two" className="fs-6">
                              {"(" + "Use this link to buy Plan" + ")"}
                            </Link>
                          </div>
                        </>
                      ) : (
                        <div className="h4 center mb-4 ms-4 text-danger border-bottom border-danger">
                          "No information available .! Please try to login again
                          !"
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              Swal.fire({
                title: "Can't find user",
                text: "Please Login / Signup to proceed further",
                icon: "error",
                showCancelButton: true,
                confirmButtonColor: "#26215c",
                cancelButtonColor: "#757575",
                confirmButtonText: "LOGIN / SIGNUP",
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push("/signup");
                }
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
