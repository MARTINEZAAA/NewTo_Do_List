const input = document.getElementById("nuevaTarea");
const boton = document.getElementById("btnAgregar");
const lista = document.getElementById("listaTareas");

boton.addEventListener("click", agregarTarea);

function agregarTarea() {
    const texto = input.value.trim();
    if (texto === "") return;

    crearElementoTarea(texto);
    input.value = "";
}

function crearElementoTarea(texto) {
    const li = document.createElement("li");

    const spanTexto = document.createElement("span");
    spanTexto.textContent = texto;

    // Contenedor de botones
    const contenedorBotones = document.createElement("div");

    // Botón Editar
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("editar");

    botonEditar.addEventListener("click", function (e) {
        e.stopPropagation();

        if (botonEditar.textContent === "Editar") {
            const nuevoInput = document.createElement("input");
            nuevoInput.type = "text";
            nuevoInput.value = spanTexto.textContent;

            li.replaceChild(nuevoInput, spanTexto);
            botonEditar.textContent = "Guardar";
        } else {
            const nuevoTexto = li.querySelector("input").value.trim();
            if (nuevoTexto !== "") {
                spanTexto.textContent = nuevoTexto;
            }

            li.replaceChild(spanTexto, li.querySelector("input"));
            botonEditar.textContent = "Editar";
        }
    });

    // Botón Eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.classList.add("eliminar");

    botonEliminar.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
    });

    // Marcar como completada
    li.addEventListener("click", function () {
        li.classList.toggle("completada");
    });

    contenedorBotones.appendChild(botonEditar);
    contenedorBotones.appendChild(botonEliminar);

    li.appendChild(spanTexto);
    li.appendChild(contenedorBotones);

    lista.appendChild(li);
}