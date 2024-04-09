import React, { useState } from "react";
import Profile from "@/apps/auth/domain/models/profile";

interface UserListComponent {
    user: Profile;
}

const editUser = (user: Profile) => {

}

const deleteUser = (user: Profile) => {

}

const UserListComponent: React.FC<UserListComponent> = (props: UserListComponent) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="flex px-5 py-5 hover:bg-light">
            {
                [
                    props.user.id?.split("-")[0],
                    props.user.email,
                    "Not Assigned",
                    props.user.role.toString(),
                ].map(
                    (title) => (
                        <div className="mx-auto w-1/5">{title}</div>
                    )
                )
            }

            <div className="" onClick={toggleDropdown}>
                <i className="fa-solid fa-sort-down"></i>
                {showDropdown && (
                    <div className="dropdown absolute -ml-24 bg-dark text-white rounded-lg">
                        {
                            [
                                ["Edit", editUser],
                                
                                ["Delete", deleteUser]
                            ].map(
                                (buttonData) => <button className="py-3 block rounded-lg w-full hover:bg-light hover:text-dark px-16" onClick={buttonData[1] as () => void}>{buttonData[0] as string}</button>  
                            )
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserListComponent;
