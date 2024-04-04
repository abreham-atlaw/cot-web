import { Department } from "@/FakeTypes/Department";
import { Role, User } from "@/FakeTypes/User";
import { initalDepartments } from "@/FakeTypes/list";
import RolesDropDown from "@/apps/staff/presentation/components/RolesDropDown";
import DepartmentDropDown from "./DepartmentDropDown";
import { useState } from "react";

interface RegisterProps {
    onClose: () => void;
}

const RegisterStaff: React.FC<RegisterProps> = ({ onClose }) => {
    const initialUser: User = {
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        role: Role.User,
        department: undefined,
    };

    const [isRoleOpen, setRoleOpen] = useState(false);
    const toggleRoleDropdown = () => {
        setDepOpen(false);
        setRoleOpen(!isRoleOpen);
    };

    const [isDepOpen, setDepOpen] = useState(false);
    const [newStaff, setStaff] = useState<User>(initialUser);

    const handleSelectedRole = (value: Role) => {
        setStaff({ ...newStaff, role: value });
    };

    const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>();

    const handleSelectedDepartment = (value: Department | undefined) => {
        setSelectedDepartment(value);
        setStaff({ ...newStaff, department: value });
    };

    const updateDepartmentStaff = (department: Department, newStaff: User) => {
        const departmentIndex = initalDepartments.findIndex((dep) => department.id === dep?.id);
        if (departmentIndex !== -1) {
            initalDepartments[departmentIndex].staff?.push(newStaff.id);
        }
    };

    const toggleDepDropdown = () => {
        setDepOpen(!isDepOpen);
        setRoleOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setStaff({ ...newStaff, [name]: value });
    };

    return (
        <div onClick={() => {
            setDepOpen(false);
            setRoleOpen(false);
        }}>
            <h2>Register User</h2>
            <div className="inputs">
                <h3>Employee ID</h3>
                <input placeholder="Enter ID" name="id" onChange={handleInputChange} />
                <h4>Employee Email</h4>
                <input placeholder="Enter email" name="email" onChange={handleInputChange} />
                <div className="row">
                    <RolesDropDown toggleDropdown={toggleRoleDropdown} isOpen={isRoleOpen} handleInputChange={handleSelectedRole} />
                    <DepartmentDropDown toggleDropdown={toggleDepDropdown} isOpen={isDepOpen} handleInputChange={handleSelectedDepartment} />
                </div>
                <div className="buttons">
                    <button onClick={onClose} style={{ color: "white", backgroundColor: "black" }}>
                        Cancel
                    </button>
                    <button style={{ color: "black", backgroundColor: "white" }} onClick={() => updateDepartmentStaff(selectedDepartment!, newStaff)}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterStaff;
