import React from 'react';

interface EmptyProps {
    message: string;
}

const Empty: React.FC<EmptyProps> = ({message}) => {
    return (
        <div>
            <p>{message}</p>
        </div>
    );
};

export default Empty;
