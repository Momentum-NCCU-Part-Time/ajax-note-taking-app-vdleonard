console.log("Hello")
/* 
Side bar nav?
-- show one current note at time
-- 
Delete note

*/

const app = {
  data: {
    url: "http://localhost:3000/notes",
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

  generateNotesHTML: function () {
    let container = document.getElementById("container")
    for (let note of this.data.notes) {
      container.innerHTML += `
        <div data-id=${note.id}>
        <h2 id="current-note">${note.title}</h2>
        <p>${note.body}</p>
        </div>
        `
    }
  },

  createNote: function () {
    //post request
  },

  displayCreateNote: function () {
    //display create form
  },

  deleteConfirm: function () {
    // call deleteNote on confirm
  },

  deleteNote: function (noteID) {
    // delete note
  },

  editNote: function () {},

  displayEditForm: function () {
    /* display current note  and add body to be changed*/
  },

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

  main: function () {
    // event listitners for fuctions
    app.getNotes()
  }
}

app.main()
