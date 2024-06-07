const express = require('express');
const mongoose = require('mongoose');
const app = express()
const Product = require('./models/productModel')
const PORT = 3000

console.log("This is node")

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send("Welcome to backend")
})

app.get('/data', (req,res)=>{
    res.send("This is data route")
})

app.get('/products', async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get a single product from database
app.get('/product/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//post or add data to database
app.post('/products', async (req,res)=>{
    
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }

}) 

//update a product
app.put('/product/:id', async (req,res)=>  {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if that data does not exist in the database
        if(!product){
            return res.status(404).json({message: `cannot find any produvt with ID ${id}`})
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//delete a product
app.delete('/product/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }

        res.status(200).json(deleteProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

mongoose.connect('mongodb+srv://joshuaogundairo:passwordmongo1@cluster0.muauqns.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MONGODB')

    app.listen(PORT, (req,res)=> {
        console.log('Server is running at PORT 3000')
    })
    
})
    .catch(()=>{
        console.log("Connection failed!")
    })