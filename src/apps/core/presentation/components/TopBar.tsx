import Profile, { Role } from "@/apps/auth/domain/models/profile";
import React from "react";
import { useMediaQuery } from "react-responsive";

interface NavBarProps {
  user: Profile;
}

const DashboardNavBar: React.FC<NavBarProps> = ({ user }) => {
  const isTabletSize = useMediaQuery({
    query: "(min-width: 630px) and (max-width: 940px)",
  });
  const isMobileSize = useMediaQuery({ query: "(max-width: 630px)" });
  return (
    <div
      className={`border-b fixed   border-bottom-2 py-4 px-10 flex justify-between items-center ${
        isTabletSize ? " w-[90%]" : " "
      } ${isMobileSize ? "w-full " : " w-4/5"}`}
    >
      <div className="text-2xl"></div>
      <div className="flex items-center">
        <div className="rounded-full flex items-center justify-center">
          <div className="rounded-xl px-10 py-4 flex">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
