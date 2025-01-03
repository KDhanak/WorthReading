import React from 'react';

interface EmptyProps {
    message: string;
}

const Empty: React.FC<EmptyProps> = ({message}) => {
    return (
        <div className='relative w-screen h-screen'>
            <p className='items-center justify-center'>{message}</p>
        </div>
    );
};

export default Empty;
