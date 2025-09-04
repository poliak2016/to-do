const textForm = document.getElementById("text-form");
const output = document.getElementById("output");
const saveBtn = document.getElementById("save");
// const editBtn = document.getElementById("edit");

let todoList = [];

const storageKey = "todos";

// saving function

const save = () => {
  try{
    localStorage.setItem(storageKey, JSON.stringify(todoList))
  } catch(error){
    console.error("error saving", error)
  }
};

// loading function

const load = () => {
  try{
    const data = localStorage.getItem(storageKey);
    if (data) {
      todoList = JSON.parse(data)
    }
  } catch(error){
    console.error("error loading", error)
  }
}

// rendering function

const render =  () => {
  output.innerHTML = "";

  for(const t of todoList) {
    const li = document.createElement("li");
    li.dataset.id = t.id;
    if (t.done){
      li.classList.add("done");
    }
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.done;

    const span = document.createElement("span");
    span.textContent = t.text;
    const edit = document.createElement("button");
    edit.textContent = "edit"
    edit.id = `edit-${t.id}`
    edit.addEventListener("click", () => editTodo(t.id))

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(edit)
    output.appendChild(li);
  }
};
 
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
});

const editTodo = (id) => {
  const todo = todoList.find (t => t.id === id);
  if(!todo) return

  const newText = prompt ("Edit task", todo.text)
  
  if (newText) {
    todo.text = newText;
    save()
    render();
  }
}

load();
render();
