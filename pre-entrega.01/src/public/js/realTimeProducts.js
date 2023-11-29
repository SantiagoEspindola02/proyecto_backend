


const socket = io()

const form = document.getElementById('formProduct')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const datForm = new FormData(e.target)
  const prod = Object.fromEntries(datForm)
  socket.emit('newProduct', prod)
  socket.on('mensajeProductoCreado', (mensaje) => {
    Swal.fire(
      mensaje
    )
  })
  e.target.reset()
})

const productsDiv = document.getElementById("productsDiv");


socket.on("updatedProducts", (products) => {

  productsDiv.innerHTML = "";

  products.forEach((prod) => {

    productsDiv.innerHTML += `

          <div>

            <p>Title: ${prod.title}</p>

            <p>Description: ${prod.description}</p>

            <p>Price: ${prod.price}</p>

            <p>Thumbnail: ${prod.thumbnail}</p>

            <p>Category: ${prod.category}</p>

            <p>Status: ${prod.status}</p>

            <p>Code: ${prod.code}</p>

            <p>Stock: ${prod.stock}</p>

            <p>pid: ${prod.pid}</p>

          </div>

          `;

  });

});