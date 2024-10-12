import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({ 
    name:
    {
        type: String,
        trim: true,
        required: "name is required"
    },
    description:
    {
        type: String,
        required: "Description is required",
    },
    price:
    {
        type: Number,
        required: "Price is required",
    },
    published:
    {
        type: Boolean,
        required: "Published is required",
    },
    category:
    {
        type: String,
        trim: true,
        required: "Category is required"
    }
})



export default mongoose.model('Product', ProductSchema);