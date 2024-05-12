// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
  const jugadoresString = localStorage.getItem('jugadores');
  return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
  localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
  try {
    // Solicitar al usuario que ingrese los datos del jugador
    const nombre = prompt("Ingrese el nombre del jugador:");
    const edad = parseInt(prompt("Ingrese la edad del jugador:"));
    const posicion = prompt("Ingrese la posición del jugador:");

    // Obtener los jugadores del localStorage
    let jugadores = obtenerJugadoresLocalStorage();

    // Verificar si el jugador ya existe en el equipo
    const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
    if (jugadorExistente) {
      alert('El jugador ya está en el equipo.');
      throw new Error('El jugador ya está en el equipo.');

    } else if (nombre === "") {
      alert('no pusite el nombre');
      throw new Error('no pusite el nombre.');
    }

      jugadores.push({ nombre, edad, posicion });

      // Guardar los jugadores actualizados en el localStorage
      guardarJugadoresLocalStorage(jugadores);

      // Simular una demora de 1 segundo para la operación asíncrona
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mostrar un mensaje de éxito
      alert('Jugador agregado correctamente.');
      listarJugadores()

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Función asíncrona para listar todos los jugadores del equipo
  const listarJugadores = async () => {
    let jugadores = obtenerJugadoresLocalStorage()
    let contenedor = document.getElementById("contenedorJugadores")

    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild)
    }

    for (let x = 0; x < jugadores.length; x++) {

      let tarjeta = document.createElement("div")
      tarjeta.classList = "rounded p-8 font-bold drop-shadow-lg text-2xl min-w-44 transform hover:scale-105"
      tarjeta.style.backgroundImage = "url('https://img.freepik.com/vector-gratis/fondo-futbol-degradado-dinamico_23-2149007789.jpg')"
      tarjeta.style.backgroundSize = "cover"
      tarjeta.style.backgroundPosition = "center"

      let nombre = document.createElement("p")
      nombre.innerText = jugadores[x].nombre
      nombre.classList = "font-semibold border-b"

      let edad = document.createElement("p")
      edad.innerText = jugadores[x].edad + " años"
      edad.classList = "font-semibold"

      let posicion = document.createElement("p")
      posicion.innerText = jugadores[x].posicion
      posicion.classList = "font-semibold"


      let boton = document.createElement("button")
      boton.innerText = "Cambiar posicion"
      boton.classList = "font-semibold bg-blue-950 p-2 mt-4 rounded"

      boton.addEventListener("click", function () {
        asignarPosicion(jugadores[x].nombre)
      })

      tarjeta.appendChild(nombre)
      tarjeta.appendChild(posicion)
      tarjeta.appendChild(edad)
      tarjeta.appendChild(boton)

      contenedor.appendChild(tarjeta)
    }
  };

  // Función asíncrona para asignar una nueva posición a un jugador
  const asignarPosicion = async (nombreJugador) => {
    const nuevaPosicion = prompt("Nueva posición")

    let jugadores = obtenerJugadoresLocalStorage()

    const jugador = jugadores.find(jugador => jugador.nombre === nombreJugador)

    if (jugador) {
      jugador.posicion = nuevaPosicion;
      guardarJugadoresLocalStorage(jugadores)
      alert('Jugador editado correctamente.');
      listarJugadores()
    } else {
      alert('Hubo un problema editando el jugador.');
    }
  };

  // Función asíncrona para realizar un cambio durante un partido
  const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    // Implementación para realizar un cambio durante un partido
  };

  // Función principal asíncrona que interactúa con el usuario
  const main = async () => {
    try {
      // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Llamar a la función principal para iniciar la aplicación
  main();
