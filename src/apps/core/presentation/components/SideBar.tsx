import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaTv } from "react-icons/fa";
import { MdPeople, MdPeopleAlt } from "react-icons/md";
import {
  PiGitPullRequest,
  PiHouse,
  PiSquaresFourBold,
  PiTree,
} from "react-icons/pi";
<<<<<<< HEAD
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

function SideBar() {
  const [activeLink, setActiveLink] = useState<string>("/admin");
  const isTabletSize = useMediaQuery({ query: "(max-width: 800px)" });

  const handleNavLinkClick = (path: string) => {
    setActiveLink(path);
  };

  const sidebar = [
    {
      title: "Dashboard",
      icons: <FaTv />,
      link: "/admin",
    },
    {
      title: "Staff",
      icons: <MdPeople />,
      link: "/base/staff-management/list",
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
      link: "/base/asset-category/list",
    },
  ];

  return (
    <nav className="border-r h-screen fixed top-0 left-0 z-10">
		{isTabletSize? "":(<h1 className="text-4xl text-center font-bold mt-8">Chain of<br/>Trust</h1>)}
      
      <ul className="mt-12">
        {sidebar.map((item, index) => (
          <li key={index} className="">
            <NavLink
              to={item.link}
              className={`${
                (activeLink === item.link) ? 'bg-light' : 'bg-white'
              } hover:bg-light flex py-5
			  ${isTabletSize ? "px-8":"px-16"}`}
              onClick={() => handleNavLinkClick(item.link)}
            >
              {isTabletSize ? (
                <span className="mr-5 text-2xl">{item.icons}</span>
              ) : (
                <>
                  <span className="mr-5 text-2xl">{item.icons}</span>
                  <p>{item.title}</p>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default SideBar;
=======
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import BaseButton from "@/common/components/buttons/BaseButton";


interface SideBarProps {
	status: AuthenticationStatus;
}

const SideBar: FC<SideBarProps> = ({ status }) => {
    const [activeLink, setActiveLink] = useState<string>('/admin');
	const handleNavLinkClick = (path: string) => {
		setActiveLink(path);
	};

	const sidebar = [
		{
			title: "Dashboard",
			icons: <FaTv />,
			link: "/base/dashboard",
			validStatuses: [AuthenticationStatus.admin, AuthenticationStatus.hr, AuthenticationStatus.inventory, AuthenticationStatus.staff, AuthenticationStatus.department]
		},
		{
			title: "Staff",
			icons: <MdPeople />,
			link: "/base/staff-management/list",
			validStatuses: [AuthenticationStatus.hr, AuthenticationStatus.admin]
		},
		{
			title: "Invitations",
			icons: <MdPeopleAlt />,
			link: "/base/invitation/list",
			validStatuses: [AuthenticationStatus.admin, AuthenticationStatus.hr]
		},
		{
			title: "Asset",
			icons: <PiHouse />,
			link: "/base/asset/list",
			validStatuses: [AuthenticationStatus.admin, AuthenticationStatus.inventory]
		},
		{
			title: "Requests",
			icons: <PiGitPullRequest />,
			link: "/base/asset-request/list",
			validStatuses: [AuthenticationStatus.admin, AuthenticationStatus.inventory, AuthenticationStatus.staff]
		},
		{
			title: "Departments",
			icons: <PiTree />,
			link: "/departments",
			validStatuses: [AuthenticationStatus.admin, AuthenticationStatus.hr]
		},
		{
			title: "Category",
			icons: <PiSquaresFourBold />,
			link: "/base/asset-category/list",
			validStatuses: [AuthenticationStatus.admin, AuthenticationStatus.inventory]
		},
	];
	
    return (
		<nav className="border border-right flex flex-col py-10 w-96">
			<h1 className="text-4xl text-center font-bold mt-16">Chain of<br/>Trust</h1>
			<ul className="mt-16">
				{sidebar.map((item, index) => (
					item.validStatuses.includes(status) && (
						<li key={index} className="">
							<NavLink to={item.link} className={`${(activeLink === item.link)?'bg-light':'bg-white'} hover:bg-light flex text-center px-10 py-5`} onClick={() => handleNavLinkClick(item.link)} >
								<span className="mr-5 text-2xl my-auto">{item.icons}</span>
								<p className="">{item.title}</p>
							</NavLink>
						</li>
					)
				))}
			</ul>
			<div className="mt-auto px-10">
				

				<Link to={"/auth/logout"} className="mt-5 w-full block">
					<BaseButton className="text-center block w-full">
						Logout
					</BaseButton>
				</Link>
				
			</div>
		</nav>
	);
}

export default SideBar;
>>>>>>> 9eae48818fc4550ca61f2da16fc22e1c8ed0bc66
