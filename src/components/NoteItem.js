import React, { useContext } from 'react'
import NoteContext from "../Context/NoteContext"


const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { newnote, updateNote, alertmode } = props;



    const deletingnote = (e) => {
        deleteNote(newnote._id)
        alertmode("Note deleted", "success");
     
    }

    return (
        <div className="col-sm-4 my-2">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{newnote.title}</h5>
                    <p className="card-text">{newnote.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={deletingnote}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(newnote)}></i>
                    
                </div>
            </div>
        </div>

    )
}

export default NoteItem
