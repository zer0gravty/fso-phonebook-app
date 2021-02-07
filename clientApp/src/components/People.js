import React from 'react';
import Person from './Person';

const People = ({ phonebook, deletePerson }) => {
    return (
        <div>
            <h2>Numbers</h2>
            <div>
                { phonebook.map( ({ id, name, number }) => <Person key={id} name={name} number={number} deletePerson={() => deletePerson(id)}/> ) }
            </div>
        </div>
    )
}

export default People;