import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Role, User } from "../../Domain/User/User";
import { useState } from "react";

interface Props{
    isOpen:boolean,
    toggleDropdown:()=>void,
    staff?:User,
    handleInputChange:(value:Role)=>void,
  
}

export default function RolesDropDown(props:Props){
    
    const options = [Role.Admin,Role.Manager,Role.User];
    const [selectedOption,setOption] = useState(props.staff?.role)   
    return(
    <div className="adjust-option" onClick={(e) => e.stopPropagation()}>
     <div className='input-container option-select'>
    <input
    style={{
        cursor:"pointer"
    }}
    name="roles"
    readOnly

        type='text'
        placeholder='Select role'
        value={selectedOption !== undefined? Role[selectedOption!]: ""}
      onClick={() => props.toggleDropdown()}
    />
    {props.isOpen ? <IoIosArrowUp /> :<IoIosArrowDown />} 
    </div>
     
     {props.isOpen && (
        <ul className='options-list'>
            {options.map((option) => (
                <li
                    key={option}
             onClick={() =>{ setOption((s)=>s=option);
                props.handleInputChange(selectedOption!)
                props.toggleDropdown() }}
                >
                    {Role[option]}
                </li>
            ))}
        </ul>
    )}   
    
</div>)

}