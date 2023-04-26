// Array para almacenar los productos del inventario
let inventario = [];

// Referencias a los elementos HTML relevantes
const tablaInventario = document.querySelector('#inventario table tbody');
const btnAgregarProducto = document.querySelector('#btnAgregarProducto');
const modalAgregarProducto = document.querySelector('#modalAgregarProducto');
const btnCerrarModal = document.querySelector('.close');
const formAgregarProducto = document.querySelector('#modalAgregarProducto form');
const inputNombreProducto = document.querySelector('#nombreProducto');
const inputCantidadProducto = document.querySelector('#cantidadProducto');
const inputPrecioProducto = document.querySelector('#precioProducto');

// Función para agregar un producto al inventario
function agregarProducto(nombre, cantidad, precio) {
  // Crea un objeto producto con las propiedades dadas
  const producto = {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio
  };

  // Agrega el producto al inventario
  inventario.push(producto);
}

// Función para mostrar los productos del inventario en la tabla
function mostrarInventario() {
  // Limpia la tabla
  tablaInventario.innerHTML = '';

  // Agrega cada producto del inventario a la tabla
  inventario.forEach(function(producto) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>${producto.precio.toFixed(2)}</td>
      <td>
        <button class="btn-editar">Editar</button>
        <button class="btn-eliminar">Eliminar</button>
      </td>
    `;
    tablaInventario.appendChild(fila);
  });

  // Agrega los event listeners para los botones de editar y eliminar
  const btnEditar = document.querySelectorAll('.btn-editar');
  btnEditar.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // TODO: Agregar lógica para editar el producto
      console.log('Editar producto');
    });
  });

  const btnEliminar = document.querySelectorAll('.btn-eliminar');
  btnEliminar.forEach(function(btn) {
    btn.addEventListener('click', function() {
      // TODO: Agregar lógica para eliminar el producto
      console.log('Eliminar producto');
    });
  });
}

// Agregar un producto cuando el usuario envía el formulario
formAgregarProducto.addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Obtiene los valores del formulario
  const nombre = inputNombreProducto.value;
  const cantidad = parseInt(inputCantidadProducto.value);
  const precio = parseFloat(inputPrecioProducto.value);

  // Agrega el producto al inventario
  agregarProducto(nombre, cantidad, precio);

  // Actualiza la tabla del inventario
  mostrarInventario();

  // Cierra el modal
  modalAgregarProducto.style.display = 'none';
});

// Mostrar el modal para agregar un producto cuando el usuario hace clic en el botón correspondiente
btnAgregarProducto.addEventListener('click', function() {
  modalAgregarProducto.style.display = 'block';
});

// Cerrar el modal cuando el usuario hace clic en el botón de cerrar o fuera del modal
btnCerrarModal.addEventListener('click', function() {
  modalAgregarProducto.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target == modalAgregarProducto) {
    modalAgregarProducto.style.display = 'none';
  }
});

// Inicializa la tabla del inventario al cargar la página
mostrarInventario();
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

// Función para agregar un producto al inventario
function agregarProducto(nombre, cantidad, precio) {
  // Crea un objeto producto con las propiedades dadas
  const producto = {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio
  };

  // Agrega el producto al inventario
  inventario.push(producto);
}

// Función para mostrar los productos del inventario en la tabla
function mostrarInventario() {
  // Limpia la tabla
  tablaInventario.innerHTML = '';

  // Agrega cada producto del inventario a la tabla
  inventario.forEach(function(producto, index) {
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
}
