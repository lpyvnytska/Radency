import {todoList, categories} from './variables'

let showActiveList = true

const buildTables = () => {
    let list = showActiveList ? todoList.filter( note => note.archive === false) : todoList.filter( note => note.archive === true) 
    buildToDoTable(list)
    buildStaticTable(todoList)
}

const switchTables = () => {
    showActiveList = !showActiveList
    buildTables()
}

export { buildTables, switchTables }