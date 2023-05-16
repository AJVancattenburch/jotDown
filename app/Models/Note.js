import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

export class Note {
    constructor(data) {
        this.id = data.id || generateId()
        this.count = data.count
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

        <form class="theme" style="color" onsubmit="app.notesController.createNote()">
          <div class="modal-body container-fluid">
            <section class="row d-flex">
              <div class="mb-3 col-6 offset-3 justify-content-center align-items-center text-center">
                <label for="color" class="form-label">Note Theme</label>
                <input required type="color" class="form-control" id="color" name="color" placeholder="Note Color Theme" onchange="'app.notesController.changeTheme()'">
              </div>
              <div class="mb-3 col-12">
                <label for="name" class="form-label">Document</label>
                <input required minlength="3" maxlength="15" type="text" class="form-control" id="name" name="name"
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
        <div class="col-3 wrapper text-start">
          <div onclick="app.notesController.setActive('${this.id}')" class="img-ft rounded elevation-5 selectable ps-3" data-bs-toggle="modal" data-bs-target="#modal">
            <img id="myImg" src="https://xflower-software.com/files/Blog/HU/document.png" width="107" height="98">
            <div class="row">
              <div class="col-6">
                <p>Saved on: ${this.date}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <p>Title: ${this.name}</p>
              </div>
            </div>

            <div class="row">
              <div class="col-12 text-start">
                <p>Jotter: ${this.creatorName}</p>
              </div>
            </div>

            <div class="row container-fluid"

              <section class="col-12"
                <blockquote contentEditable="true" style="height: 30dvh;">
                  <p>${this.description}</p>
                </blockquote>
              </section>
            </div>
          </div>
        </div>`
    }

    get ActiveTemplate() {
        return `   
        <section class="modal-header text-start mt-3">
          <div class="row">
            <div class="col-4">
              <h2 class="modal-title fs-5" id="exampleModalLabel">${this.name}</h2>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          </div>
        </section>

        <section class="modal-body container-fluid text-start">

          <section class="row text-start">
            <div class="col-md-4">
              <img
                class="img-fluid"
                src="${this.img}"
                alt="${this.name}">
            </div>
            <div class="col-12">
              <blockquote class="justify-content-start align-items-baseline" contentEditable="true">
                <p tabindex="0">${this.description}</p>
              </blockquote>
            </div>
          </section>

          <section class="row d-flex">
            <div class="col-12 justify-content-end align-items-baseline">
              <button class="btn btn-danger" onclick="app.notesController.deleteNote('${this.id}')">Delete Note</button>
            </div>
          </section>

        </section>`
    }

    get CountTemplate() {
      return `
        <h2 style="text-shadow: 1px 1px 3px #596b59;">${this.count}</h2>`
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
