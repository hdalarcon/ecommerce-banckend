const fs = require('fs');
class ContenedorCarritos {
    constructor(file) {
        this.file = file;
    }

    //Busca todos los carritos
    async getAll() {
        try {
            const contents = await fs.promises.readFile(this.file, "utf-8");
            const result = await JSON.parse(contents);
            return result;
        } catch (error) {
            return console.log(error);
        }
    }

    //Crea un carrito
    async saveCart(cart) {
        const data = await this.getAll();
        let id = data[data.length - 1] + 1;
        let timestamp = Date.now();
        const newCart = {
            id: id,
            timestamp: timestamp,
            productos: [cart],
        };

        data.push(newCart);

        try {
            if (data.length == 0) {
                id = 1;
                newCart.id = id;
            } else {
                newCart.id = data.length;
            }

        await fs.promises.writeFile(this.file, JSON.stringify(data));
        return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    //Elimina un carrito por id
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

    //Elimina un producto de un carrito
    async deletProductCart(id, id_prod) {
        try {
            const data = await this.getById(id);
            const arrayProd = await data.productos;
            const filtrado = arrayProd.filter((prod) => {
                if (id_prod != prod.id) {
                    return prod;
                } else {
                    return null;
                }
            });
            const newCart = { ...data, productos: filtrado };
            const asd = await this.deleteByID(id);
            asd.push(newCart);

            const dataFinal = asd.sort((a, b) => {
                return a.id - b.id;
            });
            const newArray = fs.promises.writeFile(this.file,JSON.stringify(dataFinal));
            return newArray;
        } catch (error) {
            return console.log(error);
        }
    }

    //Busca un carrito por id
    async getById(id) {
        try {
            const data = await this.getAll();
            const filtrado = data.find((c) => {
                if (id == c.id) {
                    return c;
                } else {
                    return null;
                }
            });
            return filtrado;
        } catch (error) {
            return console.log(error);
        }
    }

    //Modifica un carrito por id
    async modifById(prod, id) {
        const data = await this.deleteByID(id);
        const newProd = { ...prod, id };
        data.push(newProd);
        const dataFinal = data.sort((a, b) => {
            return a.id - b.id;
        });
        const nuevoArray = fs.promises.writeFile(this.file,JSON.stringify(dataFinal));
        return nuevoArray;
    }


}


module.exports = ContenedorCarritos