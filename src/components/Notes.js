import React, { useContext, useEffect, useState, useRef } from 'react'
import alertContext from '../context/notes/AlertContext';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {

    let navigate = useNavigate()

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context

    const [note, setNotes] = useState({ eid: "", etitle: "", edescription: "", etag: "" })

    const context1 = useContext(alertContext);
    const { showAlert } = context1;

    const ref = useRef(null)
    const refClose = useRef(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNotes({ eid: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleUpdateNote = (e) => {
        editNote(note.eid, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        showAlert("Note updated successfully", "success")
    }

    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <div className="container">
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form className='container mx-30'>
                                    <div className="mb-3">
                                        <label htmlFor="etitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" onChange={onChange} minLength={3} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="form-label" >Tag</label>
                                        <input type="text" className="form-control" id="etag" value={note.etag} name="etag" onChange={onChange} required />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                                <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className='row my-3'>
                        {notes.length === 0 && 'No Notes to display'}
                        {notes.map((note) => {
                            return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
