import React, { useState } from "react"; // Import useState
import RoutingUtils from "@/common/utils/routing";

interface ListModelRowProps {
  instanceValues: string[];
  detailLink: string;
  allowDetail: boolean;
  allowEdit: boolean;
  allowDelete: boolean;
  columns: string[];
  nameColumnIdx: number;
  onModalClicked: () => void;
  onToggleDeleteMode: () => void;
}

const ListModelRowComponent = (props: ListModelRowProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Add state for collapse

  const actions = [
    {
      onClick: () => RoutingUtils.redirect(props.detailLink),
      className: "fa-solid fa-file-lines hover:bg-white",
      isVisible: props.allowDetail,
    },
    {
      onClick: () => props.onModalClicked(),
      className: "fa-solid fa-pen hover:bg-white",
      isVisible: props.allowEdit,
    },
    {
      onClick: () => props.onToggleDeleteMode(),
      className: "fa-solid fa-trash hover:bg-danger hover:text-light",
      isVisible: props.allowDelete,
    },
  ];

  const handleRowClick = () => {
    setIsCollapsed((prev) => !prev); // Toggle collapse state
  };

  return (
    <>
        <tr className="hover:bg-light hidden lg:table-row" onClick={handleRowClick}> {/* Add onClick handler */}
      
            {props.instanceValues.map((value) => (
            <td
            className={`px-5 w-[${100 / props.instanceValues.length}%] text-ellipsis overflow-clip px-4 text-start py-2 truncate overflow-hidden whitespace-nowrap`}
            key={value}
            >
            {value}
            </td>
        ))}
        <td className="flex py-2">
            {actions.map(
            (action) =>
                action.isVisible && (
                <button key={action.className} onClick={action.onClick} className="mr-5">
                    <i className={`${action.className} p-5 border border-grey rounded-full `}></i>
                </button>
                )
            )}
        </td>
        
        
        </tr>
        <tr className="table-row lg:hidden hover:bg-light" onClick={handleRowClick}>
            <td className={`p-5 rounded rounded-2xl border ${(isCollapsed)?'bg-light':''}`}>
            <div className="w-full hover:bg-light">
                <div className="text-xl font-bold">
                    {props.instanceValues[props.nameColumnIdx]}
                </div>
                
                {
                    isCollapsed?
                    <div >
                        {props.instanceValues.map((value, idx) => (
                            <div
                            className="my-5"
                            key={value}
                            >
                            <span className="font-bold mr-3">{props.columns[idx]}:</span>{value}
                            </div>
                        ))}

                        <div className="flex">

                            {actions.map(
                            (action) =>
                                    action.isVisible && (
                                    <button key={action.className} onClick={action.onClick} className="mr-5">
                                        <i className={`${action.className} p-5 border border-grey rounded-full `}></i>
                                    </button>
                                    )
                            )}
                        </div>

                        

                    </div>:
                    <></>
                }
               

                
            </div>
        
            


        </td>
        </tr>
    
    </>
    
  );
};

export default ListModelRowComponent;
