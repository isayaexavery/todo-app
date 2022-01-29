import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from './CreateArea';



function App() {

const [notes, setNote] = useState([]);

  function addNote(newNote){

    if(newNote.title.length === 0 ){
      alert('Title Can not be empty');
      return;
    }

     setNote(prevNote => {
       return [...prevNote, newNote];
     });

  }

  function deleteNote(id){
    setNote(prevNote => {
     return  prevNote.filter((noteItem, index) => {
              // localStorage.removeItem('todo-items');
          return index !== id;
      });
    });

  }

  function showNotes(){

    const getNotes = JSON.parse(
      localStorage.getItem('todo-items')
    );

    if (getNotes){
      setNote(getNotes);
    }

  }

useEffect(() => {

}, []);


  return (
    <div>
      <Header />
      <CreateArea
        onAdd={addNote}
       />
        {notes.map( (noteItem, index )=>{
         return <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />;

     })}
      <Footer />
    </div>
  );
}

export default App;
