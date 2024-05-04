import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import Department from "../../domain/models/department";
import DepartmentRepository from "../../infrastructure/repositories/departmentRepository";
import EditDepartmentView from "./EditDepartmentView";
import ListModelView from "./ListModelView";




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
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Asset Requests"
    }

}