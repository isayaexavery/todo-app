import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from './CreateArea';



function App() {

const [notes, setNote] = useState([]);

  function addNote(newNote){

    if(newNote.title.length == 0 ){
      alert('Title Can not be empty');
      return;
    }

     setNote(prevNote => {
       return [...prevNote, newNote];
     });


     saveToLocalStorage(newNote)
  }

  const saveToLocalStorage = (newNote) => {
     const newTodos = [...notes, newNote];
     console.log(newNote.title, newNote.content);
		// localStorage.setItem(newNote.title, JSON.stringify(newTodos));
     localStorage.setItem(newNote.title, newNote.content);
	};


  function deleteNote(id){
    setNote(prevNote => {
     return  prevNote.filter((noteItem, index) => {
              // localStorage.removeItem('todo-items');
          return index !== id;
      });
    });

  }

  function showNotes(){
    let localValues = [],
                keys= Object.keys(localStorage),
                   i = keys.length;

              while (i--) {
                  localValues.push(localStorage.getItem(keys[i]));
              }

        console.log(localValues);

    // const getNotes = JSON.parse(
    //   localStorage.getItem('todo-items')
    // );
    //
    // if (getNotes){
    //   setNote(getNotes);
    // }

  }

useEffect(() => {
  showNotes();
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
