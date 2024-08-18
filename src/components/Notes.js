import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../Context/NoteContext"
import NoteItem from './NoteItem';
import Addnote from './Addnote'
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(NoteContext);
    const { Notes, getNote, editNote } = context;
    const { alertmode } = props;
    const ref = useRef(null);
    const refclose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "" });

    useEffect(() => {
        if(localStorage.getItem('token')){
        getNote();}

        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description });

    }

    //note value changes when typing area will be filled
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    //add note function
    const clickedtoadd = (e) => {
        editNote(note.id, note.etitle, note.edescription)
        refclose.current.click();
        alertmode("Note updated successfully", "success");

    }


    return (
        <>
            <Addnote alertmode={alertmode} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <p className='container my-2' style={{ color: "red" }}>*Minimum 5 characters allowed</p>
                        <form>
                            <div className="form-group my-2 mx-2">
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control my-2" id="etitle" name="etitle" value={note.etitle} onChange={onchange} aria-describedby="titleHelp" placeholder="Enter title of note" />
                            </div>
                            <div className="form-group my-2 mx-2">
                                <label htmlFor="description">Description</label>
                                <input type="description" className="form-control my-2" id="edescription" name="edescription" value={note.edescription} onChange={onchange} placeholder="Enter description" />
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={clickedtoadd} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row" >
                    <h2 >Your Notes</h2>
                    <div className="container mx-1" >
                        {Notes.length === 0 && "No Notes available to display"} </div>
                    {Notes.map((mynote, index) => {
                        return <NoteItem key={`${mynote._id}+${index}`} newnote={mynote} updateNote={updateNote} alertmode={alertmode} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
