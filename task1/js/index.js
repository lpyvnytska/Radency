import {buildTables, switchTables} from './tables'
import {buildForm} from './form'

document.addEventListener("DOMContentLoaded", () => {
   buildTables();
   document.getElementById("table-switcher").addEventListener("click", switchTables);
   document.getElementById("create-note").addEventListener("click", buildForm);
});
