import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Note } from '../models/notas';
import { useForm } from 'react-hook-form';
import * as NotesApi from "../network/notes_api";
import { NoteInput } from "../network/notes_api";

interface AddNoteDialogProps {
      noteToEdit?: Note,
      onDismiss: () => void;
      onNoteSaved: (note: Note) => void
}

function AddNoteDialog({ noteToEdit, onDismiss, onNoteSaved }: AddNoteDialogProps) {

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
       defaultValues: {
        title: noteToEdit?.text || "",
        text: noteToEdit?.text || "",
      }
  })

  async function onSubmit( input: NoteInput) {
    try {
        let noteResponse: Note
        if (noteToEdit) {
          noteResponse = await NotesApi.updateNote(noteToEdit._id, input)
        } else {
          noteResponse = await NotesApi.createNote(input)
        }
      onNoteSaved(noteResponse)
    } catch (error) {
      console.error(error)
      alert(error)
    }
    
  }


  return (
     <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                {noteToEdit ? "Edit note" : "Add Note"}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                      isInvalid={!!errors.title}
                      {...register("title", { required: "Required" })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      placeholder='Text'
                      {...register("text")}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
           type='submit'
           form="addNoteForm"
           disabled={isSubmitting}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default AddNoteDialog