const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  closeIcon = popupBox.querySelector("header i"),
  popupTitle = popupBox.querySelector("header p"),
  addBtn = popupBox.querySelector("button"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
showNotes();
let isUpdate = false;
let updateId;
function showNotes() {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  console.log("noteesssss",notes);
  notes.forEach((note, index) => {
    console.log("111",note,index);
    let liTag = `  <li class="note">
        <div class="details">
          <p>${note.title}</p>
          <span
            >
            ${note.description}</span
          >
        </div>
        <div class="bottom-content">
          <span>${note.date}</span>
          <div class="settings">
            <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
            <ul class="menu">
            <li onclick="updateNote(${index},'${note.description}','${note.title}' )"><i class="uil uil-pen"></i>Edit</li>
            <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
          </ul>
          </div>
        </div>
      </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});
closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
function updateNote(noteId,description,title) {
  console.log("AAA",noteId,description,title)
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  console.log("AAA",noteId,title,description)
  titleTag.value = title;
  descTag.value = description;
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update a Note";
  console.log("AAA",noteId,title,description)
}
function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this Note?");
  if (!confirmDel) {
    return;
  }
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value;
  if (noteTitle || noteDesc) {
    let dateObj = new Date(),
      month = months[dateObj.getMonth()],
      year = dateObj.getFullYear(),
      day = dateObj.getDate();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${month} ${day}, ${year}`,
    };
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
