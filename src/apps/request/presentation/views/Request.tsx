/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Navbar from "@/common/components/views/Navbar";
import styles from './Staff.module.css'
import { initalAssetRequest, initalRequest } from "../domain/list";
import Modal from "react-modal";
import CreateRequest from "./CreateRequest";
import { useNavigate } from "react-router-dom";
export default function Requests(){
 
      
      // Sample Asset Maintenance Request object
    const [requests,setRequest] = useState(initalAssetRequest);
    const [isModalOpen,setModalOpen] = useState(false)
    const navigate = useNavigate()
    const handleModal=()=>{
        setModalOpen(false)
    }
    return <div>
            <Navbar/>
            <Modal
            isOpen={isModalOpen}
            className='modal-content custom-property'
    overlayClassName='modal-overlay'
            >
                <CreateRequest handleModal={handleModal}/>
            </Modal>
            <div className={styles.table_box}>
            <div className={styles.all_bar}>
                <h3>All</h3>
                <button onClick={()=>setModalOpen(true)}>+</button>
            </div>
            <table className={styles.table}>
            <thead>
                <th>Request Id</th>
                <th>Asset Id</th>
                <th>Employee ID</th>
                <th>Created Date</th>
                <th>Resolved Date</th>
            
                <th></th>
            </thead>
            <tbody>
                {requests.map((request)=>(
                <tr>
                    <td>{request.id}</td>
                    <td>{request.asset.id}</td>
                    <td>{request.user.id}</td>
                    <td>{request.createDatetime.toLocaleDateString()}</td>
                    <td>{request.resolveDatetime == undefined ? "-" : request.resolveDatetime.toLocaleDateString()}</td>
                    <td onClick={()=>navigate(`/requests/${request.id}`)}>Detail</td>
                </tr>  
                ))}

            </tbody>
        </table>
    </div>
    </div>
}