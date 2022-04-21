import * as icons from './svg_icons.js'

export let categories = {
    "Idea" : icons.IDEA_ICON,
    "Quote": icons.QUOTE_ICON,
    "Task": icons.TASK_ICON,
    "Random Thought": icons.THOUGHT_ICON
}

export let todoList = [
    {
        id: 1,
        name: 'Shopping list',
        created: new Date('04/20/2021'),
        category: "Idea",
        content: 'Tomatoes, bread',
        active: true
    },
    {
        id: 2,
        name: 'The theory of evolution',
        created: new Date('04/27/2021'),
        category: "Quote",
        content: 'The evolution is something',
        active: true
    },
    {
        id: 3,
        name: "New Feature",
        created: new Date('04/27/2021'),
        category: "Idea",
        content: "Implement some feature in this app",
        dates: "",
        active: false
    },
    {
        id: 4,
        name: "Dentist",
        created: new Date('3/5/2021'),
        category: "Task",
        content: "I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",
        dates: "3/5/2021, 5/5/2021",
        active: false
    },
    {
        id: 5,
        name: "William Gaddis",
        created: new Date(),
        category: "Quote",
        content: "Power doesn't come with bla bla bla",
        dates: "",
        active: true
    },
    {
        id: 6,
        name: "Book",
        created: new Date(),
        category: "Task",
        content: "The Lean Statrup",
        dates: "",
        active: true
    },
]
