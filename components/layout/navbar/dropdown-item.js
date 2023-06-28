import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import SecondLevelDropdownMenu from "./second-level-dropdown-menu";

export default function DropdownItem({ navItemText, submenu, path }) {
	const [open, setOpen] = useState(false);
    const [curUserId,setCurUserId] = useState(null);

	useEffect(()=>{
		let curUser = localStorage.getItem("currentUser") || null;
		setCurUserId(curUser);
	},[])
	
	const handleClick = (e) => {
		setOpen(!open);
	};

	return (
		<li className={`sub-menu--item ${submenu ? "nav-item-has-children" : ""}`} onClick={handleClick}>
			{!submenu ? (
				<Link href={navItemText=="Create Blog" ? curUserId ? path : "signup" : path} legacyBehavior>
					<a className="drop-trigger">
						{navItemText} {submenu && <FontAwesomeIcon icon={faAngleDown} />}
					</a>
				</Link>
			) : (
				<a href="#" className="drop-trigger">
					{navItemText} {submenu && <FontAwesomeIcon icon={faAngleDown} />}
				</a>
			)}

			{submenu && <SecondLevelDropdownMenu submenu={submenu} isClicked={open} />}
		</li>
	);
}
