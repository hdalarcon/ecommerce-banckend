const express = require('express');
const { authMiddleware } = require('../middlewares');
const { Router } = express;

const routerCarrito = Router();

const ContenedorCarritos = require('../src/containers/contenedorCarritos')
const contenedorCarritos = new ContenedorCarritos('carritos.json')

const ContenedorProductos = require('../src/containers/contenedorProductos')
const contenedorProductos = new ContenedorProductos('productos.json')


//POST
routerCarrito.post('/', async (req, res) => {
    const cart = req.body;
    const cartAdd = contenedorCarritos.saveCart(cart);
    const result = await cartAdd;
    res.json(result);
})

routerCarrito.post("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const cart = await contenedorCarritos.getById(id);
    const product = req.body;
    const findProduct = await contenedorProductos.getById(product.id)
    if(findProduct){
        cart.productos.push(product);
        const result = await contenedorCarritos.modifById(cart, id);
        res.json(result);
    }else{
        console.log('Producto no encontrado.')
    }
});

//DELETE
routerCarrito.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const cartDelete = contenedorCarritos.deleteByID(id);
    const result = await cartDelete;
    res.json(result);
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
    const id = req.params.id;
    const id_prod = req.params.id_prod
    const cartDelete = contenedorCarritos.deletProductCart(id, id_prod);
    const result = await cartDelete;
    res.json(result);
});

//GET
routerCarrito.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const cart = contenedorCarritos.getById(id);
    const result = await cart;
    const cartProducts = result.productos;
    res.json(cartProducts);
});




module.exports = routerCarrito;