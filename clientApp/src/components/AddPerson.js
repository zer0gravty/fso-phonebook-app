import React from 'react';

const AddPersonForm = ( { submit, newName, newNumber, setNewName, setNewNumber } ) => {
    return (
        <div>
            <h3>add a new</h3>
            <form onSubmit={submit}>
                <div>
                    name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default AddPersonForm;