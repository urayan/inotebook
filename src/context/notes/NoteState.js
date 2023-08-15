import { useState} from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const host = "http://localhost:5000"

    const [notes, setNotes] = useState([])

    //Fetching all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnote`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
            });
            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    //Adding a note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag })
            })
            const json = await response.json();
            setNotes(notes.concat(json));

        } catch (error) {
            console.error('Error adding note:', error);
        }
    }


    //Editing a note
    const editNote = async (id, title, description, tag) => {
        try {
            await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                },
                body: JSON.stringify({ title, description, tag })
            });
            getNotes()

        } catch (error) {
            console.error('Error adding note:', error);
        }
    }

    //Deleting a note
    const deleteNote = async (id) => {
        try {
            await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                }
            });
            getNotes()
        } catch (error) {
            console.error('Error Deleting note:', error);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;