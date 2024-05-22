import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import Department from "../../domain/models/department";
import DepartmentRepository from "../../infrastructure/repositories/departmentRepository";
import EditDepartmentView from "./EditDepartmentView";
import ListModelView from "./ListModelView";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import PermissionConfigs, { Pages } from "@/configs/permissionConfigs";
import Profile from "@/apps/auth/domain/models/profile";




export default class ListDepartmentsView extends ListModelView<Department>{
    
    getDetailLink(instance: Department): string {
        return `/base/department/detail?id=${instance.id!}`;
    }

    getModalChild(modalClose: () => void, instance?: Department) {
        return <EditDepartmentView closeModal={modalClose} id={instance?.id}/>
    }
    
    onCreateRepository(): EthersModelRepository<Department> {
        return new DepartmentRepository();
    }

    getInstanceValues(instance: Department): string[] {
        return [instance.id!.split("-")[0], instance.name, instance.head!.name];
    }

    getHeadings(): string[] {
        return ["ID", "Department Name", "Head"];
    }

    
    getEditInstanceLink(instance: Department): string {
        return `/base/asset-request/write?id=${instance.id!}`;
    }
    

    getTitle(): string {
        return "Asset Requests"
    }

    getAllowedAuthenticationStatus(): AuthenticationStatus[] {
        return PermissionConfigs.VISIT_PERMISSIONS.get(Pages.department)!;
    }

    allowDetail(instance: Department, me: Profile): boolean {
        return false;
    }

}