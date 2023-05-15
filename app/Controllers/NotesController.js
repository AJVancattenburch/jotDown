
import { appState } from "../AppState.js";
import { Note } from "../Models/Note.js";
import { notesService } from "../Services/NotesService.js";
import { getFormData } from "../Utils/FormHandler.js";
import { Pop } from "../Utils/Pop.js";
import { setHTML } from "../Utils/Writer.js";

function _drawNotes() {
    console.log('drawing notes');
    let notes = appState.notes
    // NOTE make sure your placeholder template is declared outside of the forEach
    let template = ''
    // NOTE for each note in the AppState, inject the cardTemplate into the placeholder
    let filterNotes = notes.filter(n => n.creatorName == appState.userName)

    filterNotes.forEach(n => template += n.CardTemplate)
    setHTML('notes', template)
}

function _changeTheme(color) {
    color = document.getElementById('color')
    let notes = appState.notes
    notes.forEach(n => n.color == document.getElementById('color'))
    setItem('color', Note.NoteForm)

}

function _drawCreateNoteButton() {
    setHTML('createNoteButton', Note.CreateNoteButton())
}

function _drawActive() {
    console.log('drawing active');
    let note = appState.activeNote
    setHTML('modal-guts', note.ActiveTemplate)
}

// function _editNote(noteId) {
//     let note = Note
//     const formData = getFormData(noteId)
//     formData.creatorName = appState.userName
//     setHTML('notes', noteId)
// }

export class NotesController {
    constructor() {
        // console.log('hello from the notes controller');



        _drawCreateNoteButton()
        // NOTE I'm listening to the activeNote in the AppState, and if it ever changes, I am going to redraw the ActiveTemplate
        appState.on('activeNote', _drawActive)
        appState.on('notes', _drawNotes)
        appState.on('userName', _drawCreateNoteButton)
        // appState.on('notes', _editNote)
    }

    // NOTE this is how we 'toggle' drawing notes to the page
    getNotes() {
        // TODO note out the arguments for appstate.on
        _drawNotes()
    }

    // editNote(noteId) {
    //     notesService.editNote(noteId)
    // }

    setActive(noteId) {
        console.log('setting active', noteId)
        notesService.setActive(noteId)
    }


    getNoteForm() {
        console.log('get the note form');
        setHTML('modal-guts', Note.NoteForm())
    }

    createNote() {
        console.log('creating the note');
        // NOTE prevent the page from refreshing
        window.event.preventDefault()
        const formHTML = event.target
        console.log('this is the onsubmit event', formHTML);
        // NOTE getFormData grabs the inputs and the values and create a key:value pair
        // NOTE the inputs MUST have a 'name' attribute that matches whatever property you are trying to assign
        const formData = getFormData(formHTML)
        console.log('this is my formatted object from the form', formData);
        formData.creatorName = appState.userName
        notesService.createNote(formData)
        // @ts-ignore
        // NOTE this line clears the form
        formHTML.reset()
        // NOTE this closes the modal
        // NOTE DO NOT IMPORT BOOTSTRAP OR THIS WILL NOT WORK
        // @ts-ignore
        bootstrap.Modal.getOrCreateInstance('#modal').hide()
    }
    
    async deleteNote(noteId) {
        console.log('delete note confirm', noteId);
        if (await Pop.confirm("Are you sure?")) {
            notesService.deleteNote(noteId)
        }
    }

}