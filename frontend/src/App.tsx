import React, { useEffect, useState } from 'react';
import { Note as NoteModel } from './models/notas';
import Note from './components/Note';
import Container from 'react-bootstrap/Container';
import styles from "./styles/NotesPage.module.css";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import * as NoteApi from "./network/notes_api" 
import AddNoteDialog from './components/AddNoteDialog';
import Button from 'react-bootstrap/Button';
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

  return (
    <Container fluid="md">
      <Button
        variant="primary"
        onClick={() => setShowAddNoteDialog(true)}
      >
          Add New Note
      </Button>
    <Row xs={1} md={2} xl={3} className="g-4">
      {notes.map(note => (
        <Col key={note._id}>
          <Note note={note} className={styles.note} />
        </Col>
      ))}
    </Row>
    {showAddNoteDialog &&
      <AddNoteDialog
       onDismiss={() => setShowAddNoteDialog(false)}
      />
    }
  </Container>
  );
}

export default App;