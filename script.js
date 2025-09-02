const textForm = document.getElementById("text-form");
const saveBtn = document.getElementById("save");
const output = document.getElementById("output");

let todoList = [];

const storageKey = "todos";

const save = () => {
  localStorage.setItem(storageKey, JSON.stringify(todoList))
};

const load = () => {
  const data = localStorage.getItem(storageKey);
  if (data) {
    todoList = JSON.parse(data)
  }
}

load();

saveBtn.addEventListener('click', () => {
  const text = textForm.value.trim();

  if(!text) {
    return alert("enter any text");
  }
  const todo ={
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    text,
    done: false
  }
  todoList.push(todo);
  textForm.value ="";
  save();
  render();

})

output.addEventListener('change', (e) => {

  if (e.target.matches('input[type="checkbox"]')) {

    if(!checkbox) return;

    const li = e.target.closest('li');
    const id = li.dataset.id;
    const t = todoList.find(todo => todo.id === id);
    if (t) t.done = e.target.checked;
    
    save();
  }
})