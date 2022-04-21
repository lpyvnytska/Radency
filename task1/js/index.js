import { buildTables, switchTables, addNote } from "./tables.js";
import { showNotification } from './notification.js'

document.addEventListener("DOMContentLoaded", () => {
  try {
    buildTables();
    document.getElementById("table-switcher").addEventListener("click", switchTables);
    document.getElementById("create-note").addEventListener("click", addNote);
  } catch (e) {
   showNotification(e, 'error')
  }
});
