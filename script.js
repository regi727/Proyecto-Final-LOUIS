
// Variables
let contenedorCesta = document.querySelector('.add-product');
let cestaDetalle = document.querySelector('.cestaDetalle');
let botonEliminar = document.querySelector('.borrarProd');
let total = document.querySelector('.precioTotal');
let aumentarCarrito = document.querySelector('.contador-producto');
let btnComprar = document.querySelector('.btn-comprar');

btnComprar.disabled = true;

// contenedor principal de los productos
const contenedorProducto = document.querySelector('.contenedor-productos')

let todosProductos = [];
let precioTotalProd = 0;
let contadorProd = 0;

//Script cerrar y abrir carrito
document.addEventListener("DOMContentLoaded", function () {
    let cestaIcono = document.querySelector("#icono-cesta");
    let cesta = document.querySelector(".contenedorCesta");
    let cerrarCarrito = document.querySelector("#cerrarCarrito");

    cerrarCarrito.addEventListener("click", function () {
        cesta.classList.remove("active");
    });
    cestaIcono.addEventListener("click", function () {
        cesta.classList.add("active");
    });
});
//Fin Script  cerrar y abrir carrito

contenedorProducto.addEventListener('click', e => {
    if (e.target.classList.contains('add-carrito')) {
        const producto = e.target.parentElement

        const infoProductos = {
            titulo: producto.querySelector('.titulo-prod').textContent,
            precio: producto.querySelector('.precio-p').textContent,
            id: producto.querySelector('button').getAttribute('btn-id'),
            img: producto.querySelector('.img-prod').src,
            cantidad: 1
        }
        // Precio total de producto
        precioTotalProd = parseFloat(precioTotalProd) + parseFloat(infoProductos.precio);
        precioTotalProd = precioTotalProd.toFixed(2)
        //Fin Precio total de producto

        // Cambiar la cantidad de producto
        const productoExiste = todosProductos.some(producto => producto.id === infoProductos.id);

        if (productoExiste) {
            const prod = todosProductos.map(producto => {
                if (producto.id === infoProductos.id) {
                    producto.cantidad++;
                    return producto;
                } else {
                    return producto;
                }
            });
            todosProductos = [...prod]
        } else {
            todosProductos = [...todosProductos, infoProductos]
            contadorProd++;
        }
        btnComprar.disabled = false;
        mostrarHTML();
       
        // fin cambiar la cantidad de producto
    }
    
});

//Eliminar productos
contenedorCesta.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash')) {
        const idProducto = e.target.getAttribute('btn-id')

        //Diminuar el precio total cuando se eliminar un producto
        todosProductos.forEach(value => {
            if (value.id == idProducto) {
                let diminuarPrecio = parseFloat(value.precio) * parseFloat(value.cantidad);
                precioTotalProd = precioTotalProd - diminuarPrecio;
                precioTotalProd = precioTotalProd.toFixed(2);
            }
        });
        //Fin diminuar el precio total cuando se elimina un producto

        //Resetear el precio total cuando se elimina todos los productos
        let resetTotal = document.querySelector('.precioTotal')
        resetTotal.textContent = precioTotalProd;
        //Fin Resetear el precio total cuando se elimina todos los productos


        todosProductos = todosProductos.filter(product => product.id !== idProducto);

        contadorProd--;
    }
    mostrarHTML();
});
//Fin eliminar productos

//Cargar HTML
const mostrarHTML = () => {
    limpiarHTML();

    todosProductos.forEach(producto => {
        const { img, titulo, precio, cantidad, id } = producto
        const cajaProductos = document.createElement('div')
        cajaProductos.classList.add('cestaDetalle')

        cajaProductos.innerHTML = `
        <div class="cestaDetalle">
            <div class="caja-cesta" id="cajaCesta">
                    <img src="${img}" class="cart-img" alt="">
                <div class="detalle-box">
                    <p class="productoTitulo">${titulo}</p>
                    <b class="productoPrecio"><h5>Precio : CLP ${precio}</h5></b>
                    <h6>Cantidad : ${cantidad}</h6>
                </div>
                <i class="fa-solid fa-trash" btn-id="${id}"></i>
            </div> 
        </div> `
        contenedorCesta.append(cajaProductos);
        //Mostrar el total
        total.innerHTML = precioTotalProd;
        aumentarCarrito.innerHTML = contadorProd;
    });
}
//Fin Cargar HTML

//Funccion limpiar html
function limpiarHTML() {
    contenedorCesta.innerHTML = ""
}
//Fin Funccion limpiar html











