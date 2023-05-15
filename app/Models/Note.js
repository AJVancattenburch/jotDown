import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Note {
    constructor(data) {
        this.id = data.id || generateId()
        this.name = data.name
        this.description = data.description
        this.img = data.img
        this.color = data.color
        this.date = data.date ? new Date(data.date) : new Date()
        // NOTE adding this property to inidicate which user made this
        this.creatorName = data.creatorName
    }


    static NoteForm() {
        return `
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Note</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <form class="theme" onsubmit="app.notesController.createNote()">
          <div class="modal-body container-fluid">
            <section class="row d-flex">
              <div class="mb-3 col-6 offset-3 justify-content-center align-items-center text-center">
                <label for="color" class="form-label">Note Theme</label>
                <input required type="color" class="form-control" id="color" name="color" placeholder="Note Color Theme" onchange="'app.notesController.changeTheme()'">
              </div>
              <div class="mb-3 col-12">
                <label for="name" class="form-label">Document</label>
                <input required minlength="3" maxlength="20" type="text" class="form-control" id="name" name="name"
                  placeholder="Untitled Document...">
              </div>
              <div class="mb-3 col-12">
                <label for="description" class="form-label">Note Description</label>
                <textarea required minlength="3" type="text" class="form-control" id="description" name="description" placeholder="Note Description" style="height: 60vh;"></textarea>
              </div>
            </section>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save Note</button>
          </div>
        </form>`
    }

    get CardTemplate() {
        return `
      <div class="col-3 text-center">
        <div onclick="app.notesController.setActive('${this.id}')" class="img-ft rounded elevation-5 selectable" data-bs-toggle="modal" data-bs-target="#modal">
        <img id="myImg" src="https://xflower-software.com/files/Blog/HU/document.png" width="107" height="98">
            <p>Saved on: ${this.date}</p>
          <div class="d-flex justify-content-between px-2">
          <p>Title: ${this.name}</p>
          <p>Jotter: ${this.creatorName}</p>
          </div>
        </div>
      </div>`
    }

    get ActiveTemplate() {
        return `   
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${this.name}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body container-fluid">
          <section class="row">
            <div class="col-md-6">
              <img
                src="${this.img}"
                alt="">
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-around">
                <p>${this.description}</p>
              </div>
            </div>
          </section>
          <section class="row justify-content-end">
          <div class="col-2">
          <button class="btn btn-danger" onclick="app.notesController.deleteNote('${this.id}')">Delete Note</button>
          </div>
          </section>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button onclick="app.notesController.editNote('${this.id}')" type="button" class="btn btn-primary">Edit Note</button>
        </div>`
    }

    get ComputeDate() {
      let date = this.date
      return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
    }

    static CreateNoteButton() {
        return `
      <div class="col-12 text-end">
        <button ${appState.userName != '' ? '' : 'disabled'} onclick="app.notesController.getNoteForm()" data-bs-toggle="modal" data-bs-target="#modal" class="add-btn bi bi-plus-circle-fill"></button>
      </div>`
    }

}
