import React, {  } from "react";

import Asset from "../../domain/models/asset";
import { useNavigate } from "react-router-dom";
import { Role } from "@/apps/auth/domain/models/profile";

interface AssetDetailProps{
	asset: Asset
}
function AssetDetail(props:AssetDetailProps) {
    const navigate = useNavigate()
	const asset = props.asset // Type annotations

	return (
		<div className=''>
			<div className=''>
				<section className=''>
					<ul>
						<li className="flex my-2">
							<span className="font-bold text-lg mr-2">Asset Name:</span>
							<span className="">{asset.name}</span></li>
						<li className="flex my-2">
							<span className="font-bold text-lg mr-2">Asset Id:</span>
							<span className="">{asset.id?.split("-"[0])}</span></li>
						<li className="flex my-2">
							<span className="font-bold text-lg mr-2">Category: </span>
							<span className="">{asset.category?.name}</span></li>
						<li className="flex my-2">
							<span className="font-bold text-lg mr-2">Status: </span>
							<span className="">In use</span></li>
						<li className="flex my-2">
							<span className="font-bold text-lg mr-2">Created Time:</span>
							<span className=""></span></li>
					</ul>
		
				</section>
				{asset.currentOwner &&
					<section className=''>
						<h3>Current Owner</h3>
						<ul>
  <li className="flex my-2">
    <span className="font-bold text-lg mr-2">Employee Name:</span>
    <span>{asset.currentOwner.name}</span>
  </li>
  <li className="flex  my-2">
    <span className="font-bold text-lg mr-2">Employee Id:</span>
    <span>{asset.currentOwner.id?.split('-')[0]}</span>
  </li>
  <li className="flex  my-2">
    <span className="font-bold text-lg mr-2">Email:</span>
    <span>{asset.currentOwner.email}</span>
  </li>
  <li className="flex  my-2">
    <span className="font-bold text-lg mr-2">Role:</span>
    <span>{(Role[asset.currentOwner.role as number]).toUpperCase()}</span>
  </li>
</ul>

					</section>
				}
			</div>
		</div>

	);
}

export default AssetDetail;
