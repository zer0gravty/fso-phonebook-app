import React from 'react'

const Banner = ({ statusCode }) => {
    const success = 'Person successfully added.';
    const error = 'Error processing request.';
    const deletionError = 'Person has already been removed. Refreshing data.';
    
    if (statusCode >= 200 && statusCode <= 299) {
        return (
            <div className='banner' style={{ backgroundColor: 'green' }}>
                {success}
            </div>
    
        )
    };

    if (statusCode === 404) {
        return (
            <div className='banner' style={{ backgroundColor: 'red' }}>
                {deletionError}
            </div>
        )
    };

    if (statusCode >= 300 && statusCode <= 599) {
        return (
            <div className='banner' style={{ backgroundColor: 'red' }}>
                {error}
            </div>
        )
    };
}

export default Banner;