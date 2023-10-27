import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/notas";
import Note from "./components/Note";
import Container from "react-bootstrap/Container";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import * as NoteApi from "./network/notes_api";
import AddNoteDialog from "./components/AddEditNoteDialog";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLaoding] = useState(true)
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false) 

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false)
        setNotesLaoding(true)
        const notes = await NoteApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true)
      } finally {
         setNotesLaoding(false)
      }
    }
    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NoteApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const notesGrid = 
          <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
          {notes.map((note) => (
            <Col key={note._id}>
              <Note
                note={note}
                className={styles.note}
                onNoteClicked={setNoteToEdit}
                onDeleteNoteClicked={deleteNote}
              />
            </Col>
          ))}
        </Row>

  return (
    <Container className={styles.notesPage}>
      <Button
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        variant="primary"
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add New Note
      </Button>
      { notesLoading && <Spinner animation="border" variant="primary"/>}
      {showNotesLoadingError && <p>Something went wrong . Please refresh the page</p>}
      {!notesLoading && !showNotesLoadingError && 
          <>
            {notes.length > 0 
              ? notesGrid 
              : <p>You dont have any notes yet</p>
            }
          </>
      }

      {showAddNoteDialog &&
            <AddNoteDialog
              onDismiss={() => setShowAddNoteDialog(false)}
              onNoteSaved={(newNotes) => {
                   setNotes([...notes, newNotes])
                   setShowAddNoteDialog(false)
              }}
            />
      }
   
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}

      {noteToEdit && 
        <AddNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(notes.map(existingNote => existingNote._id === updateNote._id ? updateNote : existingNote ))
            setNoteToEdit(null);
          }}
        />
      }
    </Container>
  );
}

export default App;
