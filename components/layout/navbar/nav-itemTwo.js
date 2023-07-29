import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import DropdownMenu from "./dropdown-menu";
import MegaMenu from "./mega-menu";

export default function NavItemTwo({
  navItemText,
  menuItems,
  megaMenu = false,
}) {
  console.log(menuItems);
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const handleClick = (e) => {
    setIsOpenDropDown(!isOpenDropDown);
  };

  return (
    <li className={`nav-item ${menuItems ? "nav-item-has-children" : ""}`}>
      <a href="#" className="nav-link-item drop-trigger" onClick={handleClick}>
        {navItemText}
      </a>

      {!megaMenu ? (
        <DropdownMenu isOpenDropDown={isOpenDropDown} menuItems={menuItems} />
      ) : (
        <MegaMenu menuItems={menuItems} />
      )}
    </li>
  );
}

//---------------------------------------------------------------------------------------------//
