import React, { ReactNode } from 'react';
import BaseButton from './BaseButton';
import { AsyncState, AsyncStatus } from '@/common/state/asyncState';

interface AsyncButtonProps {
    state: AsyncState;
    bg?: string;
    loadingColor?: string;
    children?: ReactNode;
   
}

const AsyncButton: React.FC<AsyncButtonProps> = ({ state, bg, children }) => {
    const isLoading = () => {
        return state.status === AsyncStatus.loading;
    };

    return (
        <BaseButton bg={bg}>
            {isLoading() ? (
                <div className="flex">
                    <div className="m-auto">
                        {/* <LoadingSpinner/> */}
                        Loading...
                    </div>
                </div>
            ) : (
                children
            )}
        </BaseButton>
    );
};

export default AsyncButton;
