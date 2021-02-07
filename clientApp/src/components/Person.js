import React from 'react';

const Person = ( {name, number, deletePerson} ) => {
    return (   
        <p>{name} {number} <button onClick={deletePerson}>Delete</button></p>
    )
}

export default Person;