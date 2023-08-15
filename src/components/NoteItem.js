import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import alertContext from '../context/notes/AlertContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context
    
    const context1 = useContext(alertContext);
    const { showAlert } = context1;

    const { note, updateNote } = props;

    return (
        <div className='col-md-3 my-3'>
            <div className="card" style={{ width: "18rem" }}>
            <span className="position-absolute top-0 translate-middle badge bg-danger" style={{ left: '90%', zIndex: '1' }}>
                {note.tag.slice(0, 6)+".."}
            </span>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); showAlert("Note deleted successfully", "success") }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
