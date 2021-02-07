import React from 'react';

const FilterForm = ({ filterBy, action }) => {
    return (
        <div>
            filter shown with: <input value={filterBy} onChange={action} />
        </div>
    )
}

export default FilterForm;