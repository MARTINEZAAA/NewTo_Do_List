// Esperar a que todo el contenido del DOM esté cargado para ejecutar el código
document.addEventListener("DOMContentLoaded", () => {

    // Obtener referencia al campo de texto donde se ingresa la nueva tarea
    const inputTarea = document.getElementById("nuevaTarea");
    // Obtener referencia al botón "Agregar" que añadirá la tarea
    const btnAgregar = document.getElementById("btnAgregar");
    // Obtener referencia al botón "Eliminar" que borrará las tareas seleccionadas
    const btnEliminar = document.getElementById("btnEliminar");

    // Obtener referencia al contenedor <ul> de tareas pendientes
    const listaTareas = document.getElementById("listaTareas");
    // Obtener referencia al contenedor <ul> de tareas realizadas
    const listaRealizadas = document.getElementById("tareasRealizadas");

    // Cargar desde localStorage el arreglo de tareas pendientes, o inicializar como vacío
    let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    // Cargar desde localStorage el arreglo de tareas realizadas, o inicializar como vacío
    let realizadas = JSON.parse(localStorage.getItem("realizadas")) || [];

    // Función para guardar ambos arreglos en localStorage (persistencia)
    function guardarDatos() {
        // Convertir el arreglo 'tareas' a JSON y guardarlo bajo la clave "tareas"
        localStorage.setItem("tareas", JSON.stringify(tareas));
        // Convertir el arreglo 'realizadas' a JSON y guardarlo bajo la clave "realizadas"
        localStorage.setItem("realizadas", JSON.stringify(realizadas));
    }

    // Función que renderiza la lista de tareas pendientes en el HTML
    function mostrarTareas() {
        // Limpiar el contenido actual de la lista de pendientes
        listaTareas.innerHTML = "";

        // Recorrer cada tarea pendiente con su índice
        tareas.forEach((tarea, index) => {

            // Crear un elemento <li> para esta tarea
            const li = document.createElement("li");

            // Crear un checkbox para seleccionar la tarea (para eliminación múltiple)
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";                 // Tipo checkbox
            checkbox.dataset.index = index;              // Guardar el índice de la tarea en pendientes
            checkbox.dataset.tipo = "pendiente";         // Indicar que pertenece a la lista de pendientes

            // Crear un span que contendrá el texto de la tarea
            const texto = document.createElement("span");
            texto.textContent = " " + tarea + " ";       // Añadir espacios para separación visual

            // Crear un botón para marcar la tarea como realizada (✔)
            const btnHecho = document.createElement("button");
            btnHecho.textContent = "✔";                   // Símbolo de check

            // Al hacer clic en el botón ✔, mover la tarea de pendientes a realizadas
            btnHecho.addEventListener("click", () => {
                // Agregar la tarea al arreglo de realizadas
                realizadas.push(tarea);
                // Eliminar la tarea del arreglo de pendientes usando su índice
                tareas.splice(index, 1);

                // Guardar los cambios en localStorage
                guardarDatos();
                // Actualizar la vista de pendientes
                mostrarTareas();
                // Actualizar la vista de realizadas
                mostrarRealizadas();
            });

            // Ensambla el <li>: primero el checkbox, luego el texto, luego el botón
            li.appendChild(checkbox);
            li.appendChild(texto);
            li.appendChild(btnHecho);

            // Agregar el <li> completo a la lista de pendientes
            listaTareas.appendChild(li);
        });
    }

    // Función que renderiza la lista de tareas realizadas en el HTML
    function mostrarRealizadas() {
        // Limpiar el contenido actual de la lista de realizadas
        listaRealizadas.innerHTML = "";

        // Recorrer cada tarea realizada con su índice
        realizadas.forEach((tarea, index) => {

            // Crear un elemento <li> para esta tarea
            const li = document.createElement("li");

            // Crear un checkbox para seleccionar la tarea realizada (para eliminación)
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";                 // Tipo checkbox
            checkbox.dataset.index = index;              // Guardar el índice de la tarea en realizadas
            checkbox.dataset.tipo = "realizada";         // Indicar que pertenece a la lista de realizadas

            // Crear un span con el texto de la tarea
            const texto = document.createElement("span");
            texto.textContent = " " + tarea;              // Espacio inicial para separación

            // Ensambla el <li>: primero el checkbox, luego el texto
            li.appendChild(checkbox);
            li.appendChild(texto);

            // Agregar el <li> a la lista de realizadas
            listaRealizadas.appendChild(li);
        });
    }

    // Evento para el botón "Agregar": captura el texto y lo añade a pendientes
    btnAgregar.addEventListener("click", () => {

        // Obtener el valor del input y eliminar espacios al inicio y final
        const nuevaTarea = inputTarea.value.trim();

        // Validación: si el campo está vacío, mostrar alerta y salir
        if (nuevaTarea === "") {
            alert("La caja de texto está vacía");
            return;
        }

        // Validación: evitar duplicados (que no exista ni en pendientes ni en realizadas)
        if (tareas.includes(nuevaTarea) || realizadas.includes(nuevaTarea)) {
            alert("La tarea ya existe");
            return;
        }

        // Si pasa las validaciones, agregar la tarea al arreglo de pendientes
        tareas.push(nuevaTarea);

        // Guardar los datos actualizados
        guardarDatos();
        // Refrescar la lista de pendientes
        mostrarTareas();

        // Limpiar el campo de texto para la próxima entrada
        inputTarea.value = "";
    });

    // Evento para el botón "Eliminar seleccionadas": borra las tareas marcadas en ambas listas
    btnEliminar.addEventListener("click", () => {

        // Seleccionar todos los checkboxes que estén marcados en toda la página
        const checkboxes = document.querySelectorAll("input[type='checkbox']:checked");

        // Arreglos para almacenar los índices de las tareas a eliminar, separados por tipo
        let pendientesEliminar = [];
        let realizadasEliminar = [];

        // Recorrer cada checkbox seleccionado
        checkboxes.forEach(cb => {
            // Obtener el índice guardado en data-index y convertirlo a número
            const index = parseInt(cb.dataset.index);
            // Obtener el tipo (pendiente o realizada) guardado en data-tipo
            const tipo = cb.dataset.tipo;

            // Si el checkbox pertenece a pendientes, agregar su índice al arreglo correspondiente
            if (tipo === "pendiente") {
                pendientesEliminar.push(index);
            }

            // Si el checkbox pertenece a realizadas, agregar su índice al arreglo correspondiente
            if (tipo === "realizada") {
                realizadasEliminar.push(index);
            }
        });

        // Ordenar los índices de mayor a menor para eliminar desde el final y no alterar posiciones
        pendientesEliminar.sort((a, b) => b - a);
        realizadasEliminar.sort((a, b) => b - a);

        // Eliminar las tareas pendientes usando sus índices
        pendientesEliminar.forEach(i => {
            tareas.splice(i, 1);
        });

        // Eliminar las tareas realizadas usando sus índices
        realizadasEliminar.forEach(i => {
            realizadas.splice(i, 1);
        });

        // Guardar los cambios en localStorage
        guardarDatos();
        // Refrescar ambas listas
        mostrarTareas();
        mostrarRealizadas();
    });

    // Al cargar la página, mostrar las tareas existentes (tanto pendientes como realizadas)
    mostrarTareas();
    mostrarRealizadas();

});