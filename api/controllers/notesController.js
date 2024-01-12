import Notes from "../models/notes.js";

export const createNewNote = async (req, res) => { 

     console.log(req.body)
    try {
        const newNote = new Notes(req.body);
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear la nota' });
        console.log(error)
      }
}

export const getNotes = async (req, res) => { 
    try {
        const allNotes = await Notes.find()
        res.status(201).json(allNotes)
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las notas' });
        console.log(error)
      }
 }
