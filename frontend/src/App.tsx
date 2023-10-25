import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/notas';
import Note from './components/Note';
import Container from 'react-bootstrap/Container';
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import * as NoteApi from "./network/notes_api" 
import AddNoteDialog from './components/AddNoteDialog';
import Button from 'react-bootstrap/Button';
import { FaPlus } from "react-icons/fa"


function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)

  useEffect(() => {
    async function loadNotes() {
      try {
          const notes = await NoteApi.fetchNotes()
        setNotes(notes);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NoteApi.deleteNote(note._id)
      setNotes(notes.filter(existingNote => existingNote._id !== note._id))
    } catch (error) {
       console.error(error)
       alert(error)
    }
  }



  return (
    <Container >
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        variant="primary"
        onClick={() => setShowAddNoteDialog(true)}
      >
          <FaPlus />
          Add New Note
      </Button>
    <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map(note => (
        <Col key={note._id}>
          <Note 
           note={note} 
           className={styles.note} 
            onDeleteNoteClicked={deleteNote}
           />
        </Col>
      ))}
    </Row>
    {showAddNoteDialog &&
      <AddNoteDialog
       onDismiss={() => setShowAddNoteDialog(false)}
       onNoteSaved={(newNote) => {
         setNotes([...notes, newNote])
         setShowAddNoteDialog(false)
      }}
      />
    }
  </Container>
  );
}

export default App;