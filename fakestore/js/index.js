const obtenerProductos = async () => {
    try {
        let response = await fetch("https://fakestoreapi.com/products")
        let json = await response.json()

        json.map(producto => {
            listarItems(producto)
        })

    } catch (error) {
        console.error("Error buscando los datos en la api: ", error)
    }
}

obtenerProductos()

// Función para obtener los items del localStorage
const obtenerItemsLocalStorage = () => {
    const itemsLocalStorage = localStorage.getItem('items');
    return itemsLocalStorage ? JSON.parse(itemsLocalStorage) : [];
};

// Función para guardar los items en el localStorage
const guardarItemsLocalStorage = (item) => {
    localStorage.setItem('items', JSON.stringify(item));
};

// Función para obtener los items del Carrito del localStorage
const obtenerItemsCarritoLocalStorage = () => {
    const itemsLocalStorage = localStorage.getItem('carrito');
    return itemsLocalStorage ? JSON.parse(itemsLocalStorage) : [];
};

// Función para guardar los items del Carrito en el localStorage
const guardarItemsCarritoLocalStorage = (item) => {
    localStorage.setItem('carrito', JSON.stringify(item));
};

// Función asíncrona para agregar un nuevo item usando un prompt de HTML
const CrearItem = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del item
        const nombre = prompt("Ingrese el nombre del item:");
        const precio = parseInt(prompt("Ingrese un precio:"));
        const descripcion = prompt("Ingrese una descripcion:");

        // Obtener los items del localStorage
        let items = obtenerItemsLocalStorage();

        // Verificar si el item ya existe 
        const itemExistente = items.find(item => item.nombre === nombre);
        if (itemExistente) {
            alert('Un item con este nombre ya está cargado.');
            throw new Error('Un item con este nombre ya está cargado.');

        } else if (nombre === "") {
            alert('El nombre no puede estar vacio');
            throw new Error('no pusite el nombre.');
        }
        items.push({ nombre, precio, descripcion });
        // Guardar los items actualizados en el localStorage
        guardarItemsLocalStorage(items);

        listarItems()

    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Función asíncrona para listar todos los items
const mostrarInfoProducto = async (item) => {

    // Creamos el contenido HTML con el producto
    let innerHTMLProducto = `
        <div class="rounded border-gray-300 border p-8 font-bold drop-shadow-lg text-2xl min-w-44">
            <p class="font-semibold text-5xl border-b">
            ${item.title}
            </p>
            <p class="font-bold text-green-600 text-right my-4">
            $ ${item.price}
            </p>
            <p class="font-thin my-4">
            - ${item.description}
            </p>
            <button 
            onclick="guardarItemsCarritoLocalStorage(${itemString})"
            class="w-full font-semibold hover:bg-emerald-500 border border-emerald-500 p-2 mt-4 rounded transform hover:scale-110">
            Agregar al carrito
            </button>
            <button 
            onclick="mostrarInfoProducto(${itemString})"
            class="w-full font-semibold hover:bg-emerald-500 border border-emerald-500 p-2 mt-4 rounded transform hover:scale-110">
            Ver info
            </button>
        </div>        
    `;


    let contenedor = document.getElementById("contenedorItems")

    let tarjeta = document.createElement("div")

    tarjeta.innerHTML = innerHTMLProducto

    contenedor.appendChild(tarjeta)
};


const listarItems = async (item) => {

    const itemString = JSON.stringify(item).replace(/'/g, "\\'").replace(/"/g, '&quot;')

    let innerHTMLProducto = `
    <div class="w-full flex px-4 bg-white border border-gray-200 rounded-lg shadow">
    
        <button onclick="guardarItemsCarritoLocalStorage(${itemString})" class="flex justify-center"    >
            <img class="rounded-t-lg w-full w-auto h-56 p-4 hover:scale-105" src="${item.image}" alt="" />
        </button>
        
        <div class="p-5 w-full">
        
            <button onclick="guardarItemsCarritoLocalStorage(${itemString})">
                <h5 class="mb-2 text-3xl font-medium tracking-tight text-gray-900">${item.title.slice(0, 25)}...</h5>
            </button>
            
            <p class="mb-3 font-thin text-black">${item.description.slice(0, 75)}...</p>
            
            <div class="flex justify-end">
                <p class="mb-3 text-2xl font-bold text-emerald-500">$ ${item.price}</p>                
            </div>
            
        </div>

    </div>
    `

    let contenedor = document.getElementById("contenedorItems")

    let tarjeta = document.createElement("div")
    
    tarjeta.style.width = "w-full "

    tarjeta.innerHTML = innerHTMLProducto

    contenedor.appendChild(tarjeta)
};

// Función asíncrona para listar todos los items en el carrito
const listarItemsCarrito = async () => {
    let items = obtenerItemsCarritoLocalStorage()
    let contenedor = document.getElementById("contenedorItems")

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }

    for (let x = 0; x < items.length; x++) {
        let tarjeta = document.createElement("div")
        tarjeta.classList = "rounded border p-8 font-bold drop-shadow-lg text-2xl min-w-44 transform hover:scale-105"

        let nombre = document.createElement("p")
        nombre.innerText = items[x].nombre
        nombre.classList = "font-semibold border-b"

        let precio = document.createElement("p")
        precio.innerText = "$ " + items[x].precio
        precio.classList = "font-semibold"

        let descripcion = document.createElement("p")
        descripcion.innerText = items[x].descripcion
        descripcion.classList = "font-semibold"

        let botonDelete = document.createElement("button")
        botonDelete.innerText = "Quitar del carrito"
        botonAgregar.classList = "w-full font-semibold hover:bg-red-500 border border-red-500 p-2 mt-4 rounded transform hover:scale-110"

        botonDelete.addEventListener("click", function () {
            BorrarItem(items[x].nombre)
        })

        tarjeta.appendChild(nombre)
        tarjeta.appendChild(descripcion)
        tarjeta.appendChild(precio)
        tarjeta.appendChild(botonDelete)

        contenedor.appendChild(tarjeta)

        console.log("q dice el lemo este")
    }
};

// Función asíncrona para borrar un item del carrito
const BorrarItem = async (nombreItem) => {

    let items = obtenerItemsCarritoLocalStorage()

    const item = items.find(item => item.nombre === nombreItem)

    if (item) {
        items.pop(item);
        guardarItemsLocalStorage(items)
        alert('Item eliminado correctamente.');
        listarItems()
    } else {
        alert('Hubo un problema borrando el item.');
    }
};

listarItems()
