import * as NoteController from "../controller/notes"
import express from 'express';

const router = express.Router()

router.get("/", NoteController.getNotes)

router.post("/", NoteController.createNote)
  

export default router