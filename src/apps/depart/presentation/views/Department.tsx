// import { useState } from "react";
import Navbar from "@/common/components/views/Navbar";
import styles from "./Staff.module.css";
// import { initalDepartments } from "../../Domain/list";
// import { Department } from "../../Domain/Department/Department";

function DepartmentPage() {
	//  const [departments,setDepartment]=useState<Department[]>(initalDepartments)
	return (
		<div>
			<Navbar />
			<div className={styles.table_box}>
				<div className={styles.all_bar}>
					<h3>All</h3>
					<button>+</button>
				</div>
				<table className={styles.table}>
					<thead>
						<th>Department Id</th>
						<th>Department Type</th>
						<th>No of Staff </th>
						<th>Manager</th>
						<th></th>
					</thead>
					<tbody>
						{/* {departments.map((department)=>(
                                    <tr>
                                    <td>{department.id}</td>
                                    <td>
                                       {department.name}
                                    </td>
                                    <td>{department.staff?.length}</td>
                                    <td>{department.manager == undefined? "-": department.manager.id}</td>
            
                                    <td></td>
                                </tr> 
                    ))} */}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default DepartmentPage;
