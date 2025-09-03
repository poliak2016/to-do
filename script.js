const textForm = document.getElementById("text-form");
const saveBtn = document.getElementById("save");
const output = document.getElementById("output");

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

  for(t of todoList) {
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

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    output.appendChild(li);
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
});

load();
render();
