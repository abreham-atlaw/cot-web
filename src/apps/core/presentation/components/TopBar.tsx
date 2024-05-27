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
      className={`border-b fixed bg-white border-bottom-2 py-4 px-10 flex justify-end items-center ${
        isTabletSize ? " w-[90%]" : " "
      } ${isMobileSize ? "w-full" : " w-4/5"}`}
    >
      {/* <div className="text-2xl"></div> */}
      {/* <div className='w-[60%] mx-auto ml-12'>
    <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="Search something.." /> 
    </div>
</div> */}
      <div className="flex">

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
