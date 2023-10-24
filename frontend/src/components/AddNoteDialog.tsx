import React from 'react'
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal'

interface AddNoteDialogProps {
      onDismiss: () => void;
}

function AddNoteDialog({onDismiss}: AddNoteDialogProps) {
  return (
     <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Note
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Title"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                      as="textarea"
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
      </Modal>
  )
}

export default AddNoteDialog