import {buildTables, switchTables, addNote} from './tables.js'

document.addEventListener("DOMContentLoaded", () => {
   buildTables()
   document.getElementById("table-switcher").addEventListener("click", switchTables)
   document.getElementById("create-note").addEventListener("click", addNote)
})
