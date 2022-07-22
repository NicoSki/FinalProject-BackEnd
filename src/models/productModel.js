const mongoose = require("mongoose");
const { Schema } = mongoose;
let {logger} = require("../utils/pino");


const ProductSchema = new Schema({
    title: { type: String, required: true },
    categorie: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    link: { type: String, required: true },
    inCart: { type: Boolean, default: false }
});

let prodModel = mongoose.model("allProducts", ProductSchema);

class MongoDB {
    async add(prod) {
        try {
            let newProd = prodModel(prod);
            await newProd.save();
            return newProd;
        } catch (error) {
            logger.error(error);
        }
    }

    async categories() {
        try {
            let shirt = await prodModel.find({ categorie: "shirt" });
            let shoes = await prodModel.find({ categorie: "shoes" });
            let trouser = await prodModel.find({ categorie: "trousers" });
            let button_down = await prodModel.find({ categorie: "button-downShirt" });

            let category = {
                shirt,
                shoes,
                trouser,
                button_down,
            }

            return category;
        } catch (error) {
            logger.error(error);
        }
    }

    async allProducts() {
        try {
            let all = await prodModel.find().sort({ "categorie": 1 });
            return all;
        } catch (error) {
            logger.error(error);
        }
    }

    async particularProduct(id) {
        try {
            let part = await prodModel.findOne({ _id: id });
            return part;
        } catch (error) {
            logger.error(error);
        }
    }

    async deleteProduct(id) {
        try {
            let prodToDel = await prodModel.remove({ _id: id });
            return prodToDel;
        } catch (error) {
            logger.error(error);
        }
    }

    async editProduct(id,edition) {
        try {
            let editedProd= await prodModel.updateOne({"_id":id}, {$set:{"title":edition.title, "categorie":edition.apellido,"img":edition.img,"price":edition.price,"link":edition.link}});
            return editedProd;
        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = new MongoDB();