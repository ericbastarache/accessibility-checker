import React, { Fragment } from 'react';
import Navigation from '@/components/common/navigation';

const DashboardLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
    return (
        <div className="flex flex-row h-full min-w-full">
            <Navigation />
            <div className="flex-col flex-1">
                <div className="flex flex-row w-full border-l border-b border-solid border-b-gray-700 border-l-gray-800 p-16 mb-10 bg-gray-900 text-white">
                    Top Bar
                </div>
                <div className="flex flex-col w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout;