import Product from '../models/product.model.js'
import Category from '../models/category.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => { 
    var isValidate = await ValidCategory(req.body.category)
    if(!isValidate){
        return res.status(400).json({
            error: "Category is invalid." 
        })
    }
    const product = new Product(req.body)
    try {
        await product.save()
        return res.status(200).json({ 
            message: "Successfully create!"
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}
const list = async (req, res) => { 
	try {
        const { name } = req.query; // Get 'name' query parameter
        const query = {};

        // If 'name' is provided, use regex to match items containing the substring
        if (name) {
            query.name = { $regex: name, $options: 'i' }; // 'i' for case-insensitive
        }
	    let products = await Product.find(query) 
	    res.json(products)
	} catch (err) {
	    return res.status(400).json({
	        error: errorHandler.getErrorMessage(err) 
	    })
	} 
}

const removeAll = async (req, res) => { 
    try {
        let deletedProduct = await Product.deleteMany({})
        res.json(deletedProduct) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const productByID = async (req, res, next, id) => { 
    try {
        let product = await Product.findById(id) 
        if (!product)
            return res.status('400').json({ 
                error: "Product not found"
            })
        req.profile = product 
        next()
    } catch (err) {
        return res.status('400').json({ 
            error: "Could not retrieve product"
        }) 
    }
}
const read = (req, res) => {
	return res.json(req.profile) 
}

const update = async (req, res) => { 
    try {
        var isValidate = ValidCategory(req.body.category)
        if(!isValidate){
            return res.status(400).json({
                error: "Category is invalid." 
            })
        }
        let product = req.profile
        product = extend(product, req.body)
        await product.save()
        res.json(product) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}
const remove = async (req, res) => { 
    try {
        let product = req.profile
        let deletedProduct = await product.deleteOne() 
        res.json(deletedProduct) 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        })
    } 
}

const ValidCategory = async(inputCategory) => {
    try {

        let category = await Category.find({name: inputCategory});
        if(category.length === 0)
            return false;
        return true;
    } catch (err) {
        return false;
    } 
}
export default { create, productByID, read, list, remove, update, removeAll }