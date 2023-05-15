import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { saveState } from "../Utils/Store.js";

function _saveNotes() {
    saveState('notes', appState.notes)
}

class NotesService {

    setActive(noteId) {
        let foundNote = appState.notes.find(n => n.id == noteId)
        console.log(foundNote);
        appState.activeNote = foundNote
    }

    createNote(formData) {
        // NOTE instantiate my Note class, and make a new 'Note' out of my formData object
        let newNote = new Note(formData)
        console.log('newNote', newNote);
        appState.notes.push(newNote)
        // saveState('notes', appState.notes)
        _saveNotes()
        console.log(appState.notes);
        appState.emit('notes')
    }

    // editNote(noteId) {
    //     let noteToEdit = appState.notes.find(n => n.id == noteId)
    //     console.log('edit note', noteToEdit)
    //     appState.notes = appState.notes.push(n => n.id != noteId)
    //     appState.emit('notes', noteId)
    // }
    deleteNote(noteId) {
        let noteToDelete = appState.notes.find(n => n.id == noteId)
        console.log('delete note', noteToDelete)
        appState.notes = appState.notes.filter(n => n.id != noteId)
        _saveNotes()
    }

}

export const notesService = new NotesService()