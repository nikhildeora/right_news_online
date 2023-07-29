/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
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
import NavItemTwo from "../navbar/nav-itemTwo";

export default function HeaderHomeThree() {
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { curUser, Logout } = useContext(AuthContext);

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
                <Link href={"/"}>
                  <NavItemTwo navItemText="Home" />
                </Link>
                {/* <NavItem navItemText="Demo" menuItems={DemoDropdownMenus} /> */}
                <Link href={"/createblog"}>
                  <NavItemTwo navItemText="News" />
                </Link>

                <NavItem
                  navItemText="Catagories"
                  menuItems={ElementsMegaMenu}
                  // megaMenu
                />
                <Link href={"/pricing-two"}>
                  <NavItemTwo
                    navItemText="Pricing Plans
"
                  />
                </Link>
                <Link href={"/contact-dark"}>
                  <NavItemTwo navItemText="Contact Us" />
                </Link>
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
                Sign up / Login
              </Link>
            )}
            {/* <a className="fugu--btn fugu--menu-btn1" href="contact.html">
							Sign up/ Login
						</a> */}
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
