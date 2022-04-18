import { todoList, categories } from './variables.js'
import {buildForm} from './form.js'

let showActiveList = true,
    listTable = document.getElementById('list-table'),
    statsTable = document.getElementById('stats-table')

const buildTables = () => {
    let list = todoList.filter(note => note.active === showActiveList)
    buildToDoTable(list)
    buildStaticTable(todoList)
}

const switchTables = () => {
    showActiveList = !showActiveList
    buildTables()
}

const buildToDoTable = (list) => {
    listTable.innerHTML = ''
    list.forEach(note => listTable.appendChild(addTableRow(note)))
}

const buildStaticTable = (fullList) => {
    let staticList = {}
    statsTable.innerHTML = ''
    for (let cat in categories) {
        staticList[cat] = { total: 0, active: 0 }
    }
    for (let note of fullList) {
        ++staticList[note.category].total
        if (note.active) {
            ++staticList[note.category].active
        }
    }
    statsTable.innerHTML = Object.keys(staticList).map(note => addStaticRow(note, staticList[note])).reduce((a, b) => a + b, '')
}

const addNote = () => {
    buildForm(-1, updateNote)
}

const editNote = id => {
    buildForm(todoList[todoList.findIndex(note => note.id === id)], updateNote)
}

const updateNote = editabledNote => {
    let idx = todoList.findIndex(note => note.id === editabledNote.id)
    if (~idx) {
        todoList[idx] = {...todoList[idx], ...editabledNote}
    } else {
        todoList.push(editabledNote)
    }
    buildTables()
}

const changeArchiveStateNote = id => {
    let idx = todoList.findIndex(note => note.id === id)
    todoList[idx].active = !todoList[idx].active
    buildTables()
}

const deleteNote = id => {
    let idx = todoList.findIndex(note => note.id === id)
    todoList.splice(idx, 1)
    buildTables()
}

const addTableRow = (note) => {
    let tr = document.createElement('tr')
    tr.classList.add('table__row')
    tr.id=note.id
    tr.innerHTML =`
        <td class="table__icon-round">
            <svg class="icon">
                <use xlink:href="${categories[note.category]}"></use>
            </svg>
        </td>
        <td>${note.name}</td>
        <td>${note.created.toLocaleDateString()}</td>
        <td>${note.category}</td>
        <td>${note.content}</td>
        <td>${note.dates || ''}</td>
`;
let tdEdit = document.createElement('td')
let tdArchive = document.createElement('td')
let tdDelete = document.createElement('td')
tdEdit.innerHTML = ` <svg class="icon">
                        <use xlink:href="./img/sprite.svg#edit"></use>
                    </svg>`
tdArchive.innerHTML = ` <svg class="icon">
                        <use xlink:href="./img/sprite.svg#archive"></use>
                    </svg>`
tdDelete.innerHTML = ` <svg class="icon">
                        <use xlink:href="./img/sprite.svg#delete"></use>
                    </svg>`
tdEdit.addEventListener('click', () => editNote(note.id))
tdArchive.addEventListener('click', () => changeArchiveStateNote(note.id))
tdDelete.addEventListener('click', () => deleteNote(note.id))
tr.appendChild(tdEdit)
tr.appendChild(tdArchive)
tr.appendChild(tdDelete)
return tr
}

const addStaticRow = (category, {total, active}) => {
    return `
    <tr class="table__row">
        <td class="table__icon-round">
          <svg class="icon">
            <use xlink:href="${ categories[category] }"></use>
          </svg>
        </td>
        <td className="category">${ category }</td>
        <td className="active">${ active }</td>
        <td className="archived">${ total-active }</td>
    </tr>
`;
}

export { buildTables, switchTables, addNote }