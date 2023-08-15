import React, { useContext } from 'react';
import alertContext from '../context/notes/AlertContext';

const Alert = () => {

    const context = useContext(alertContext);
    const { alert } = context;

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    if (alert.msg === "" || alert.type === "") {
        return null;
    }

    return (
        <>
            <div className='container my-3'>
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{capitalize(alert.type)}</strong>: {alert.msg}
                </div>
            </div>
        </>
    )
}

export default Alert;