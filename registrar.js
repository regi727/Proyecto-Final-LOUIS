
// codigo Registrar ***********************************
let userForm = document.getElementById("userForm");
userForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("email").value;
    let contrasena = document.getElementById("password").value;
    let repitPass = document.getElementById("repitPass").value;

    let usuario = {
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
        repitPass: repitPass,

    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (nombre != "" || correo != "" || contrasena != "" || repitPass != "") {

        if (repitPass === contrasena) {

            let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (regexEmail.test(correo)) {

                // Guardar en LocalStorage
                usuarios.push(usuario);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                console.log(usuario)
                document.getElementById("userForm").reset();

                Swal.fire({
                    icon: 'success',
                    title: 'Registro correcto',
                    text: 'Gracias por registrarte'
                });
                window.location.href = "login.html";

            } else {
                document.getElementById("mensaje").textContent = "Por favor ingrese un email valido.";
            }
        } else {
            document.getElementById("mensaje").textContent = "Las contraseñas no coinciden.";
        }
    } else {
        document.getElementById("mensaje").textContent = "Por favor rellene todo los campos.";
    }
});
// Fin codigo Registrar ***********************************


// codigo iniciar sesion ***********************************
let userLogin = document.getElementById("userLogin");
userLogin?.addEventListener("submit", function (e) {
    e.preventDefault();
    login();
});

function login() {

    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuario = usuarios.find(user => user.correo === email);

    if (usuario && usuario.contrasena === password) {

        Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: 'Bienvenido'
        });
      
        window.location.href = "index.html";
    } else {
        document.getElementById("mensaje").textContent = "Correo o/y contraseña incorrectos.";
    }
}
// Fin codigo iniciar sesion  ***********************************



// codigo formulario subscribe ***********************************
let subscribeForm = document.getElementById("subscribe-form");

subscribeForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("email-subscribe").value;
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email != "") {
        document.getElementById("message").style = "display: none"
        if (regexEmail.test(email)) {
            Swal.fire({
                icon: 'success',
                title: 'Gracias por subscribirse ',
                text: 'Puede cancelar su suscripción en cualquier momento.'
            });
            document.getElementById("message").style = "display: none"
        } else {
            document.getElementById("message").textContent = "Por favor ingrese un email valido.";
            document.getElementById("message").style = "display: block ; color: white; font-size: 18px;"
        }
    } else {
        document.getElementById("message").textContent = "Por favor el campo email es obligatorio.";
    }
    email = document.getElementById("email-subscribe").value = "";
});

// Fin codigo formulario subscribe***********************************


// codigo formulario buscador ***********************************
const productos = [
    {nombre: 'Audio',precio: 120},
    {nombre: 'Smartphone',precio: 150},
    {nombre: 'Electro-domesticos',precio: 90},
    {nombre: 'Notebook nuevo',precio: 200},
]

let formularioBuscar = document.querySelector('#formularioBuscar')
let botonFormulario = document.querySelector('#boton-formulario')
let resultado = document.querySelector('#resultado')
let buscadorProducto= document.querySelector('#buscadorProducto')


buscadorProducto?.addEventListener("submit", function (e) {
    e.preventDefault();
    buscarProducto();
});

function buscarProducto() {
    resultado.innerHTML = '';

    let texto = formularioBuscar.value;
    for(let producto of productos){
        let nombre = producto.nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            resultado.innerHTML += `
             <li>${producto.nombre} - precio: ${producto.precio}</li>
            `
        }
    }
    if (resultado.innerHTML === '') {
        resultado.innerHTML += `
         <li>Producto no encontrado.</li>
        ` 
    } 
}

// fin codigo formulario buscador ***********************************





