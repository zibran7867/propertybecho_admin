import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './mainLayout.scss';

interface IMainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
    return (
        <div className="main-container">
            <Sidebar />
            <div className='rightSide-component bg-bgColor'>
                <Header />
                <main className='main-content'>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
