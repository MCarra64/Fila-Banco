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
        if (posicion <= 0 || !this.cabeza) {
            this.ingresarAlInicio(valor);
            return;
        }

        let actual = this.cabeza;
        for (let i = 0; i < posicion - 1 && actual.siguiente; i++) {
            actual = actual.siguiente;
        }

        if (!actual.siguiente) {
            this.ingresarAlFinal(valor);
            return;
        }

        const nuevoNodo = new Nodo(valor);
        nuevoNodo.siguiente = actual.siguiente;
        nuevoNodo.anterior = actual;
        actual.siguiente.anterior = nuevoNodo;
        actual.siguiente = nuevoNodo;
        this.imprimir();
    }

    quitarAlInicio() {
        if (!this.cabeza) return;
        this.cabeza = this.cabeza.siguiente;
        if (this.cabeza) {
            this.cabeza.anterior = null;
        } else {
            this.cola = null;
        }
        this.imprimir();
    }

    quitarAlFinal() {
        if (!this.cola) return;
        this.cola = this.cola.anterior;
        if (this.cola) {
            this.cola.siguiente = null;
        } else {
            this.cabeza = null;
        }
        this.imprimir();
    }

    cantidadElementos() {
        let contador = 0;
        let actual = this.cabeza;
        while (actual) {
            contador++;
            actual = actual.siguiente;
        }
        alert("Cantidad de elementos: " + contador);
    }

    mayorDeLaLista() {
        if (!this.cabeza) return alert("Lista vacía");
        let mayor = Number(this.cabeza.valor);
        let actual = this.cabeza.siguiente;
        while (actual) {
            if (Number(actual.valor) > mayor) mayor = Number(actual.valor);
            actual = actual.siguiente;
        }
        alert("Mayor de la lista: " + mayor);
    }

    menorDeLaLista() {
        if (!this.cabeza) return alert("Lista vacía");
        let menor = Number(this.cabeza.valor);
        let actual = this.cabeza.siguiente;
        while (actual) {
            if (Number(actual.valor) < menor) menor = Number(actual.valor);
            actual = actual.siguiente;
        }
        alert("Menor de la lista: " + menor);
    }

    buscarElemento(valor) {
        let actual = this.cabeza;
        let posicion = 0;
        while (actual) {
            if (actual.valor == valor) {
                alert(`Elemento "${valor}" encontrado en la posición ${posicion}`);
                return;
            }
            actual = actual.siguiente;
            posicion++;
        }
        alert(`Elemento "${valor}" no encontrado`);
    }

    existeElemento(valor) {
        let actual = this.cabeza;
        while (actual) {
            if (actual.valor == valor) {
                alert(`El elemento "${valor}" SÍ existe en la lista`);
                return true;
            }
            actual = actual.siguiente;
        }
        alert(`El elemento "${valor}" NO existe en la lista`);
        return false;
    }

    sumarElementos() {
        let actual = this.cabeza;
        let suma = 0;
        while (actual) {
            suma += Number(actual.valor);
            actual = actual.siguiente;
        }
        alert("Suma total: " + suma);
    }

    imprimir() {
        const listaElementos = document.getElementById("lista");
        listaElementos.innerHTML = "";
        let actual = this.cabeza;
        while (actual) {
            const li = document.createElement("li");
            li.textContent = actual.valor;
            li.classList.add("list-group-item");
            listaElementos.appendChild(li);
            actual = actual.siguiente;
        }
    }

    crearBotonCaja(id) {
        const boton = document.createElement("button");
        boton.className = "btn btn-success m-2";
        boton.style.width = "100px";
        boton.style.height = "100px";
        boton.textContent = `Caja ${id}`;

        boton.addEventListener("click", () => {
            if (boton.classList.contains("btn-success")) {
                boton.classList.remove("btn-success");
                boton.classList.add("btn-danger");
            } else {
                boton.classList.remove("btn-danger");
                boton.classList.add("btn-success");
            }
        });

        return boton;
    }
}


const lista = new ListaDoblementeEnlazada();

function agregarCaja() {
  const contenedor = document.getElementById("cajas");
  const nuevaCaja = lista.crearBotonCaja(contenedor.children.length + 1);
  contenedor.appendChild(nuevaCaja);
}