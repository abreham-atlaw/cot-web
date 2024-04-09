import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { User, Role } from "@/FakeTypes/User";

export default function RolesDropDown({ isOpen, toggleDropdown, staff, handleInputChange }: Props) {
    const options = [Role.Admin, Role.Manager, Role.User];
    const [selectedOption, setOption] = useState<Role>(staff?.role!);

    return (
        <div className="adjust-option" onClick={(e) => e.stopPropagation()}>
            <div className="input-container option-select">
                <input
                    style={{ cursor: "pointer" }}
                    name="roles"
                    readOnly
                    type="text"
                    placeholder="Select role"
                    value={selectedOption !== undefined ? Role[selectedOption] : ""}
                    onClick={toggleDropdown}
                />
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>

            {isOpen && (
                <ul className="options-list">
                    {options.map((option) => (
                        <li key={option} onClick={() => { handleInputChange(option); toggleDropdown(); }}>
                            {Role[option]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

interface Props {
    isOpen: boolean;
    toggleDropdown: () => void;
    staff?: User;
    handleInputChange: (value: Role) => void;
}
