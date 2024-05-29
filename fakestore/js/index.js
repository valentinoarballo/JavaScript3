// Función para obtener los items de la API
const obtenerProductos = async () => {
    try {
        let response = await fetch("https://fakestoreapi.com/products")
        let json = await response.json()


        listarItems(json)

    } catch (error) {
        console.error("Error buscando los datos en la api: ", error)
    }
}

const obtenerCategorias = async () => {
    try {
        let response = await fetch("https://fakestoreapi.com/products/categories")
        let json = await response.json()


        listarCategorias(json)

    } catch (error) {
        console.error("Error buscando los datos en la api: ", error)
    }
}


// Función para obtener los items del Carrito del localStorage
const obtenerItemsCarritoLocalStorage = () => {
    const itemsLocalStorage = localStorage.getItem('carrito');
    let itemsCarrito;
    try {
        itemsCarrito = JSON.parse(itemsLocalStorage) || [];
    } catch (error) {
        itemsCarrito = [];
    }
    return Array.isArray(itemsCarrito) ? itemsCarrito : [];
};

// Función para guardar los items del Carrito en el localStorage
const guardarItemsCarritoLocalStorage = (items) => {
    localStorage.setItem('carrito', JSON.stringify(items));
    itemAgregadoAlCarrito();
};

// Función para actualizar la notificación del carrito
const itemAgregadoAlCarrito = () => {
    let carrito = document.getElementById("carritoSideBar");
    let items = obtenerItemsCarritoLocalStorage();
    let cantidadItems = items.length;

    let carritoNotificacion = `
    <span
        class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ">
        ${cantidadItems}
    </span>
    `;

    let notificacionExistente = carrito.querySelector('.carrito-notificacion');
    if (notificacionExistente) {
        notificacionExistente.innerHTML = carritoNotificacion;
    } else {
        let nuevaNotificacion = document.createElement('span');
        nuevaNotificacion.classList.add('carrito-notificacion');
        nuevaNotificacion.innerHTML = carritoNotificacion;
        carrito.appendChild(nuevaNotificacion);
    }

    if (notificacionExistente && cantidadItems == 0) {
        carrito.removeChild(carrito.lastChild)
    }
};

const agregarItemAlCarrito = (nuevoItem) => {
    const itemsCarrito = obtenerItemsCarritoLocalStorage();

    itemsCarrito.push(nuevoItem);

    guardarItemsCarritoLocalStorage(itemsCarrito);
};

// Función asíncrona para listar todos los items
const mostrarInfoProducto = (item) => {
    let titulo = document.getElementById("subtitulo")

    if (titulo.innerText) {
        titulo.innerHTML = `
            <button onclick="obtenerProductos()" class="flex px-4 py-2 items-center aling-middle hover:bg-gray-300 rounded hover:scale-105">
                <svg width="32" height="32" fill="currentColor" class="bi bi-arrow-left pt-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>    
                volver
            </button>
        `
    }

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
                <button onclick="agregarItemAlCarrito(${itemString})" class="w-3/4 p-4 text-xl font-bold text-white rounded flex justify-center items-center bg-yellow-400 hover:bg-yellow-500">
                    Agregar al carrito
                </button>
            </div>
        </div>
    </div>
`;

    let contenedor = document.getElementById("contenedorItems");
    contenedor.innerHTML = innerHTMLProducto;
};

const listarItems = async (items) => {

    let contenedor = document.getElementById("contenedorItems")

    let titulo = document.getElementById("subtitulo")

    if (titulo.innerText) {
        titulo.innerText = "Productos"
    }

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }

    items.map(item => {

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

        let tarjeta = document.createElement("div");
        tarjeta.style.width = "w-full";
        tarjeta.innerHTML = innerHTMLProducto;

        contenedor.appendChild(tarjeta);
    })
};

// Función asíncrona para listar todos los items en el carrito
const listarItemsCarrito = async () => {
    let items = obtenerItemsCarritoLocalStorage()
    let contenedor = document.getElementById("contenedorItems")
    let titulo = document.getElementById("subtitulo")

    if (titulo.innerText) {
        titulo.innerText = "Carrito"
    }

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }

    items.map(item => {

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
                <div class="w-full flex px-4 bg-white border border-gray-200 rounded-lg shadow">
                    <button onclick="mostrarInfoProducto(${itemString})" class="flex justify-center">
                        <img class="rounded-t-lg w-56 h-auto max-h-56 object-contain p-4 hover:scale-105" src="${item.image}" alt="imagen de ${item.title}" />
                    </button>
                    <div class="p-5 mx-5 w-full">
                        <button onclick="mostrarInfoProducto(${itemString})">
                            <h5 class="mb-2 text-3xl text-start flex font-medium tracking-tight text-gray-900">${item.title.slice(0, 33)}...</h5>
                        </button>
                        <p class="mb-3 font-thin text-black">${item.description.slice(0, 100)}...</p>
                        <div class="flex justify-between">
                            <p class="mb-3 text-2xl font-bold text-emerald-500">$ ${item.price}</p>
                            <button onclick="BorrarItem(${itemString})" class="mb-3 text-2xl font-bold text-gray-300 hover:text-gray-500 hover:bg-gray-200 px-2 rounded-lg">X</button>
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
    })
};


const listarCategorias = async (categorias) => {

    let contenedor = document.getElementById("categoriaUl")

    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }

    categorias.map(categoria => {

        const categoriaString = JSON.stringify(categoria).replace(/'/g, "\\'").replace(/"/g, '&quot;');

        let innerHTMLProducto = `
            <li></li>
        `;

        let tarjeta = document.createElement("div");
        tarjeta.style.width = "w-full";
        tarjeta.innerHTML = innerHTMLProducto;

        contenedor.appendChild(tarjeta);
    })
};

const BorrarItem = async (itemBorrar) => {
    let items = obtenerItemsCarritoLocalStorage();

    const itemsSinElEliminado = items.filter(item => item.id !== itemBorrar.id);

    if (items.length !== itemsSinElEliminado.length) {
        guardarItemsCarritoLocalStorage(itemsSinElEliminado);
        alert('Item eliminado correctamente.');
        listarItemsCarrito();
    } else {
        alert('Hubo un problema borrando el item.');
    }
};


obtenerProductos()

