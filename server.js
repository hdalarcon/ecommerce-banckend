const express = require('express')
const app = express()
const routerProductos = require('./routes/productos')
const routerCarrito = require('./routes/carrito')

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'));

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)



//Running server
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${server.address().port}`))
server.on('error', error => console.log(`Error en server ${error}`))
