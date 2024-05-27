import { ColorRing } from "react-loader-spinner"



export const LoadingSpinner = () => {
    return (<ColorRing
        visible={true}
        height="100%"
        width="100%"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper w-full h-full"
        colors={['#333333', '#666666', '#FF5733', '#CCCCCC', '#F0F0F0']}
        />)
}