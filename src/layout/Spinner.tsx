import React from 'react';
import { HashLoader } from 'react-spinners';
import './loader.scss';

const Spinner: React.FC = () => {
    return (
        <div className="loader-wrapper">
            <HashLoader color="#0c68ff" />
        </div>
    );
};

export default Spinner;
