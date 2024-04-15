const tareaInput = document.getElementById("tareaInput");
const botonAgregarTarea = document.getElementById("botonagregartarea");
const listaTareas = document.getElementById("listatareas");



  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.forEach((tarea) => {
    const nuevaTarea = document.createElement("li");
    nuevaTarea.innerHTML = `<i class="fa-regular fa-square"></i>
    <h4>${tarea}</h4>
    <i class="fa-solid fa-circle-xmark"></i>`;
    listaTareas.appendChild(nuevaTarea);
  });

function agregarTarea() {
  const tareaEscrita = tareaInput.value;
  const nuevaTarea = document.createElement("li");
  nuevaTarea.innerHTML = `<i class="fa-regular fa-square"></i>
    <h4>${tareaEscrita}</h4>
    <i class="fa-solid fa-circle-xmark"></i>`;
  listaTareas.appendChild(nuevaTarea);
  tareaInput.value = "";

  
  const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
  tareas.push(tareaEscrita);
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

botonAgregarTarea.addEventListener("click", agregarTarea);

tareaInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    agregarTarea();
  }
});

function tarealista(event) {
  if (event.target.classList.contains("fa-square")) {
    event.target.classList.remove("fa-square");
    event.target.classList.add("fa-check-square");
  } else if (event.target.classList.contains("fa-check-square")) {
    event.target.classList.remove("fa-check-square");
    event.target.classList.add("fa-square");
  }
}

listaTareas.addEventListener("click", tarealista);

function eliminarTarea(event) {
  if (event.target.classList.contains("fa-circle-xmark")) {
    event.target.parentElement.remove(); 
  }

  
  const tareas = Array.from(listaTareas.children).map(
    (tarea) => tarea.querySelector("h4").textContent
  );
  localStorage.setItem("tareas", JSON.stringify(tareas));
}


listaTareas.addEventListener("click", eliminarTarea);
