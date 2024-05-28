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
    console.log(item)
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
const mostrarInfoProducto = (item) => {

    // Obtener el número de estrellas llenas basado en el rating
    const fullStars = Math.round(item.rating.rate);

    const filledStar = `
        <svg width="16" height="16" fill="currentColor" class="bi text-yellow-500 bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    `;
    const emptyStar = `
        <svg width="16" height="16" fill="currentColor" class="bi text-yellow-500 bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>
    `;

    let starsHTML = '<div class="flex items-center">';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += filledStar;
    }
    for (let i = fullStars; i < 5; i++) {
        starsHTML += emptyStar;
    }
    starsHTML += ` <span class="text-gray-500 ml-2">(${item.rating.count} reviews)</span></div>`;

    let innerHTMLProducto = `
    <div class="w-full h-full flex px-4 bg-white border border-gray-200 rounded-lg shadow">
        <div class="flex justify-center">
            <img class="rounded-t-lg w-[750px] h-auto object-contain p-4" src="${item.image}" alt="imagen de ${item.title}" />
        </div>
        <div class="p-5 w-full">
            <h5 class="mb-2 text-3xl font-bold tracking-tight text-gray-900">${item.title}</h5>
            <p class="mb-3 font-medium text-lg text-black">${item.description}</p>
            <hr class="my-2"/>
            <div class="flex">
                <p class="mb-3 text-3xl font-black text-emerald-500">$ ${item.price}</p>                
            </div>
            <p class="text-yellow-500">${starsHTML}</p>
            <p class="mb-3 font-medium text-lg text-black mt-6">Categorias</p>
            <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">${item.category}</span>
            <div class="w-full flex justify-center mt-20">
                <button class="w-3/4 p-4 text-xl font-bold text-white rounded flex justify-center items-center bg-yellow-400 hover:bg-yellow-500">
                    Agregar al carrito
                </button>
            </div>
        </div>
    </div>
`;


    let contenedor = document.getElementById("contenedorItems");
    contenedor.innerHTML = innerHTMLProducto;
};


const listarItems = async (item) => {

    const itemString = JSON.stringify(item).replace(/'/g, "\\'").replace(/"/g, '&quot;');

    // Obtener el número de estrellas llenas basado en el rating
    const fullStars = Math.round(item.rating.rate);

    const filledStar = `
        <svg width="16" height="16" fill="currentColor" class="bi text-yellow-500 bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
    `;
    const emptyStar = `
        <svg width="16" height="16" fill="currentColor" class="bi text-yellow-500 bi-star" viewBox="0 0 16 16">
            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
        </svg>
    `;

    let starsHTML = '<div class="flex items-center">';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += filledStar;
    }
    for (let i = fullStars; i < 5; i++) {
        starsHTML += emptyStar;
    }
    starsHTML += ` <span class="text-gray-500 ml-2">(${item.rating.count} reviews)</span></div>`;

    let innerHTMLProducto = `
    <div class="w-full flex px-6 bg-white border border-gray-200 rounded-lg shadow">
        <button onclick="mostrarInfoProducto(${itemString})" class="flex justify-center">
            <img class="rounded-t-lg w-56 h-auto max-h-56 object-contain p-4 hover:scale-105" src="${item.image}" alt="imagen de ${item.title}" />
        </button>
        <div class="p-5 mx-10 w-full">
            <button onclick="mostrarInfoProducto(${itemString})">
                <h5 class="mb-2 text-3xl font-medium tracking-tight text-gray-900">${item.title.slice(0, 33)}...</h5>
            </button>
            <p class="mb-3 font-thin text-black">${item.description.slice(0, 100)}...</p>
            <div class="flex ">
                <p class="mb-3 text-2xl font-bold text-emerald-500">$ ${item.price}</p>                
            </div>
            <p class="mb-3 text-yellow-500">${starsHTML}</p>
            <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">${item.category}</span>
        </div>
    </div>
    `;

    let contenedor = document.getElementById("contenedorItems");

    let tarjeta = document.createElement("div");
    tarjeta.style.width = "w-full";
    tarjeta.innerHTML = innerHTMLProducto;

    contenedor.appendChild(tarjeta);
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
