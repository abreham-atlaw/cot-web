import { FaTv } from "react-icons/fa";
import { MdPeople } from "react-icons/md";
import {
  PiGitPullRequest,
  PiHouse,
  PiSquaresFourBold,
  PiTree,
} from "react-icons/pi";
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