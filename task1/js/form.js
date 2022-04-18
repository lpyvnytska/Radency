import { categories } from './variables.js'
import { parseDatesFromText } from './regexpDate.js'

function buildForm(note = {}, updateNote){
    console.log(note);
    let form = document.createElement('form');
    form.innerHTML = `
        <input type="text" name="name" value="${note.name || ''}" placeholder="Name" required>
        <select name="categories">
        ` + Object.keys(categories).map(item => `<option value="${item}" ${note.category === item? 'selected' : ''}>${item}</option>`) + `
        </select>
        <textarea name="content" placeholder="Content">${note.content || ''}</textarea>
        <input class="cancel" type="button" value="Cancel">
        <input id="submit-button" type="submit" value="Submit" > 
    `;
    form.getElementsByClassName('cancel')[0].addEventListener("click", ()=>{
        document.getElementsByClassName('modal-div')[0].remove();
    });

    form.onsubmit = (event)=>{
        event.preventDefault();
        let newNote = {
            id: note.id || Date.now(),
            name: event.target.name.value,
            created: note.created || new Date(),
            category: event.target.categories.value,
            content: event.target.content.value,
            dates: parseDatesFromText(event.target.content.value),
            active: note.active ?? true
        }
        updateNote(newNote);
        document.getElementsByClassName('modal-div')[0].remove();
    };

    let modalDiv = document.createElement('div');
    modalDiv.className = 'modal-div';
    modalDiv.append(form);

    document.body.prepend(modalDiv);
}

export { buildForm }