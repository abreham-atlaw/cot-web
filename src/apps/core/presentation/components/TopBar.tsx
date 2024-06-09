import Profile, { Role } from "@/apps/auth/domain/models/profile";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

interface NavBarProps {
  user: Profile;
}

const DashboardNavBar: React.FC<NavBarProps> = ({ user }) => {
  const isTabletSize = useMediaQuery({
    query: "(min-width: 630px) and (max-width: 940px)",
  });
  const isMobileSize = useMediaQuery({ query: "(max-width: 630px)" });
  const [isOpen, setIsOpen] = useState(false); // State for dropdown visibility

  const handleOpenDropdown = () => setIsOpen(!isOpen); // Toggle dropdown

  return (
    <div
      className={`border-b fixed bg-white border-bottom-2 py-4 px-10 flex justify-end items-center ${
        isTabletSize ? " w-[90%]" : " "
      } ${isMobileSize ? "w-full" : " w-4/5"}`}
    >
      {/* ... rest of the code ... */}
      <div className="flex w-full">
        {/* User Info with Dropdown */}
        <div className="rounded-full ml-auto flex items-center justify-center relative">
          <div
            className={`rounded-xl px-10 py-4 flex cursor-pointer ${
              isOpen ? "bg-gray-200" : ""
            }`}
            onClick={handleOpenDropdown}
          >
            <i className="fa-regular fa-user mr-5 my-auto"></i>
            {isMobileSize ? (
              <span className="my-auto overflow-clip truncate">
                {user.name[0]} ({Role[user.role].toUpperCase()})
              </span>
            ) : (
              <span className="my-auto overflow-clip truncate">
                {user.name} ({Role[user.role].toUpperCase()})
              </span>
            )}
          </div>
          {/* Dropdown Menu (conditionally rendered) */}
          {isOpen && (
            <div className="absolute top-full right-0 bg-white shadow rounded py-2 w-full">
              <Link to="/base/auth/change-password" className="block px-8 py-2 hover:bg-gray-200">
                Change Password
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
