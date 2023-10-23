import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Note } from './models/notas';

function App() {
  const [notes, setNote] = useState<Note[]>([])

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/api/notas", { method:"GET" })
        const notes = await response.json() 
        setNote(notes)
      } catch (error) {
       console.error(error)
       alert(error)
      }
      loadNotes()
    }
  }, [])


  return (
    <div className="App">
       {JSON.stringify(notes)}
    </div>
  );
}

export default App;
