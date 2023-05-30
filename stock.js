// Referencias a los elementos HTML relevantes
const tablaInventario = document.querySelector('#inventario table tbody');
const btnAgregarProducto = document.querySelector('#btnAgregarProducto');
const modalAgregarProducto = document.querySelector('#modalAgregarProducto');
const btnCerrarModal = document.querySelector('.close');
const formAgregarProducto = document.querySelector('#modalAgregarProducto form');
const inputNombreProducto = document.querySelector('#nombreProducto');
const inputCantidadProducto = document.querySelector('#cantidadProducto');
const inputPrecioProducto = document.querySelector('#precioProducto');

// Array para almacenar los productos del inventario
let inventario = [];

// Función para agregar un producto al inventario
function agregarProducto(nombre, cantidad, precio) {
  // Crea un objeto producto con las propiedades dadas
  const producto = {
    nombre,
    cantidad,
    precio
  };

  // Agrega el producto al inventario
  inventario.push(producto);

  // Guarda el inventario en localStorage
  guardarInventario();
}

// Función para mostrar los productos del inventario en la tabla
function mostrarInventario() {
  // Limpia la tabla
  tablaInventario.innerHTML = '';

  // Agrega cada producto del inventario a la tabla
  inventario.forEach((producto, index) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>${producto.precio.toFixed(2)}</td>
      <td>
        <button onclick="editarProducto(${index})">Editar</button>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </td>
    `;
    tablaInventario.appendChild(fila);
  });

  // Guarda el inventario en localStorage
  guardarInventario();
}

// Función para editar un producto del inventario
function editarProducto(index) {
  // Obtiene el producto correspondiente al índice dado
  const producto = inventario[index];

  // Actualiza el formulario con los valores del producto
  inputNombreProducto.value = producto.nombre;
  inputCantidadProducto.value = producto.cantidad;
  inputPrecioProducto.value = producto.precio;

  // Remueve el producto del inventario
  inventario.splice(index, 1);

  // Actualiza la tabla del inventario
  mostrarInventario();

  // Muestra el modal para agregar un producto
  modalAgregarProducto.style.display = 'block';
}

// Función para eliminar un producto del inventario
function eliminarProducto(index) {
  // Remueve el producto del inventario
  inventario.splice(index, 1);

  // Actualiza la tabla del inventario
  mostrarInventario();
}

// Función para guardar el inventario en localStorage
function guardarInventario() {
  localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Función para obtener el inventario desde localStorage
function obtenerInventario() {
  const inventarioGuardado = localStorage.getItem('inventario');
  if (inventarioGuardado) {
    inventario = JSON.parse(inventarioGuardado);
  }
}

// Agregar un producto cuando el usuario envía el formulario
formAgregarProducto.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtiene los valores del formulario
  const nombre = inputNombreProducto.value;
  const cantidad = parseInt(inputCantidadProducto.value);
  const precio = parseFloat(inputPrecioProducto.value);

  // Agrega el producto al inventario
  agregarProducto(nombre, cantidad, precio);

  // Limpia los valores del formulario
  inputNombreProducto.value = '';
  inputCantidadProducto.value = 1;
  inputPrecioProducto.value = '';

  // Cierra el modal
  modalAgregarProducto.style.display = 'none';

  // Actualiza la tabla del inventario
  mostrarInventario();
});

// Mostrar el modal para agregar un producto cuando se hace clic en el botón correspondiente
btnAgregarProducto.addEventListener('click', () => {
  modalAgregarProducto.style.display = 'block';
});

// Cerrar el modal cuando se hace clic en la 'x'
btnCerrarModal.addEventListener('click', () => {
  modalAgregarProducto.style.display = 'none';
});

// Cerrar el modal cuando se hace clic fuera del mismo
window.addEventListener('click', (event) => {
  if (event.target === modalAgregarProducto) {
    modalAgregarProducto.style.display = 'none';
  }
});

// Obtener el inventario desde localStorage al cargar la página
window.addEventListener('load', () => {
  obtenerInventario();
  mostrarInventario();
});
