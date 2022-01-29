import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from './CreateArea';



function App() {

const [notes, setNote] = useState([]);
const addNote = async (newNote) => {

    if(newNote.title.length == 0 ){
      alert('Title Can not be empty');
      return;
    }

     setNote(prevNote => {
       return [...prevNote, newNote];
     });


     try
        {  const response = await fetch(
        'https://expenses-bf761-default-rtdb.firebaseio.com/todo.json',
        {
          method: 'POST',
          body: JSON.stringify({
            title: newNote.title,
            content: newNote.content
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok){
        throw new Error('Request failed');
      }

      const data = await response.json();

    } catch(err){
      setError(err.message || 'Something went wrong');
    }

  };


const showNotes = async () => {

  try {
    const response = await fetch(
      'https://expenses-bf761-default-rtdb.firebaseio.com/todo.json'
    );

    if(!response.ok){
      throw new Error('Request failed');

    }

    const data = await response.json();

    const loadedTodos = [];

    for (const todoKey in data){
      loadedTodos.push({
        id: todoKey,
        title: data[todoKey].title,
        content: data[todoKey].content
      })
    }
    console.log(loadedTodos);
    setNote(loadedTodos);
  } catch (err) {
     ///will handle error here
  }
};

useEffect(() => {
  showNotes();
}, []);


  function deleteNote(id){
    setNote(prevNote => {
     return  prevNote.filter((noteItem, index) => {
               if(index !== id) {
                 console.log(noteItem.title);
                 console.log(noteItem.title, noteItem.content);
               }
          return index !== id;
      });
    });

    console.log(id);

  }

const deleteInDb = async (title, content) =>{
}
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
