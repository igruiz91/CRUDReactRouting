import React from 'react';

const Error = ({ mensaje }) => {
    return (
        <p className="alert alert-danger p3 my-5 text-center text-uppercase font-weigth-cold">{mensaje}</p>
    );
}

export default Error;