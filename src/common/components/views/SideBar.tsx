/* eslint-disable @typescript-eslint/no-unused-vars */
import {  FaTv } from "react-icons/fa";
import {  MdPeople } from "react-icons/md";
import {
	PiGitPullRequest,
	PiHouse,
	PiSquaresFourBold,
	PiTree,
} from "react-icons/pi";
import styles from './SideBar.module.css'
import { NavLink } from "react-router-dom";
import { useState } from "react";

function SideBar(){
    const [activeLink,setActiveLink] = useState<string>('/admin')
	const handleNavLinkClick = (path: string) => {
		setActiveLink(path);};

    const sidebar = [
		{
			title: "Dashboard",
			icons: <FaTv />,
			link: "/admin",
		},
		{
			title: "Staff",
			icons: <MdPeople />,
			link: "/staffs",
		},
		{
			title: "Property",
			icons: <PiHouse />,
			link: "/assets",
		},
		{
			title: "Requests",
			icons: <PiGitPullRequest />,
			link: "/requests",
		},
		{
			title: "Departments",
			icons: <PiTree />,
			link: "/departments",
		},
		{
			title: "Category",
			icons: <PiSquaresFourBold />,
			link: "/categories",
		},
	];

    return <nav className={styles.sidebar}>
     <h1>Chain of Trust</h1>
     <ul>
        {sidebar.map((item,index)=>(
            <li key={index} >
                <NavLink to={item.link}  className={({ isActive }) => (isActive ? styles.selected : '')} onClick={()=>handleNavLinkClick(item.link)} >
              
                <span>{item.icons}</span>
                <p>{item.title}</p>
                
                
                </NavLink>
            </li>
        ))}
     </ul>

    </nav>
   
}
export default SideBar