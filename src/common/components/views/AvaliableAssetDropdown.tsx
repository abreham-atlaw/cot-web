import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { initalAssets } from "../../Domain/list";
import { Asset } from "../../Domain/Asset/Asset";
import style from "./Avaliable.module.css";
import { useState } from "react";
interface Props {
    isAssetDrop: boolean,
    toggleDropdown: () => void,
    handleInputChange:(value:Asset)=>void
}
function AvaliableAssetDropdown(props: Props) {
    const AvailableAsset: Asset[] = initalAssets.filter((asset) => asset.active === true)
    const [selectedOption, setOption] = useState<Asset>()
    const handleSelectedOption = (option: Asset) => {
        props.handleInputChange(option)
        setOption((s) => s = option)
        
    }
    return (
        <div className={style.main_box} onClick={(e) => e.stopPropagation()}>
            <div className={style.input_box}>
                <input
                    style={{
                        cursor: "pointer"
                    }}
                    name="roles"
                    readOnly
                    type='text'
                    placeholder='Select Asset'
                    value={selectedOption !== undefined ? selectedOption.id : ""}
                    onClick={props.toggleDropdown}
                />
                <IoIosArrowDown />
            </div>
            {props.isAssetDrop && <ul className="">
                {AvailableAsset.map((option) => (
                    <li key={option.id} onClick={
                        () => {
                            handleSelectedOption(option)
                            props.toggleDropdown()
                           
                        }

                    }>{option.id}</li>
                ))}
            </ul>
            }
        </div>
    )
}
export default AvaliableAssetDropdown