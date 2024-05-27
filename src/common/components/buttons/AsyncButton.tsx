import React, { ReactNode } from 'react';
import BaseButton from './BaseButton';
import { AsyncState, AsyncStatus } from '@/common/state/asyncState';
import { LoadingSpinner } from '../status/LoadingSpinner';

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
                    <div className="mx-auto w-24 h-10">
                        <div className="m-auto h-full">
                            <LoadingSpinner/>
                        </div>
                    </div>
                </div>
            ) : (
                children
            )}
        </BaseButton>
    );
};

export default AsyncButton;
