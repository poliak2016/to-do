const textForm = document.getElementById("text-form");
const output = document.getElementById("output");
const saveBtn = document.getElementById("save");

let todoList = [];

const API = 'http://localhost:3000/api/todos';
const storageKey = "todos";

//normalize 
const normalize = (t) =>({
  id: t.id || t._id,
  text: t.text,
  done: Boolean(t.done)
});



async function fetchTodo() {
  try {
    const res = await fetch(API); 
    const todos = await res.json();
    todoList = todos.map(normalize);
  } catch (error) {
    console.error("error fetching todos", error);
  }
}

async function createTodo() {
  try {
    const res = await fetch('http://localhost:3000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text})
    });
    const todos = await res.json();
    console.log(todos);
  } catch (error) {
    console.error("error saving", error);
  }
}

async function updateTodo(id, patch) {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patch)
    });
    const updatedTodo = await res.json();
    todoList = todoList.map(t => t.id === id ? normalize(updatedTodo) : t);
  } catch (error) {
    console.error("error loading", error);
  }
};

async function removeTodo(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      todoList = todoList.filter(t => t.id !== id);
    } else {
      console.error("error removing todo", res.statusText);
    }
  } catch (error) {
    console.error("error removing todo", error);
  }
}


 
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
};

const deleteTodo = (id)=>{

  todoList = todoList.filter(t => t.id !== id);

  save();
  render();
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
    edit.textContent = "edit";
    edit.id = `edit-${t.id}`;
    edit.addEventListener("click", () => editTodo(t.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.id = `delete-${t.id}`;
    deleteBtn.addEventListener("click", () => deleteTodo(t.id));

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(edit);
    li.appendChild(deleteBtn);
    output.appendChild(li);
  }
};

load();
render();
