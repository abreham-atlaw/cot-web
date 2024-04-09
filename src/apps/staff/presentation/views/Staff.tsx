import React, { useState } from 'react';
import styles from './Staff.module.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Navbar from '@/common/components/views/Navbar';
import RegisterStaff from '../components/RegisterStaff';
import { initialStaffs } from '@/FakeTypes/list';
import { Role } from '@/FakeTypes/User';

const StaffView = () => {
  
  const [staffs, setStaffs] = useState(initialStaffs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUserClick = (staffId:string) => {
    navigate(`/staffs/${staffId}`);
  };

  return (
    <>
      <Navbar />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        className='modal-content custom-property'
        overlayClassName='modal-overlay'
      >
        <RegisterStaff onClose={handleModalClose} />
      </Modal>

      <div className={styles.table_box}>
        <div className={styles.all_bar}>
          <h3>All</h3>
          <button onClick={handleModalOpen}>+</button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr key="employee-top">
              <th>Employee Id</th>
              <th>Employee Email</th>
              <th>Department</th>
              <th>Roles</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {staffs.map((staff) => (
              <tr key={staff.id}>
                <td>{staff.id}</td>
                <td>{staff.email}</td>
                <td>{staff.department?.name}</td>
                <td>{Role[staff.role]}</td>
                <td onClick={() => handleUserClick(staff.id)}>Detail</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StaffView;
