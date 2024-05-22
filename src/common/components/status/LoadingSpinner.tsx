import { ColorRing } from "react-loader-spinner"



export const LoadingSpinner = () => {
    return (<ColorRing
        visible={true}
        height="100%"
        width="100%"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper w-full h-full"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />)
}