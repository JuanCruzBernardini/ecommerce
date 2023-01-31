
const carrito = []

const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};
const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)

    mostrarListaOrdenada()
};
const mostrarListaOrdenada = () => {
    const listaDeProductos = productos.map(producto => {
        return " " + producto.nombre + "$" + producto.precio
    })
    console.log(listaDeProductos)
    alert("lista de precios: " + "\n \n" + listaDeProductos.join("\n"))
    comprarProductos(listaDeProductos)
};
const comprarProductos = (listaDeProductos) => {
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false
    do {
        productoNombre = prompt("que producto desea comprar?" + " \n \n " + listaDeProductos.join("\n"))
        productoCantidad = parseInt(prompt("cuantos productos queres comprar?"))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())
        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo!')
        }

        otroProducto = confirm("desea agregar otro producto? 'cancelar' si no deseas agregar mas productos")

    } while (otroProducto);

    confirmarCompra()


};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad
    }
};
const eliminarProductoCarrito = (productoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoAEliminar) {
            if (producto.cantidad > 1) {
                producto.cantidad --
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};
const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return "-" + producto.nombre + " cantidad " + producto.cantidad
    })
    const checkout = confirm('Checkout: '
        + '\n\n' + listaProductos.join('\n')
        + '\n\nPara continuar presione "Aceptar"  sino "Cancelar" para eliminar un producto del carrito'
    )
    if (checkout) {
        finalizarCompra(listaProductos)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(productoAEliminar)
    }

};
const finalizarCompra= (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc,item) => acc + item.cantidad,0)
    const precioTotal = carrito.reduce((acc,item) => acc + (item.cantidad* item.precio),0)
    alert('detalle de su compra '
    + '\n\n' + listaProductos.join('\n')
    + '\n\nTotal de productos:'+ cantidadTotal
    +'\n\nEl total de su compra es:'+ precioTotal
    +'\n\nGracias por su compra'
)
};
const comprar = () => {
const productosBaratos = confirm('queres ordenar la lista de mas barato a mas caro?')
if (productosBaratos) {
    ordenarMenorMayor()
    
}else{
    ordenarMayorMenor()
}



};
comprar()