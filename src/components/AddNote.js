import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import alertContext from '../context/notes/AlertContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const context1 = useContext(alertContext);
    const { showAlert } = context1;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        showAlert("Note added successfully", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form className='container mx-30 my-3'>
                <h2>Add The Details To Add A Note</h2>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} minLength={3} value={note.title} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} value={note.description} required />
                </div>
                <div className="mb-3">
                    <label className="form-check-label" htmlFor="exampleCheck1">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} required />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </>
    )
}

export default AddNote
