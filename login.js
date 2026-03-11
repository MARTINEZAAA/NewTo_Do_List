// Función que se ejecuta al intentar iniciar sesión
function login(){
    // Obtiene el valor del campo de texto con id "usname" (nombre de usuario)
    const Usname = document.getElementById("usname").value;
    // Obtiene el valor del campo de texto con id "pin" (contraseña)
    const Pin = document.getElementById("pin").value;

    // Realiza una petición HTTP al servidor
    fetch("/login", {
        method: "POST", // Especifica que es una petición de tipo POST
        headers: {
            "Content-Type": "application/json" // Indica que enviaremos datos en formato JSON
        },
        body: JSON.stringify({ // Convierte los datos a formato JSON para enviarlos
            Usname: Usname, // Envía el nombre de usuario
            pin: Pin        // Envía el PIN/contraseña
        })
    })
        .then(res => res.json()) // Convierte la respuesta del servidor a formato JSON
        .then(data => { // Procesa los datos recibidos del servidor

            // Verifica si el servidor indica que el usuario existe
            if(data.existe){
                // Muestra mensaje de bienvenida en el elemento con id "respuesta"
                document.getElementById("respuesta").innerText = "bienvenido";
                // Redirige al usuario a la página "Mihtml.html" en la misma carpeta
                window.location.href = 'Mihtml.html';
            }
            else{
                // Muestra mensaje de error si las credenciales son incorrectas
                document.getElementById("respuesta").innerText = "nombre o contraseña no validos";
            }

    });
    
}