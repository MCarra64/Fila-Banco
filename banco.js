class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
    this.anterior = null;
  }
}

class ListaDoblementeEnlazada {
  constructor() {
    this.cabeza = null;
    this.cola = null;
  }
  ingresarAlInicio(valor) {
    const nuevoNodo = new Nodo(valor);
    if (!this.cabeza) {
      this.cabeza = this.cola = nuevoNodo;
    } else {
      nuevoNodo.siguiente = this.cabeza;
      this.cabeza.anterior = nuevoNodo;
      this.cabeza = nuevoNodo;
    }
    this.imprimir();
  }
  ingresarAlFinal(valor) {
    const nuevoNodo = new Nodo(valor);
    if (!this.cola) {
      this.cabeza = this.cola = nuevoNodo;
    } else {
      nuevoNodo.anterior = this.cola;
      this.cola.siguiente = nuevoNodo;
      this.cola = nuevoNodo;
    }
    this.imprimir();
  }
  ingresarEnPosicion(valor, posicion) {
    const nuevoNodo = new Nodo(valor);
    if (posicion === 0) {
      this.ingresarAlInicio(valor);
      return;
    }
    let actual = this.cabeza;
    for (let i = 0; i < posicion - 1 && actual; i++) {
      actual = actual.siguiente;
    }
    if (!actual) {
      this.ingresarAlFinal(valor);
      return;
    }
    nuevoNodo.siguiente = actual.siguiente;
    nuevoNodo.anterior = actual;
    if (actual.siguiente) {
      actual.siguiente.anterior = nuevoNodo;
    }
    actual.siguiente = nuevoNodo;
    if (!nuevoNodo.siguiente) {
      this.cola = nuevoNodo;
    }
    this.imprimir();
  }

  quitarAlInicio() {
    if (!this.cabeza) return null;
    const valor = this.cabeza.valor;
    this.cabeza = this.cabeza.siguiente;
    if (this.cabeza) this.cabeza.anterior = null;
    else this.cola = null;
    this.imprimir();
    return valor;
  }
  //La funcion retirar para poder retirar a los clientes
  retirar(id) {
    let actual = this.cabeza;
    while (actual) {
      if (actual.valor.id === id) {
        if (actual === this.cabeza) this.quitarAlInicio();
        else if (actual === this.cola) this.quitarAlFinal();
        else {
          actual.anterior.siguiente = actual.siguiente;
          actual.siguiente.anterior = actual.anterior;
          this.imprimir();
        }
        alert(`${id} se ha retirado del banco.`);
        return;
      }
      actual = actual.siguiente;
    }
  }

  imprimir() {
    const listaElementos = document.getElementById("lista");
    listaElementos.innerHTML = "";
    let actual = this.cabeza;
    while (actual) {
      const li = document.createElement("li");
      li.className = "cliente";
      li.innerHTML = `
            <img src="${actual.valor.imagen}" alt="${actual.valor.id}">
            <div>${actual.valor.id}</div>
            <button class="btn btn-danger" onclick="lista.retirar('${actual.valor.id}')">Salir</button>
          `;
      listaElementos.appendChild(li);
      actual = actual.siguiente;
    }
  }
}

const lista = new ListaDoblementeEnlazada();
const cajas = [];
let contadorClientes = 1;
let atendidos = 0;
let salidos = 0;
let maxCajasUsadas = 0;

function imagenAleatoria() {
  const urls = [
    "/imgs/persona.jpg",
    "/imgs/persona2.jpg",
    "/imgs/persona3.jpg",
    "/imgs/persona4.jpg",
    "/imgs/persona5.jpg",
  ];
  return urls[Math.floor(Math.random() * urls.length)];
}

function agregarCliente() {
  const cliente = {
    id: `Cliente ${contadorClientes++}`,
    imagen: imagenAleatoria(),
  };
  lista.ingresarAlFinal(cliente);
  mostrarMensaje(`${cliente.id} ha ingresado a la fila.`);
}

function agregarCaja() {
  const contenedor = document.getElementById("cajas");
  const boton = document.createElement("button");
  boton.className = "btn btn-success";
  boton.textContent = `Caja ${contenedor.children.length + 1}`;

  boton.onclick = () => {
    if (!lista.cabeza) {
      mostrarMensaje("No hay clientes en la fila.");
      return;
    }

    if (boton.classList.contains("btn-danger")) {
      mostrarMensaje("Esta caja está ocupada.");
      return;
    }

    const clienteAtendido = lista.quitarAlInicio();
    atendidos++;

    boton.classList.remove("btn-success");
    boton.classList.add("btn-danger");
    boton.textContent = `Atendiendo: ${clienteAtendido.id}`;

    const ocupadas = cajas.filter((c) =>
      c.classList.contains("btn-danger")
    ).length;
    if (ocupadas > maxCajasUsadas) maxCajasUsadas = ocupadas;

    setTimeout(() => {
      boton.textContent = `Caja ${cajas.indexOf(boton) + 1}`;
      boton.classList.remove("btn-danger");
      boton.classList.add("btn-success");
    }, 3000);
  };

  contenedor.appendChild(boton);
  cajas.push(boton);
}

function atenderCliente() {
  if (!lista.cabeza) {
    alert("No hay clientes en la fila.");
    return;
  }
  const cajaLibre = cajas.find((c) => c.classList.contains("btn-success"));
  if (!cajaLibre) {
    alert("No hay cajas libres.");
    return;
  }

  cajaLibre.classList.remove("btn-success");
  cajaLibre.classList.add("btn-danger");

  const clienteAtendido = lista.quitarAlInicio();
  atendidos++;

  cajaLibre.textContent = `Atendiendo: ${clienteAtendido.id}`;

  const ocupadas = cajas.filter((c) =>
    c.classList.contains("btn-danger")
  ).length;
  if (ocupadas > maxCajasUsadas) maxCajasUsadas = ocupadas;

  setTimeout(() => {
    cajaLibre.textContent = `Caja ${cajas.indexOf(cajaLibre) + 1}`;
    cajaLibre.classList.remove("btn-danger");
    cajaLibre.classList.add("btn-success");
  }, 3000);
}

function mostrarEstadisticas() {
  salidos = contadorClientes - 1 - atendidos - (lista.cabeza ? 0 : 0);
  alert(
    `Estadísticas del día:\n` +
      `Clientes atendidos: ${atendidos}\n` +
      `Clientes que se retiraron: ${salidos}\n` +
      `Máximo de cajas usadas simultáneamente: ${maxCajasUsadas}`
  );
}

function mostrarMensaje(texto) {
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = texto;
  setTimeout(() => (mensaje.textContent = ""), 2000);
}
