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

const API_KEY = 'cc94b09c908a4217a7c202211240605'; // Tu clave de API de WeatherAPI

function obtenerClima(latitud, longitud) {
  return new Promise((resolve, reject) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitud},${longitud}&lang=es`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el clima');
        }
        return response.json();
      })
      .then(data => {
        const temperatura = data.current.temp_c;
        const descripcion = data.current.condition.text;
        const iconoURL = 'https:' + data.current.condition.icon;

        const clima = {
          temperatura: temperatura,
          descripcion: descripcion,
          iconoURL: iconoURL
        };

        resolve(clima);
      })
      .catch(error => {
        reject(error);
      });
  });
}

async function actualizarClima() {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        const clima = await obtenerClima(latitud, longitud);
        console.log(clima);
        document.getElementById('temperatura').textContent = `Temperatura: ${clima.temperatura}°C`;
        document.getElementById('descripcion').textContent = `Descripción: ${clima.descripcion}`;
        document.getElementById('icono').src = clima.iconoURL;
      });
    } else {
      console.error('Geolocalización no está disponible en este navegador');
    }
  } catch (error) {
    console.error('Error al obtener el clima:', error);
  }
}

actualizarClima();

