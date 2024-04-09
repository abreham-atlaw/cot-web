import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { Asset } from "@/FakeTypes/Asset";
import { Department } from "@/FakeTypes/Department";
import { User, Role } from "@/FakeTypes/User";
import { initialAssets, initialStaffs, initalDepartments } from "@/FakeTypes/list";
import AssignAsset from "../components/AssignAsset";
import UnallocateAsset from "../components/UnallcateAsset";
import EditAsset from "../components/EditAsset";
import DeleteAsset from "../components/DeleteAsset";


function AssetDetail() {
	const { assetId } = useParams();
	const [asset, setAsset] = useState<Asset | null>(null);  // Type annotations
	const [staff, setStaff] = useState<User | null>(null);
	const [department, setDepartment] = useState<Department | null>(null);
	const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
	const [isUnallocateModalOpen, setIsUnallocateModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
    const fetchAsset = async ()=> {
		try {
			const filterasset = initialAssets.filter((asset:Asset) => asset.id === assetId);
			setAsset((s) => s = filterasset[0]);
		} catch (error) {
			console.error(error)
		}
	}
		
   fetchAsset()

	}, [assetId])
	useEffect(() => {
		const fetchDepartment = async ()=>{
			try {
				const filterdepartment: Department[] = initalDepartments.filter((dep) => dep.id === staff?.department?.id);
		setDepartment((s) => s = filterdepartment[0])
			} catch (error) {
				console.log(error)
			}
		}
		const fetchStaff = async ()=>{
			const filterstaff = initialStaffs.filter((staff) => staff.id === asset?.owner?.id);

			setStaff((s) => s = filterstaff[0]);
		}
		fetchDepartment()
		fetchStaff()
		
		
	}, [asset, department])
	// console.log(asset?.ownerId)
	const handleAssign = () => {
		setIsAssignModalOpen(true);
	  };
	
	  const handleUnallocate = () => {
		setIsUnallocateModalOpen(true);
	  };
	
	  const handleEdit = () => {
		setIsEditModalOpen(true);
	  };
	
	  const handleDelete = () => {
		setIsDeleteModalOpen(true);
	  };
	
	  const handleModalClose = () => {
		setIsAssignModalOpen(false);
		setIsUnallocateModalOpen(false);
		setIsEditModalOpen(false);
		setIsDeleteModalOpen(false);
	  };
	

	return (
		<div className='property-detail'>



			<div className='body'>
				<section className='one'>
					<div className='col'>
						<h4> {asset?.id} </h4>

						<p> Name: {asset?.title} </p>

						<p> Type: {asset?.type}</p>

						<p> Status: {asset?.active ? "Avaliable" : "In Use"} </p>

						<p> Created Time: {asset?.addDateTime.toLocaleDateString()} </p>

					</div>
					<div>
						{asset?.active &&
							<button
								style={{ color: "black" }}
								onClick={() => handleAssign()}
							>
								Assign
							</button>

						}
					{!asset?.active&&	<button
							style={{
								color: "black",
								backgroundColor: "white",

							}}
							onClick={()=>handleUnallocate()}
						>
							Unallocate
						</button>
}
						<button
							onClick={() => handleEdit()}
							style={{ backgroundColor: "#011b33", color: "white" }}
						>
							Edit
						</button>

						<button
							style={{ color: "black" }}
							onClick={() => handleDelete()}
						>
							Delete
						</button>
					</div>




					<div>
						<Modal
							isOpen={isAssignModalOpen}
							onRequestClose={() => handleModalClose()}
							className='modal-content custom-property'
							overlayClassName='modal-overlay'
						>
							<AssignAsset asset={asset!} handleModal={handleModalClose} />
						</Modal>
					</div>

					<div>
						<Modal
							isOpen={isUnallocateModalOpen}
							onRequestClose={() => handleUnallocate()}
							className='modal-content custom-property'
							overlayClassName='modal-overlay'
						>
							<UnallocateAsset staff={staff!} asset={asset!} handleModal={handleModalClose} />
						</Modal>
					</div>



					<div >
						<Modal
							isOpen={isDeleteModalOpen}
							onRequestClose={() => handleModalClose()}
							className='modal-content custom-property'
							overlayClassName='modal-overlay'
						>
							<DeleteAsset onCloseModal={handleModalClose} asset={asset!}/>
						</Modal>
					</div>



					<div >
						<Modal
							isOpen={isEditModalOpen}
							onRequestClose={() => handleModalClose()}
							className='modal-content custom-property'
							overlayClassName='modal-overlay'
						>
							<EditAsset asset={asset!} />

						</Modal>
					</div>

				</section>
				{!asset?.active &&
					<section className='two'>
						<div className='col'>
							<h4> {staff?.firstName} {staff?.lastName}  </h4>

							<p> Employee ID: {staff?.id} </p>

							<p> Departement: {staff?.department?.name} </p>

							<p> Role: {Role[staff?.role!]} </p>
							<p> Assign Date: {asset?.assignDateTime?.toLocaleDateString()} </p>
							<p>Assign Reason: {asset?.assignReason}</p>

							<button
								onClick={() => { navigate(`/staffs/${staff?.id}`) }}
							>Detail</button>
						</div>

					</section>
				}
			</div>
		</div>

	);
}

export default AssetDetail;
