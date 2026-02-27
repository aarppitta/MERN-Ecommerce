import mongoose from 'mongoose';


const productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    image: String
},{timestamp:true})

const Product = mongoose.model("Product", productSchema);

export default Product;