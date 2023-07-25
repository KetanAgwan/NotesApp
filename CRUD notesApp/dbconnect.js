// this is url of the api
const url = "http://localhost:3000/Notes";
// const url = "https://ketanagwan.github.io/NotesApp/db.json";
// this is whole notes container
const notesContainer = document.getElementById("notes-container");
// this is the hole modal
const Modal = document.getElementById("form-modal");
//these are signup inputs to get data form
// these are compopnents of login form
const loginForm = document.getElementById("login-form");
const loginName = document.getElementById("login-name");
const loginPassword = document.getElementById("login-password");
const loginSubmitBtn = document.getElementById("login-submit-btn");
const loginInputs = document.querySelectorAll(".login-inputs");

// these are components of signup form
const signupForm = document.getElementById("signup-form");
const signupName = document.getElementById("signup-name");
const signupPassword = document.getElementById("signup-password");
const signupSubmitBtn = document.getElementById("signup-submit-btn");
const signupInputs = document.querySelectorAll(".signup-inputs");

// this is alert of invalid input
let redAlert = document.getElementById("red-alert");

// this is logout btn
const logoutBtn = document.getElementById("logout-btn");

//this is update modal
const updateModal = document.getElementById("alert-window1");
const closebtn = document.querySelector("#close");
const updateTitle = document.getElementById("update-note-title");
const updateDesc = document.getElementById("update-note-desc");
const updateBtn = document.getElementById("update-btn");
const updateClearBtn = document.getElementById("update-clear-btn");
var updateNoteId;
var updatingNoteId;

// this is for getting and saving the current user id
var currentUserId;
var currentUserName;
var currentUserPass;
var currentNoteList;
if (localStorage.getItem("NoteCredentials") !== null) {
  let currentUserObj = JSON.parse(localStorage.getItem("NoteCredentials"));
  currentUserId = currentUserObj.id;
  currentUserName = currentUserObj.name;
  currentUserPass = currentUserObj.password;
  // console.log(currentUserId,currentUserName,currentUserPass);
}

//these are insertion details of note that is going to be created
let addNote;
let createNoteTitle;
let createNoteDesc;

// this for inserting signup data into json server
//this function is fetching the data
async function fetchApi() {
  // let url = "db.json";
  let res = await fetch(url);
  return await res.json();
}

// this function creates user object and returns it
async function createUserObject(userName, userPass, signupId) {
  let newUser = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: signupId,
      name: userName,
      password: userPass,
      notelist: [
        {
          noteid: 1,
          title: "Welcome to the Notes app",
          description: `Introducing "MyNotes" - a feature-rich note-taking app built 
          withJavaScriptand the Fetch API. This innovative application allows users to create, 
          view, update, anddelete notesseamlessly. "MyNotes" simplifies organization by providing a
           user-friendly interface to notedown thoughts,ideas, and reminders effortlessly. Leveraging
            asynchronous Fetch requests, it securelycommunicates with the server,storing and retrieving 
            data efficiently. With a sleek design and smooth functionality,"MyNotes" empowers users tostay 
            organized and productive in their daily lives.Whether it's a quick note or an important task, "MyNotes" 
            is the go-to solution for managinginformation with ease`,
        },
      ],
    }),
  };
  return newUser;
}

// this js is for signUp the new user
async function signupUser(userName, userPass) {
  let data = await fetchApi();
  // console.log(data);
  signupId = 0;
  userAvailable = (function () {
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (
        userName == data[i].name &&
        userPass == data[i].password
      ) {
        return false;
      }
    }
  })();
  if (userAvailable == false) return false;
  else {
    signupId = Object.keys(data).length + 1;
    let newUser = await createUserObject(userName, userPass, signupId);
    try {
      let res = await fetch(url, newUser);
      let dataObj = await res.json();
      // console.log(dataObj);
      putIntoLocalStorage(userName, userPass);
      return true;
    } catch (e) {
      console.log("err=" + e);
      return false;
    }
  }
}

// this js is to check the user can login or not
async function loginUser(userName, userPass) {
  let data = await fetchApi();
  recordAvailable = false;
  recordAvailable = (function () {
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (
        userName == data[i].name &&
        userPass == data[i].password
      ) {
        return true;
      }
    }
  })();
  return recordAvailable;
}

// this js is for prventing page refreash on form submit
async function submitForm(event) {
  event.preventDefault();
  if (event.submitter == loginSubmitBtn) {
    let name = loginName.value;
    let password = loginPassword.value;
    if (await loginUser(name, password)) {
      // Greet();
      console.log("you can login");
      currentUserName = name;
      currentUserPass = password;
      putIntoLocalStorage(name, password);
      // location.reload();
      EnterApp();
    } else {
      loginInputs.forEach((element) => {
        element.style.borderBottom = "2px solid rgb(245, 66, 66)";
      });
      console.log("you cannot login");
      showAlert("Invalid credentials");
    }
  }
  if (event.submitter == signupSubmitBtn) {
    let name = signupName.value;
    let password = signupPassword.value;
    if (await signupUser(name, password)) {
      console.log("insertion sucess");
      currentUserName = name;
      currentUserPass = password;
      putIntoLocalStorage(name, password);
      EnterApp();
    } else {
      console.log("insertion unsucess");
      showAlert("Username not available please try another");
    }
  }
}
signupForm.addEventListener("submit", submitForm);
loginForm.addEventListener("submit", submitForm);

// this js is for showing the red alert
function showAlert(message) {
  redAlert.innerHTML = message;
  redAlert.style.top = "0%";
  setTimeout(() => {
    redAlert.style.top = "-5%";
  }, 3000);
}

//this function is for putting the credentials into the Local storage
async function putIntoLocalStorage(userName, userPass) {
  let data = await fetchApi();
  for (let i = 0; i < Object.keys(data).length; i++) {
    if (userName == data[i].name && userPass == data[i].password) {
      currentUserId = data[i].id;
    }
  }

  let credentials = {
    id: currentUserId,
    name: userName,
    password: userPass,
  };
  localStorage.setItem("NoteCredentials", JSON.stringify(credentials));
  EnterApp();
}

//this function for entering the app
function EnterApp() {
  if (localStorage.getItem("NoteCredentials") !== null) {
    loginName.value = "";
    loginPassword.value = "";
    signupName.value = "";
    signupPassword.value = "";
    userCredentials = JSON.parse(localStorage.getItem("NoteCredentials"));
    Modal.style.display = "none";
    showNotes(userCredentials.name, userCredentials.password);
  }
}
EnterApp();

// this function is for logout the app

logoutBtn.onclick = async function () {
  localStorage.removeItem("NoteCredentials");
  while (notesContainer.childNodes.length > 1) {
    notesContainer.removeChild(notesContainer.lastChild);
  }
  currentUserName = "";
  currentUserPass = "";
  currentUserId = "";
  location.reload();
  // showNotes(currentUserName,currentUserPass);
};

//this function is for displaying all notes of the user
async function showNotes(userName, userPass) {
  let data = await fetchApi();
  let res = await fetch(url + "/" + currentUserId);
  data = await res.json();
  let noteList = data.notelist;
  currentNoteList = noteList;
  let noteId = 0;
  noteList.forEach((note) => {
    notePage = document.createElement("div");
    notePage.setAttribute("class", "note-page");
    notePage.innerHTML = `<div class="note-title">
      ${note.title}
      </div>
      <div class="note-description">
         ${note.description}
      </div>
      <div class="operation-icons-container">
          <i class="fa-solid fa-pen-to-square operation-icons operation-icons-edit-btn" title="Edit" noteId="${noteId}"></i>
         <i class="fa-solid fa-trash-can operation-icons operation-icons-delete-btn" title="Delete" noteId="${noteId}"></i>
      </div>`;
    notesContainer.appendChild(notePage);
    noteId++;
  });

  let deleteBtnArr = document.querySelectorAll(".operation-icons-delete-btn");
  let editBtn = document.querySelectorAll(".operation-icons-edit-btn");
  deleteBtnArr.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      deleteNote(event.target.getAttribute("noteId"));
    });
  });
  editBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      insertNoteIntoUpdateModal(event.target.getAttribute("noteId"));
      updateModal.style.display = "block";
    });
  });
  return;
}

// this function is for inserting the new note into the object notelist array

async function createNote() {
  createNoteTitle = await document.getElementById("create-note-title").value;
  createNoteDesc = await document.getElementById("create-note-desc").value;
  let res = await fetch(url + "/" + currentUserId);
  data = await res.json();
  noteList = data.notelist;
  let insertionNoteId = noteList.length + 1;
  await noteList.unshift({
    noteid: insertionNoteId,
    title: createNoteTitle,
    description: createNoteDesc,
  });
  // console.log(noteList);
  newNoteCreationObj = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentUserId,
      name: currentUserName,
      password: currentUserPass,
      notelist: noteList,
    }),
  };
  await fetch(url + "/" + currentUserId, newNoteCreationObj);
  showNotes(currentUserName, currentUserPass);
}

// this function is for deleting the note from the array
async function deleteNote(noteid) {
  let res = await fetch(url + "/" + currentUserId);
  data = await res.json();
  let noteList = data.notelist;
  noteList.splice(noteid, 1);
  deletedNoteObject = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentUserId,
      name: currentUserName,
      password: currentUserPass,
      notelist: noteList,
    }),
  };
  await fetch(url+ "/" + currentUserId, deletedNoteObject);
  showNotes(currentUserName, currentUserPass);
}

//this function is for close the update modal
closebtn.onclick = function () {
  updateModal.style.display = "none";
};

// this section is for updating the note

// this function is for editing the note
async function insertNoteIntoUpdateModal(noteid) {
  // console.log("editing note number " + noteid);
  updateNoteId = noteid;
  updatingNote = currentNoteList[noteid];
  updatingNoteId = updatingNote.noteid;
  // console.log(updatingNote);
  updatingTitle = updatingNote.title;
  updatingDesc = updatingNote.description;
  updateTitle.value = updatingTitle;
  updateDesc.value = updatingDesc;
}

//this note is to save values of the new note into the database by clicking on save btn
updateBtn.addEventListener("click", () => {
  newTitle = updateTitle.value;
  newDesc = updateDesc.value;
  console.log(newTitle, newDesc);
  updateNote(newTitle, newDesc);
});

async function updateNote(newTitle, newDesc) {
  currentNoteList[updateNoteId] = {
    noteid: updatingNoteId,
    title: newTitle,
    description: newDesc,
  };
  // console.log(noteList);
  newNoteUpdationObj = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: currentUserId,
      name: currentUserName,
      password: currentUserPass,
      notelist: currentNoteList,
    }),
  };
  await fetch(url + "/" + currentUserId, newNoteUpdationObj);
  showNotes(currentUserName, currentUserPass);
}

// this is for clearing the update form
updateClearBtn.onclick = function () {
  updateTitle.value = "";
  updateDesc.value = "";
};
