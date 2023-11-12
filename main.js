console.log("Hello")
/* Working on Delete. 
    Delete does not eyt delete note from Notes array
    need to use filter? mgiht nto be doing it right.


Side bar nav?
-- show one current note at time
-- 


*/

const app = {
  data: {
    url: "http://localhost:3000/notes/",
    notes: []
  },
  // methods
  getNotes: function () {
    fetch(this.data.url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(response => {
        for (let note of response) {
          this.data.notes.push(note)
        }
        this.generateNotesHTML()
      })
  },
  //---------------------------------------------------------
  generateNotesHTML: function () {
    let container = document.getElementById("container")
    for (let note of this.data.notes) {
      container.innerHTML += `
        <div class="stickyNote">
        <h2>${note.title}</h2>
        <p>${note.body}</p>
        <button class="editButton" data-id=${note.id}> Edit </button>
        <button class="deleteButton" data-id="${note.id}"> Delete </button>
        </div>
        `
    }
    console.log(this.data.notes)
    this.addEventListeners()
  },
  //------------------------------------------------------
  createNote: function () {
    /* post needs to be a json. 
    need to figure out hwo to make new note a json*/
    let newTitle = document.getElementById("inputTitle").value
    let newText = document.getElementById("inputNote").value

    let newNote = {
      title: newTitle,
      body: newText
    }

    fetch(this.data.url, {
      method: "POST",
      body: JSON.stringify(newNote),
      headers: { "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(response => {
        this.generateNotesHTML()
        console.log("New Note created")
      })
    console.log(newTitle)
    console.log(newText)
    this.getNotes()
  },
  //-----------------------------------------------------
  displayCreateNote: function () {
    let form = document.getElementById("createForm")
    form.classList.remove("hidden")
  },
  //------------------------------------------------------
  deleteConfirm: function () {
    /* call deleteNote on confirm
      Make pop up that asks if you are sure
      if yes
        close pop up
        deteteNote
      else 
        close pop up
      */
  },
  //-------------------------------------------
  deleteNote: function (noteId) {
    fetch(this.data.url + noteId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(response => {
        /* delete object from this.data.notes using noteId */
        this.data.notes = this.data.notes.filter(noteId => (noteId = this.data.notes.id))

        this.getNotes()
        console.log("Note " + this.data.notes.id + " deleted")
      })
  },
  //-----------------------------------------------------
  editNote: function () {},

  displayEditForm: function () {
    /* display current note  and add body to be changed*/
  },
  //--------------------------------------------------
  addEventListeners: function () {
    let deleteButtons = document.querySelectorAll(".deleteButton")
    for (let button of deleteButtons) {
      button.addEventListener("click", event => {
        event.preventDefault()
        console.log("delete button")
        this.deleteNote(button.dataset.id)
      })
    }

    let editButtons = document.querySelectorAll(".editButton")
    for (let button of editButtons) {
      button.addEventListener("click", event => {
        event.preventDefault()
        console.log("edit button")
      })
    }

    let createButtons = document.querySelectorAll(".createButton")
    for (let button of createButtons) {
      button.addEventListener("click", event => {
        event.preventDefault()
        console.log("create button")
        this.displayCreateNote()
      })
    }

    let createSaveButtons = document.querySelectorAll(".createSave")
    for (let button of createSaveButtons) {
      button.addEventListener("click", event => {
        event.preventDefault()
        let form = document.getElementById("createForm")
        form.classList.add("hidden")
        console.log("create Savebutton")
        this.createNote()
      })
    }
  },
  //---------------------------------------------------------
  /* Idea for a side bar sellection for picking one note at a time instead of showing all at once. 

  generateSideNav: function () {
    let sideBar = document.getElementById("side-nav")
    for (let note of this.data.notes) {
      sideBar.innerHTML += `
        <div data-id=${note.id}>
        <h2 id="current-note">${note.title}</h2>
        </div>
        `
    }
  },
*/
  //-----------------------------------------------------------
  main: function () {
    // event listitners for fuctions
    this.getNotes()
  }
}

app.main()
