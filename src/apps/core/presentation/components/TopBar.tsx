import Profile, { Role } from '@/apps/auth/domain/models/profile';
import React from 'react';

interface NavBarProps {
  user: Profile;
}

const DashboardNavBar: React.FC<NavBarProps> = ({ user }) => {
  return (
    <div className="border-b border-bottom-2 py-4 px-10 flex justify-between items-center">
      <div className="text-2xl"></div>
      <div className="flex items-center">
        <div className="rounded-full flex items-center justify-center">
            <div className="rounded-xl px-10 py-4 flex">
                <i className="fa-regular fa-user mr-5 my-auto"></i>
                <span className="my-auto overflow-clip truncate">
                    {user.name} ({Role[user.role].toUpperCase()})
                </span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
