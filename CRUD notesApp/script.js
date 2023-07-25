// this js is for closing and opening the form to create and update the note

// these are that form container components
let plusBtn = document.getElementById("new-note");
let closeBtn = document.getElementById("note-form-close");
const formBox = document.getElementById("create-note");
if (closeBtn == undefined) {
  plusBtn.addEventListener("click", showForm);
}

// this function is for shwing the form
function showForm() {
  formBox.innerHTML = "";
  formBox.innerHTML = `<div class="create-note-form">
    <div class="note-form-close" id="note-form-close" title="Close form">
        <i class="fa-regular fa-circle-xmark"></i>
    </div>
    <div class="create-note-title-div">
        <label for="title">
            Title :
        </label><br>
        <input type="text" name="note-title" id="create-note-title" class="create-note-title create-note-inputs">
    </div>
    <div class="creat-note-input-desc">
        <label for="description">
            Description :
        </label><br>
        <textarea name="note-desc" id="create-note-desc" class="create-note-desc create-note-inputs" cols="40" rows="6"></textarea>
    </div>
    <div class="operation-btn-container">
        <button class="create-note-form-btns" id="save-btn" title="Save Note">Save</button>
        <button class="create-note-form-btns" id="clear-btn" title="Clear form">Clear</button>
    </div>
</div>`;
  closeBtn = document.getElementById("note-form-close");
  closeBtn.addEventListener("click", hideForm);
  // when we click on the save btn btn then it saves the note to the database
  addNote = document.getElementById("save-btn");
  addNote.addEventListener("click", createNote);
  clearNote = document.getElementById("clear-btn");
  clearNote.addEventListener("click", () => {
    document.getElementById("create-note-title").value = "";
    document.getElementById("create-note-desc").value = "";
  });
}

// this function is for hiding the form and displying the plus sign
function hideForm() {
  formBox.innerHTML = "";
  formBox.innerHTML = `<div class="new-note" id="new-note" title="Create Note">
    <div class="plus-box">
        <i class="fa-solid fa-plus" "></i>
    </div>
</div>`;
  plusBtn = document.getElementById("new-note");
  plusBtn.addEventListener("click", showForm);
}





