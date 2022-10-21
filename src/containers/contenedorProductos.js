const fs = require('fs');
class ContenedorProductos {
    constructor(file) {
        this.file = file;
    }

    //Busca un producto por id
    async getById(id){
        try {
            const data = await this.getAll();
            const result = data.find(obj => obj.id == id) 
            return result === undefined ? ({error: 'Producto no encontrado'}) : result
        } catch(error){
            return 'Producto no encontrado'
        }
    }

    //Busca todos los productos
    async getAll() {
        try {
            const contents = await fs.promises.readFile(this.file, "utf-8");
            const result = await JSON.parse(contents);
            return result;
        } catch (error) {
            return console.log(error);
        }
    }

    //Guarda un proiducto ingresado
    async save(product) {
        const data = await this.getAll();
        let id = data[data.length - 1] + 1;

        product.id = id;
        let timestamp = Date.now();
        product.timestamp = timestamp;

        data.push(product);

        try {
            if (data.length == 0) {
                id = 1;
                product.id = id;
            } else {
                product.id = data.length;
            }
            await fs.promises.writeFile(this.file, JSON.stringify(data));
            return product;
        } catch (error) {
            console.log(error);
        }
    }


    //Modifica un producto por id
    async modifById(prod, id) {
        const data = await this.deleteByID(id);
        const newProd = { ...prod, id };
        data.push(newProd);
        const dataFinal = data.sort((a, b) => {
            return a.id - b.id;
        });

        const nuevoArray = fs.promises.writeFile(this.file, JSON.stringify(dataFinal));
        return nuevoArray;
    }

    //Elimina un producto por id
    async deleteByID(id) {
        try {
            let result
            const data = await this.getAll();
            const filtrado = data.filter((prod) => { id != prod.id ? result=prod : result= null 
                return result
            });
            fs.promises.writeFile(this.file,JSON.stringify(filtrado)
            );

            return filtrado;
        } catch (error) {
            return console.log(error);
        }
    }

    

    //Elimina todos los productos
    async deleteAll(){
        await fs.promises.writeFile(this.file, "[]")
    }
}

module.exports = ContenedorProductos
