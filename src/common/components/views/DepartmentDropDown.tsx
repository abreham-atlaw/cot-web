import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { initalDepartments } from "../../Domain/list";
import { useEffect, useState } from "react";
import { User } from "../../Domain/User/User";
import { Department } from "../../Domain/Department/Department";
interface Props{
    isOpen:boolean,
    toggleDropdown:()=>void,
    staff?:User
    handleInputChange:(value:Department|undefined)=>void,
    selectedDep?:Department|undefined
  
}
export default function DepartmentDropDown(props:Props){
    const options = initalDepartments;

//    const  dep = initalDepartments.filter((dep)=>
//         dep.id == props.staff?.department)
    const  [selectedOption,setOption] = useState<Department|undefined>(props.staff?.department)
    const [departments,setDepartment]=useState<Department[]>(initalDepartments)

    // const updateDepartment = (dep:Department,staff:User)=>{
    //  const departmentIndex =   initalDepartments.findIndex(department=>department.id === dep.id)
    // //  initalDepartments[departmentIndex].staff?.push(props.staff)
    //  setDepartment({...initalDepartments,department})
    // }
    // const [isDepOpen,setDepOpen] = useState(false);
    // const toggleDepDropdown = () => setDepOpen(!isDepOpen);
    useEffect(()=>{
        props.handleInputChange(selectedOption)
    },[selectedOption])

    return(
    <div className="adjust-option" onClick={(e) => e.stopPropagation()} >
     <div className='input-container option-select'>
    <input
    style={{
        cursor:"pointer"
    }}
    name="departmentId"
        type='text'
        placeholder='Select Department'
      value={selectedOption !== undefined? selectedOption.name : ""}
      onClick={() => props.toggleDropdown()}
    />
    {props.isOpen ? <IoIosArrowUp /> :<IoIosArrowDown />} 
    </div>
     
     {props.isOpen && (
        <ul className='options-list'>
            {options.map((option) => (
                <li
                    key={option.id}
                     onClick={() => {
                        setOption((o)=>o=option)
                        props.toggleDropdown()
                       
                        }}
                >
                    {option.name}
                </li>
            ))}
        </ul>
    )}   
    
</div>)
}