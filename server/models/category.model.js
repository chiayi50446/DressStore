import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({ 
    name:
    {
        type: String,
        trim: true,
        required: "name is required"
    }
})



export default mongoose.model('Category', CategorySchema);