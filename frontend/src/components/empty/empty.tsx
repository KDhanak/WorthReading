import React from 'react';

interface EmptyProps {
    message: string;
}

const Empty: React.FC<EmptyProps> = ({message}) => {
    return (
        <div className='fixed top-1/2 left-1/2 items-center justify-center h-full'>
            <p>{message}</p>
        </div>
    );
};

export default Empty;
