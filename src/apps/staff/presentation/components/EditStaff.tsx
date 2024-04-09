import { useState } from "react";
import RolesDropDown from "../components/RolesDropDown";
import DepartmentDropDown from "../components/DepartmentDropDown";
import { Link } from "react-router-dom";

import { Role, User } from "@/FakeTypes/User";
import { Department } from "@/FakeTypes/Department";
import { initalDepartments } from "@/FakeTypes/list";
interface Props {
    onCloseModal: () => void
    staff: User
}
function EditStaff(props: Props) {
    const [isRoleOpen, setRoleOpen] = useState(false);
    const [isDepOpen, setDepOpen] = useState(false);
    const [selectedRole, setRolesOption] = useState(props.staff.role)
    const [selectedDepartment, setDepartmentOption] = useState(props.staff.department)
    const [editedStaff, setStaff] = useState<User>(props.staff);
    const [departments, setDepartment] = useState<Department[]>(initalDepartments)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log()
        setStaff({ ...props.staff, [name]: value });
    };

    const handleSelectChange = (value: Role) => {
        setRolesOption(value)
        // setStaff({...props.staff,"role":value})
    }

    const handleSelectDepChange = (value: Department | undefined) => {
        setDepartmentOption(value)
        //  setStaff({...props.staff,"department":value})
        //  setDepartmentOption(value)
    }

    const edituserAndupdateDepartment = () => {
        const departmentIndex = initalDepartments.findIndex(department => department.id === selectedDepartment?.id)
        if (departmentIndex !== -1) {
            const previousDepartment = editedStaff.department;
            if (previousDepartment) {
                const previousDepartmentIndex = initalDepartments.findIndex(
                    dept => dept.id === previousDepartment.id
                );
                if (previousDepartmentIndex !== -1) {
                    const staffIndex = previousDepartment.staff?.findIndex(
                        user => user === editedStaff.id
                    );
                    if (staffIndex !== -1) {
                        initalDepartments[previousDepartmentIndex].staff?.splice(staffIndex!, 1)
                    }
                } else {
                    console.warn("previous departmetn not found")
                }
            }
            editedStaff.department = selectedDepartment;
            initalDepartments[departmentIndex].staff?.push(editedStaff.id)
        } else {
            console.error("Departmetn not found")
        }

    }




    const toggleRoleDropdown = () => {
        setDepOpen(false);
        setRoleOpen(!isRoleOpen)
    };


    const toggleDepDropdown = () => {
        setDepOpen(!isDepOpen);
        setRoleOpen(false)
    };


    return <div className="box" onClick={() => {
        setDepOpen(false);
        setRoleOpen(false);
    }}>
        <h2> Edit User </h2>
        <div className='inputs'>
            <h3>Employee ID</h3>
            <input placeholder='Enter ID' name="id" value={editedStaff.id} onChange={handleInputChange} />
            <h4>Employee Email</h4>
            <input placeholder='Enter email' name="email" value={editedStaff.email} onChange={handleInputChange} />
            <div className='row'>
                <RolesDropDown toggleDropdown={toggleRoleDropdown} isOpen={isRoleOpen} staff={editedStaff} handleInputChange={handleSelectChange} />
                <DepartmentDropDown toggleDropdown={toggleDepDropdown} isOpen={isDepOpen} staff={editedStaff} handleInputChange={handleSelectDepChange} selectedDep={selectedDepartment} />
            </div>
            <div className='buttons'>
                <button
                    onClick={() => props.onCloseModal()}
                    style={{
                        color: "white",
                        backgroundColor: "black",

                    }}
                >
                    Cancel
                </button>

                <button
                    style={{
                        color: "black",
                        backgroundColor: "white",

                    }}
                    onClick={
                        () => edituserAndupdateDepartment()
                    }
                >
                    Save
                </button>

            </div>
        </div>
    </div>
}
export default EditStaff