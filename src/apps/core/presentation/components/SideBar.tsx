import { FC, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaSignInAlt, FaTv } from "react-icons/fa";
import { MdPeople, MdPeopleAlt } from "react-icons/md";
import {
  PiGitPullRequest,
  PiHouse,
  PiSquaresFourBold,
  PiTree,
  PiWrench,
} from "react-icons/pi";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
// import BaseButton from "@/common/components/buttons/BaseButton";
import { useMediaQuery } from "react-responsive";
import BaseButton from "@/common/components/buttons/BaseButton";
import PermissionConfigs, { Pages } from "@/configs/permissionConfigs";
import Modal from "react-modal";

interface SideBarProps {
  status: AuthenticationStatus;
}

const SideBar: FC<SideBarProps> = ({ status }) => {
  const [activeLink, setActiveLink] = useState<string>("/admin");
  const handleNavLinkClick = (path: string) => {
    setActiveLink(path);
  };
  const isTabletSize = useMediaQuery({
    query: "(min-width: 630px) and (max-width: 940px)",
  });
  const isMobileSize = useMediaQuery({ query: "(max-width: 630px)" });
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const sidebar = [
    {
      title: "Dashboard",
      icons: <FaTv />,
      link: "/base/dashboard",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.dashboard)!,
    },
    {
      title: "Staff",
      icons: <MdPeople />,
      link: "/base/staff/list",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.staff)!,
    },
    {
      title: "Invitations",
      icons: <MdPeopleAlt />,
      link: "/base/invitation/list",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.invitation)!,
    },
    {
      title: "Asset",
      icons: <PiHouse />,
      link: "/base/asset/list",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.asset)!,
    },
    {
      title: "Requests",
      icons: <PiGitPullRequest />,
      link: "/base/asset-request/list",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.request)!,
    },
    {
      title: "Maintenance",
      icons: <PiWrench />,
      link: "/base/asset-maintenance-request/list",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.maintenance)!,
    },
    {
      title: "Departments",
      icons: <PiTree />,
      link: "/base/department/list",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.department)!,
    },
    {
      title: "Category",
      icons: <PiSquaresFourBold />,
      link: "/base/asset-category/list",
      validStatuses: PermissionConfigs.VISIT_PERMISSIONS.get(Pages.category)!,
    },
  ];


  return !isMobileSize ? (
    <nav 
      className={`border-r fixed top-0 left-0 bottom-0 flex flex-col hover:overflow-auto ${
        isTabletSize ? " w-[10%] " : "w-1/5"
      }`}
    >
      {isTabletSize ? (
        ""
      ) : (
        <h1 className="text-4xl text-center font-bold mt-8">
          Chain of
          <br />
          Trust
        </h1>
      )}
      <ul className="mt-16">
        {sidebar.map(
          (item, index) =>
            item.validStatuses.includes(status) && (
              <li key={index} className="">
                <NavLink
                  to={item.link}
                  className={({ isActive }) => `${
                    isActive
                      ? "bg-light border-l-8 border-black"
                      : "bg-white"
                  } hover:bg-light flex py-5
						  ${isTabletSize ? "px-8" : "px-16"}`}
                  onClick={() => handleNavLinkClick(item.link)}
                >
                  {isTabletSize ? (
                    <span
                      className={`mr-5 text-2xl ${
                        activeLink === item.link ? " bg-black-100" : ""
                      }`}
                    >
                      {item.icons}
                    </span>
                  ) : (
                    <>
                      <span className="mr-5 text-2xl color-purple-700">
                        {item.icons}
                      </span>
                      <p>{item.title}</p>
                    </>
                  )}
                </NavLink>
              </li>
            )
        )}
      </ul>

      {isTabletSize && (
        <li className="hover:bg-light px-8 flex py-5">
          <span>
            <FaSignInAlt />
          </span>
        </li>
      )}
      {!(isTabletSize || isMobileSize) && (
        <div className="mt-auto mb-10  px-10">
          <Link to={"/auth/logout"} className="mt-5 w-full block">
            <BaseButton className="text-center block w-full">Logout</BaseButton>
          </Link>
        </div>
      )}
    </nav>
  ) : (
    <>
    {!showSidebar && (<div className="fixed  z-10 left-0 top-0">
      <button onClick={handleSidebar} className="p-5 h-[10%] m-4 ">
        <FaBars className="w-8 h-8 " />
      </button>
      </div>)}
    
      <Modal isOpen={showSidebar} className="h-screen w-1/5 shadow-md bg-white"
      onRequestClose={handleSidebar}
    

     >
      <nav
    className={` fixed top-0 left-0  z-10 ${
      showSidebar ? "h-screen shadow-md" : "w-1/5"
    } bg-white`}
  >
    <div className="flex">
      <button onClick={handleSidebar} className="p-5 m-2">
        <FaBars className="w-8 h-8 " />
      </button>
    
           
    
        <h1 className="text-2xl text-center font-bold mt-6">
          Chain of Trust
        </h1>
  
    </div>
  

   

    
      <ul className="mt-16 bg-white">
        {sidebar.map(
          (item, index) =>
            item.validStatuses.includes(status) && (
              <li key={index} className="" onClick={handleSidebar}>
                    <NavLink
                  to={item.link}
                  className={({ isActive }) => `${
                    isActive
                      ? "bg-light border-l-8 border-black"
                      : "bg-white"
                  } hover:bg-light flex py-5
						  ${isTabletSize ? "px-8" : "px-16"}`}
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
            )
        )}
        <Link to={"/auth/logout"} className=" w-full block">
          <div className="mt-16 px-10 hover:overflow-auto" >
            <BaseButton className="text-center block w-full">
              Logout
            </BaseButton>
          </div>
        </Link>
      </ul>
    
  </nav>
        </Modal>
    </>
        

      
  )
};


export default SideBar;

