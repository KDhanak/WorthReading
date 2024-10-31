import React, { useState } from 'react';
import Helmet from 'react-helmet';

const Loading: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
};

export default Loading;
