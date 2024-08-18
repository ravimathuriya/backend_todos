import React, { useContext, useState } from 'react'
import NoteContext from '../Context/NoteContext'


const Addnote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const{alertmode} = props;

  //note default value
  const [note, setNote] = useState({ title: "", description: "" });

  //note value changes when typing area will be filled
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  //add note function
  const clickedtoadd = (e) => {
      e.preventDefault(); //for not refreshing everytime
       addNote(note.title, note.description)
      //  window.location.reload(false);
      setNote({ title: "", description: "" })
      alertmode("Note added successfully", "success");
  }


  return (
    <div className="container my-3">
      <h2>Add A Note</h2>
      <p className="my-2" style={{color:"red"}}>*Minimum 5 characters allowed</p>
      <form>
        <div className="form-group my-2">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control my-2" id="title" name="title" onChange={onchange} value={note.title} aria-describedby="titleHelp" placeholder="Enter title of note" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="description">Description</label>
          <input type="description" className="form-control my-2" id="description" name="description" onChange={onchange} value={note.description} placeholder="Enter description" />
        </div>
        <button disabled={note.title.length <5 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={clickedtoadd}>Add Note</button>
      </form>

    </div>
  )
}

export default Addnote
