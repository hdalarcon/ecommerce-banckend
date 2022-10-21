const express = require('express');
const { Router } = express;
const { authMiddleware } =  require('../middlewares')
const routerProductos = Router();

const ContenedorProductos = require('../src/containers/contenedorProductos')
const contenedorProductos = new ContenedorProductos('productos.json')


//GET
routerProductos.get("/:id?", async (req, res) => {
    const id = req.params.id;
    if(id){
        const filtrado = contenedorProductos.getById(id);
        const result = await filtrado;
        res.json(result);
    }else{
        const products = contenedorProductos.getAll();
        const result = await products;
        res.json(result);
    } 
});

//POST
routerProductos.post('/',  authMiddleware , async (req, res) => {
     const product = req.body;
     const producAdd = contenedorProductos.save(product);
     const result = await producAdd;
     res.send(result);
})

//PUT
routerProductos.put("/:id", authMiddleware , async (req, res) => {
    const id = req.params.id;
    const product = req.body;
    const result = await contenedorProductos.modifById(product, id);
    res.json(result);
});


//DELETE
routerProductos.delete("/:id", authMiddleware , async (req, res) => {
        const id = req.params.id;
        const nuevoArray = await contenedorProductos.deleteByID(id);
        res.send(nuevoArray);
});

module.exports = routerProductos;

