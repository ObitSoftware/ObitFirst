import express from 'express';
const notesRoutes = express.Router();
import {createNewNote, getNotes} from "../controllers/notesController.js"


notesRoutes.post('/newNote', createNewNote);
notesRoutes.get('/getNotes', getNotes);


export default notesRoutes;