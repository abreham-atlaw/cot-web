import React, { useState } from "react";
import Profile, { Role } from "@/apps/auth/domain/models/profile";

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

    return (<>
       
        <tr>
            {
                [
                    props.user.id?.split("-")[0],
                    props.user.email,
                    "Not Assigned",
                   Role[props.user.role],
                   
                ].map(
                    (title) => (
                        <td className="px-4 text-start py-2 truncate overflow-hidden whitespace-nowrap">{title}</td>
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
        </tr>
        </>
    )
}

export default UserListComponent;
