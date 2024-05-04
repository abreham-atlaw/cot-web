import EditModelState from "@/common/state/editModelState";
import DepartmentForm from "../forms/departmentForm";
import Department from "../../domain/models/department";
import Profile from "@/apps/auth/domain/models/profile";


export default class EditDepartmentState extends EditModelState<Department, DepartmentForm>{
    
    users?: Profile[];

}