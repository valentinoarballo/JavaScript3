let tareas = []
const AgregarTarea = (titulo, descripcion, fecha, hora) => {
  tareas.push(
    {
      id: tareas.length + 1,
      titulo: titulo,
      descripcion: descripcion,
      fecha: fecha,
      hora: hora,
      completado: false,
      visible: true,
    }
  )
  localStorage.setItem("tareas" , JSON.stringify(tareas))
  render()
}

const CompletarTarea = (id) => {
  id = id - 1
  tareas[id].completado = (!tareas[id].completado)
  render()
}

const EliminarTarea = (id) => {
  id = id - 1
  tareas[id].visible = false
  render()
}

const render = () => {
  let tareasHtml = document.getElementById("contenedor")
  while (tareasHtml.firstChild) {
    tareasHtml.removeChild(tareasHtml.firstChild);
  }

  for (let x = 0; x < tareas.length; x++) {
    if (tareas[x].visible) {
      let card = document.createElement("div")
      let titulo = document.createElement("p")
      titulo.className = "titulo"
      let desc = document.createElement("p")
      desc.className = "desc"
      let fecha = document.createElement("p")
      fecha.className = "fecha"
      let hora = document.createElement("p")
      hora.className = "hora"
      let eliminar = document.createElement("button")
      let completar = document.createElement("button")

      eliminar.id = `eliminar-tarea-${tareas[x].id}`
      completar.id = `completar-tarea-${tareas[x].id}`

      titulo.innerText = tareas[x].titulo
      fecha.innerText = tareas[x].fecha
      hora.innerText = tareas[x].hora
      desc.innerText = tareas[x].descripcion
      eliminar.innerText = "eliminar"
      completar.innerText = "completar"

      card.appendChild(titulo)
      card.appendChild(desc)
      card.appendChild(fecha)
      card.appendChild(hora)
      card.appendChild(eliminar)
      card.appendChild(completar)

      eliminar.addEventListener("click", function (e) {
        e.preventDefault();
        EliminarTarea(tareas[x].id)
      });

      completar.addEventListener("click", function (e) {
        e.preventDefault();
        CompletarTarea(tareas[x].id)
      });

      console.log(tareas[x].completado)
      tareas[x].completado ? card.className = "incompleta tarjeta" : card.className = "completada tarjeta"

      contenedor.appendChild(card)
    }
  }

}



document.getElementById("formularioCarga").addEventListener("submit", function (e) {
  e.preventDefault();
  titulo = e.target.titulo.value
  descripcion = e.target.descripcion.value
  fecha = e.target.fecha.value
  hora = e.target.hora.value

  AgregarTarea(
    titulo = titulo,
    descripcion = descripcion,
    fecha = fecha,
    hora = hora
  )
});

const contenedor = document.getElementById("contenedor")

console.log(tareas)