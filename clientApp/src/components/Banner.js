import React from 'react'

const Banner = ({ statusCode }) => {
    const successCreate = 'Person successfully added.';
    const successUpdate = 'Person successfully updated.';
    const successDelete = 'Person successfully deleted.';
    const errorGeneric = 'Error processing request.';
    const errorInput = 'Name must be at least 3 characters and number at least 8 characters.'
    
    if ([200, 201, 204].includes(statusCode)) {
        return (
            <div className='banner' style={{ backgroundColor: 'green' }}>
                { statusCode === 201
                    ? successCreate
                    : statusCode === 200
                        ? successUpdate
                        : successDelete }
            </div>
        )
    } else if (statusCode === 400) {
        return (
            <div className='banner' style={{ backgroundColor: 'red' }}>
                {errorInput}
            </div>
        )
    };

    if (statusCode > 400 && statusCode <= 599) {
        return (
            <div className='banner' style={{ backgroundColor: 'red' }}>
                {errorGeneric}
            </div>
        )
    };
}

export default Banner;