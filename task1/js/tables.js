import { todoList, categories } from "./variables.js";
import { buildForm } from "./form.js";
import { showNotification } from "./notification.js";

let showActiveList = true,
  listTable = document.getElementById("list-table"),
  statsTable = document.getElementById("stats-table");


const switchTables = () => {
  try {
    showActiveList = !showActiveList;
    buildTables();
  } catch (e) {
    showNotification('Error during switch active/archive tables', 'error')
  }
};

const buildTables = () => {
    try {
        let list = todoList.filter((note) => note.active === showActiveList);
        buildToDoTable(list);
        buildStaticTable(todoList);
    } catch (e) {
        showNotification('Error during build tables', 'error')
    }
};

const buildToDoTable = (list) => {
  listTable.innerHTML = "";
  list.forEach((note) => listTable.appendChild(addTableRow(note)));
};

const buildStaticTable = (fullList) => {
  let staticList = {};
  statsTable.innerHTML = "";
  for (let cat in categories) {
    staticList[cat] = { total: 0, active: 0 };
  }
  for (let note of fullList) {
    ++staticList[note.category].total;
    if (note.active) {
      ++staticList[note.category].active;
    }
  }
  statsTable.innerHTML = Object.keys(staticList)
    .map((note) => addStaticRow(note, staticList[note]))
    .join('')
};

const addNote = () => {
  try {
    buildForm(-1, updateNote);
  } catch (e) {
    showNotification('Error during adding note', 'error')
  }
};

const editNote = (id) => {
  try {
    buildForm(todoList[todoList.findIndex((note) => note.id === id)], updateNote);
  } catch (e) {
    showNotification('Error during edit note', 'error')
  }
};

const updateNote = (editabledNote) => {
  let idx = todoList.findIndex((note) => note.id === editabledNote.id);
  let textNotify = ''
  if (~idx) {
    todoList[idx] = { ...todoList[idx], ...editabledNote };
    textNotify = 'Note changed'
  } else {
    todoList.push(editabledNote);
    textNotify = 'Note added'
  }
  buildTables();
  showNotification(textNotify, 'info')
};

const changeArchiveStateNote = (id) => {
  let idx = todoList.findIndex((note) => note.id === id);
  todoList[idx].active = !todoList[idx].active;
  buildTables();
};

const deleteNote = (id) => {
  try {
    let idx = todoList.findIndex((note) => note.id === id);
    todoList.splice(idx, 1);
    buildTables();
    showNotification('Note deleted', 'info')
  } catch (e) {
    showNotification('Error during delete note', 'error')
  }
};

const addTableRow = (note) => {
  let tr = document.createElement("tr");
  tr.classList.add("table__row");
  tr.id = note.id;
  tr.innerHTML = `
        <td class="table__icon-round">
            <svg class="icon">
                <use xlink:href="${categories[note.category]}"></use>
            </svg>
        </td>
        <td>${note.name}</td>
        <td>${note.created.toLocaleDateString()}</td>
        <td>${note.category}</td>
        <td>${note.content}</td>
        <td>${note.dates || ""}</td>
`;
  let tdEdit = document.createElement("td");
  let tdArchive = document.createElement("td");
  let tdDelete = document.createElement("td");
  tdEdit.innerHTML = ` <svg class="icon">
                        <use xlink:href="./img/sprite.svg#edit"></use>
                    </svg>`;
  tdArchive.innerHTML = ` <svg class="icon">
                        <use xlink:href="./img/sprite.svg#archive"></use>
                    </svg>`;
  tdDelete.innerHTML = ` <svg class="icon">
                        <use xlink:href="./img/sprite.svg#delete"></use>
                    </svg>`;
  tdEdit.addEventListener("click", () => editNote(note.id));
  tdArchive.addEventListener("click", () => changeArchiveStateNote(note.id));
  tdDelete.addEventListener("click", () => deleteNote(note.id));
  tr.appendChild(tdEdit);
  tr.appendChild(tdArchive);
  tr.appendChild(tdDelete);
  return tr;
};

const addStaticRow = (category, { total, active }) => {
  return `
    <tr class="table__row">
        <td class="table__icon-round">
          <svg class="icon">
            <use xlink:href="${categories[category]}"></use>
          </svg>
        </td>
        <td className="category">${category}</td>
        <td className="active">${active}</td>
        <td className="archived">${total - active}</td>
    </tr>
`;
};

export { buildTables, switchTables, addNote };
