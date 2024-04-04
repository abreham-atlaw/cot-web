import React, { useState } from "react";
import styles from "./Asset.module.css";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { initialAssets } from "@/FakeTypes/list";
import Navbar from "@/common/components/views/Navbar";
import RegisterProperty from "../components/RegisterProperty";

interface Asset {
  id: string;
  type: string;
  active: boolean;
  addDateTime: Date;
  // Add other relevant properties as needed
}

const AssetView: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <Navbar />
      <ReactModal
        isOpen={isModalOpen}
        className="modal-content custom-property"
        overlayClassName="modal-overlay"
      >
        <RegisterProperty handleModal={handleModal} />
      </ReactModal>
      <div className={styles.table_box}>
        <div className={styles.all_bar} onClick={handleModal}>
          <h3>All</h3>
          <button>+</button>
        </div>
        <table className={styles.table}>
          <thead>
            <th>Asset Id</th>
            {/* <th>Asset Name</th> */}
            <th>Type</th>
            <th>Status</th>
            <th>Date</th>
            <th></th>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.type}</td>
                <td>
                  {!asset.active ? "In Use" : "Available"}
                </td>
                <td>{asset.addDateTime.toLocaleDateString()}</td>
                <td onClick={() => navigate(`/assets/${asset.id}`)}>detail</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetView;
