import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link, useParams } from 'react-router-dom';
import { Role, User } from '@/FakeTypes/User';
import { Asset } from '@/FakeTypes/Asset';
import { AssetMaintenanceRequest } from '@/FakeTypes/AssetMaintenanceRequest';
import { AssetRequest } from '@/FakeTypes/AssetRequest';
import { initialStaffs, initialAssets, initialAssetRequest, initialMaintenanceRequest } from '@/FakeTypes/list';
import EditStaff from '../components/EditStaff';
import DeleteStaff from '../components/DeleteStaff';

const StaffDetail = () => {
    const { staffId } = useParams();

    const [staff, setStaff] = useState<User>();
    const [assets, setAssets] = useState<Asset[]>([]);
    const [maintenanceRequests, setMaintenanceRequests] = useState<AssetMaintenanceRequest[]>([]);
    const [assetRequests, setAssetRequests] = useState<AssetRequest[]>([]);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentRequestType, setCurrentRequestType] = useState(0); // 0 for AssetRequest, 1 for MaintenanceRequest

    useEffect(() => {
        // Fetch data based on staffId
        const fetchData = async () => {
            try {
                const staff = initialStaffs.find((user) => user.id === staffId);
                const assets = initialAssets.filter((asset) => asset.owner?.id === staffId);
                const requests = initialAssetRequest.filter((request) => request.user.id === staffId);
                const maintenanceRequests = initialMaintenanceRequest.filter((request) => request.user.id === staffId);

                setStaff(staff);
                setAssets(assets);
                setAssetRequests(requests);
                setMaintenanceRequests(maintenanceRequests);
            } catch (error) {
                // Handle any errors during data fetching
                console.error(error);
            }
        };

        fetchData();
    }, [staffId]);

    const handleEditClicked = () => {
        setIsEditModalOpen(true);
    };

    const handleDeleteClicked = () => {
        setIsDeleteModalOpen(true);
    };

    const handleRequestTypeClicked = (requestType: 0 | 1) => {
        setCurrentRequestType(requestType);
    };
    const renderRequestTable = () => {
        if (currentRequestType === 0) {
            return (
                <table>
                    <thead>
                        <tr key="employee-request">
                            <th>Request ID</th>
                            <th>Asset ID</th>
                            <th>Created Date</th>
                            <th>Resolved Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {assetRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.asset.id}</td>
                                <td>{request.createDatetime.toLocaleDateString()}</td>
                                <td>{request.resolveDatetime === undefined ? "-" : request.resolveDatetime.toLocaleDateString()}</td>
                                <td>Detail</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Asset ID</th>
                            <th>Created Date</th>
                            <th>Approved</th>
                            <th>Resolved Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenanceRequests.map((request) => (
                            <tr key={request.id}>
                                <td>{request.id}</td>
                                <td>{request.asset.title}</td>
                                <td>{request.createDatetime.toLocaleDateString()}</td>
                                <td>{request.approved === false && request.rejected === false ? "pending" : ""}</td>
                                <td>{request.resolveDatetime === undefined ? "-" : request.resolveDatetime.toLocaleDateString()}</td>
                                <td>Detail</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    };

    return (
        <div className='staff-detail'>
            <div className='body'>
                <section className='one'>
                    <div className='col'>
                        <h4> {staff?.id} </h4>
                        <p> {staff?.firstName} </p>
                        <p> {staff?.lastName} </p>
                        <p> {staff?.email} </p>
                        <p>{Role[staff?.role!]} </p>
                    </div>
                    <div>
                        <div>
                            <button onClick={handleEditClicked} style={{ backgroundColor: '#011b33', color: 'white' }}>
                                Edit
                            </button>
                            <button onClick={handleDeleteClicked} style={{ color: 'black' }}>
                                Delete
                            </button>
                        </div>
                    </div>

                    {/* Edit Modal */}
                    <Modal
                        isOpen={isEditModalOpen}
                        onRequestClose={() => setIsEditModalOpen(false)}
                        className='modal-content custom-property'
                        overlayClassName='modal-overlay'
                    >
                        <EditStaff onCloseModal={() => setIsEditModalOpen(false)} staff={staff!} />
                    </Modal>


                    {/* Delete Modal */}
                    <Modal
                        isOpen={isDeleteModalOpen}
                        onRequestClose={() => setIsDeleteModalOpen(false)}
                        className='modal-content custom-property'
                        overlayClassName='modal-overlay'
                    >
                        <DeleteStaff staff={staff!} onCloseModal={() => setIsDeleteModalOpen(false)} />
                    </Modal>

                </section>

                <section className='two'>
                    <h3> Owned Asset </h3>
                    <div className="list-box">
                        <table>
                            <thead>
                                <tr key={"employee asset"}>
                                    <th>Asset ID</th>
                                    <th>Asset Type</th>
                                    <th>Status</th>
                                    <th>Created Date</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset) => (
                                    <tr key={asset.id}>
                                        <td>{asset.id}</td>
                                        <td>{asset.type}</td>
                                        <td>{asset.active ? "In Use" : "Avaliable"}</td>
                                        <td>{asset.addDateTime.toLocaleDateString()}</td>
                                        <td>Detail</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </section>
                <section className='three'>
                    <h3>
                        <span className={`${currentRequestType === 0 ? "selected-request" : "unselected-request"}`} onClick={() => handleRequestTypeClicked(0)}>
                            AssetRequest
                        </span>
                        <span className={`${currentRequestType === 1 ? "selected-request" : "unselected-request"}`} onClick={() => handleRequestTypeClicked(1)}>
                            Maintenance Request
                        </span>
                    </h3>
                    <div className="list-box">
                        {renderRequestTable()}
                    </div>
                </section>
            </div>
        </div>

    );
}

export default StaffDetail;
