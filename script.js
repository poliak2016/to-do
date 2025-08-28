const textForm = document.getElementById("text-form");
const saveBtn = document.getElementById("save");
const output = document.getElementById("output");

saveBtn.addEventListener('click', () => {
  const text = textForm.value.trim();

  if(!text) {
    return alert("enter any text");
  }

  const li = document.createElement("li");
  li.textContent = text;
  output.appendChild(li)
});

