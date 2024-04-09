import { User } from "@/FakeTypes/User";
import { initialStaffs } from "@/FakeTypes/list";
import { useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
interface Props{
    isDropdownOpen:boolean,
    handleDropdown:()=>void,
    handleInputChange:(value:User)=>void
}
function StaffsDropDown(props:Props) {
    const options = initialStaffs
    const [selectedOption, setSelectedOption] = useState<User>();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] as File;
    };

    const handleOptionClick = (option: User) => {
        setSelectedOption(option);
        props.handleInputChange(option)
       props.handleDropdown()
    };

    return (
        <div className="adjust-option" onClick={(e) => e.stopPropagation()}>
            <div
                className='input-container option-select'
                style={{
                    cursor: "pointer"
                }}
            >
                <input
                    type='text'
                    placeholder='Select Staff'
                    value={selectedOption?.id}
                    readOnly
                    onClick={props.handleDropdown}
                />
                <div
                    className='dropdown-arrow'
                    onClick={props.handleDropdown}
                >
                    <IoIosArrowDown />
                </div>

                {props.isDropdownOpen && <ul
                    className='options-list'

                >
                    {options.map((option) => (
                        <li
                            key={option.id}
                         onClick={() => handleOptionClick(option)}
                        >
                            {option.id}
                        </li>
                    ))}
                </ul>
                }

            </div>
        </div>
    )
}
export default StaffsDropDown