/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import {
  BlogDropdownMenus,
  ContactDropdownMenus,
  DemoDropdownMenus,
  ElementsMegaMenu,
  PagesDropdownMenus,
} from "../navbar/menu-data";
import NavItem from "../navbar/nav-item";
import Navbar from "../navbar/navbar";
import useScroll from "./../../../hooks/useScroll";
import { AuthContext } from "../../../context/auth_context";
import { sanityClient } from "../../../sanity_client";

export default function HeaderHomeThree() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { curUser, Logout } = useContext(AuthContext);
  const [userDetailSanity, setUserDetailSanity] = useState(null);

  const name = userDetailSanity ? userDetailSanity.userName.charAt(0) : "User";

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
        });
    }
  }, []);

  const LogoutNow = () => {
    Logout();
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scroll = useScroll();
  return (
    <header
      className={`site-header site-header--menu-right fugu--header-section fugu--header-three ${
        scroll ? "sticky-menu" : ""
      }`}
      id="sticky-menu"
    >
      <div className="container-fluid">
        <nav className="navbar site-navbar">
          <div className="brand-logo">
            <Link href={"/"}>
              <img
                src="https://rightnewsonline.com/wp-content/uploads/2023/03/download.png"
                alt=""
                width={"70px"}
              />
            </Link>
          </div>
          <div className="menu-block-wrapper">
            <div
              className={`menu-overlay ${isMobileMenuOpen ? "active" : null}`}
              onClick={handleCloseMobileMenu}
            ></div>
            <nav
              className={`menu-block ${isMobileMenuOpen ? "active" : null}`}
              id="append-menu-header"
            >
              <div className="mobile-menu-head">
                <div
                  className="mobile-menu-close"
                  onClick={handleCloseMobileMenu}
                >
                  &times;
                </div>
              </div>

              <Navbar>
                <NavItem navItemText="Home" />
                {/* <NavItem navItemText="Demo" menuItems={DemoDropdownMenus} /> */}
                <NavItem navItemText="Pages" menuItems={PagesDropdownMenus} />
                <NavItem
                  navItemText="Elements"
                  menuItems={ElementsMegaMenu}
                  // megaMenu
                />
                <NavItem navItemText="News" menuItems={BlogDropdownMenus} />
                <NavItem
                  navItemText="Contact Us"
                  menuItems={ContactDropdownMenus}
                />
              </Navbar>
            </nav>
          </div>
          <div className="header-btn header-btn-l1 ms-auto d-none d-xs-inline-flex">
            {curUser ? (
              <Link
                onClick={LogoutNow}
                className="fugu--btn fugu--menu-btn1"
                href={"#"}
              >
                Logout
              </Link>
            ) : (
              <Link className="fugu--btn fugu--menu-btn1" href={"/signup"}>
                Sign up/ Login
              </Link>
            )}
            {/* <a className="fugu--btn fugu--menu-btn1" href="contact.html">
							Sign up/ Login
						</a> */}
          </div>
          <div>
            {curUser ? (
              <Link href="/profile">
                <div class="rounded-circle ms-4 d-xs-inline-flex bg-danger text-white">
                  <small>{name}</small>
                </div>
              </Link>
            ) : null}
          </div>
          <div
            className="mobile-menu-trigger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
          </div>
        </nav>
      </div>
    </header>
  );
}
