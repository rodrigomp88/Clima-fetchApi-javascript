const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios");

    return;
  }
  // Consultar la API
  consultarApi(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    // Crear una alerta
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-600",
      "border-red-400",
      "text-white-900",
      "px-4",
      "py-3",
      "roundede",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <strong class="block">${mensaje}</strong>
  `;
    container.appendChild(alerta);

    // Tiempo de la alerta
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarApi(ciudad, pais) {
  const appId = "3cdc8cf7ae42e60360dfae070dfff821";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  Spinner(); // Muestra el spinner de carga

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      //Limpiar el HTML previo
      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      // Impirmir la respuesta en el HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinACentgrados(temp);
  const max = kelvinACentgrados(temp_max);
  const min = kelvinACentgrados(temp_min);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en: ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Maxima: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Minima: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

// function kelvinACentgrados(grados) {
//   return parseInt(grados - 273.15);
// }
// Esto es para las funciones que son de una linea para acortar codigo
const kelvinACentgrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  limpiarHTML();
  const divSpiner = document.createElement("div");
  divSpiner.classList.add("sk-fading-circle");
  divSpiner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
  `;

  resultado.appendChild(divSpiner);
}
