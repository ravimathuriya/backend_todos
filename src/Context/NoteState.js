import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const NotesIn = []

  const [Notes, setNotes] = useState(NotesIn);

  //get all notes
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        'authtoken': localStorage.getItem("token"),
      }

    });
    const json = await response.json();
    setNotes(json)
  }


  //add a note

  const addNote = async (title, description) => {

    //api call

    const response = await fetch(`${host}/api/notes/createnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        'authtoken': localStorage.getItem("token"),},

      body: JSON.stringify({ title, description }),
    });


    const json = await response.json();
    console.log(json);

    const note = {
      id:"",
      title: title,
      description: description
    }

    setNotes(Notes.concat(note))

  }

  // delete a note

  const deleteNote = async (id) => {

    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        'authtoken': localStorage.getItem("token"),}

    });

    const json = await response.json();
    console.log(json);

    // console.log("deleting the note" + id)
    const newNote = Notes.filter((note) => { return note._id !== id })
    setNotes(newNote)

  }

  // edit a note

  const editNote = async (id, title, description) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        'authtoken': localStorage.getItem("token"), },

      body: JSON.stringify({ title, description }),
    });


    const json = await response.json();
    console.log(json);

    let updateNote = JSON.parse(JSON.stringify(Notes));

    //logic to update the note
    for (let index = 0; index < updateNote.length; index++) {
      const element = updateNote[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        break;
      }
    }

    setNotes(updateNote);

  }

  return (
    <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>)
}

export default NoteState;