//constants and variables
const API = 'http://localhost:3000/api/todos';
const textForm = document.getElementById("text-form");
const output = document.getElementById("output");
const saveBtn = document.getElementById("save");
const input = document.getElementById("text-form");
let todoList = [];


//normalize 
const normalize = (t) =>({
  id: String(t.id ?? t._id),
  text: t.text,
  done: Boolean(t.done)
});


//main functions
async function fetchTodo() {
  try {
    const res = await fetch(API); 
    if (!res.ok) throw new Error(res.statusText)
    const todos = await res.json();
    todoList = todos.map(normalize);
  } catch (error) {
    console.error("error fetching todos", error);
  }
}

async function createTodo(text) {
  try {
    const res = await fetch(`${API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text})
    });
    if (text.length < 2) {
      alert("text is too short"); 
      throw new Error("text is too short");
    }
    if (!res.ok) throw new Error(res.statusText)
    const todos = normalize(await res.json());
    todoList.push(todos);
    render();
  } catch (error) {
    console.error("error saving", error);
    return null;
  }
}

async function updateTodo(id, patch) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patch)
    });
    if (!res.ok) throw new Error(res.statusText)
    const updatedTodo = normalize(await res.json());
    todoList = todoList.map(t => t.id === id ? updatedTodo : t);
    render();
    return updateTodo
  } catch (error) {
    console.error("error updating", error);
    return null;
  }
};

async function removeTodo(id) {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error(res.statusText);

      todoList = todoList.filter(t => t.id !== id);
      render()
      return true;
    } catch (error) {
    console.error("error removing todo", error);
    return false;
  }
}


 //buttons

saveBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const text = textForm.value.trim();
  if(!text) return alert("enter any text");
  textForm.value = "";
  await createTodo(text).catch(err => console.error("error creating todo", err));
});

input.addEventListener("keydown", async(event) => {
  if(event.key === "Enter") {
    event.preventDefault();
    saveBtn.click();
  }
});



const editTodo = async (id) => {
  const todo = todoList.find (t => t.id === id);
  if(!todo) return

  const newText = prompt ("Edit task", todo.text)
  const trimmed = newText?.trim();
  if (!trimmed || trimmed === todo.text) return alert("no changes made or empty text");

  await updateTodo(id, {text: trimmed}).catch(err => console.error("error updating todo", err));
};

const deleteTodo = async (id) => {
  await removeTodo(id).catch(err => console.error("error removing todo", err));
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
    checkbox.addEventListener('change', (e) => updateTodo(t.id, {done: e.target.checked}));
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

(async () => {
  await fetchTodo();
  render();
})();
