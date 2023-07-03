import { asyncError } from "../middleware/error.js";
import { Product } from "../models/product.js";
import errorHanlder from "../utils/error.js";
import { getDataUri } from "../utils/features.js";
import cloudinary from "cloudinary";
import { Category } from "../models/category.js";

export const getAllProduct = asyncError(async (req, res, next) => {
  // search & category query

    const {keyword,category} = req.query;

    const products = await Product.find({
        name:{
            $regex : keyword ? keyword : "",
            $options : "i",
        },
        // category:category ? category : undefined,
    });

  res.status(200).json({
    success: true,
    products,
  });
});


export const getCategoryProduct = asyncError(async (req, res, next) => {
  const { keyword, category } = req.query;

  const products = await Product.find({
    name: {
      $regex: keyword ? keyword : "",
      $options: "i",
    },
    category: category ? category : undefined, // Only include products with the specified category ID
  });

  res.status(200).json({
    success: true,
    products,
  });
});


export const getAdminProduct = asyncError(async (req, res, next) => {
    // search & category query
    const products = await Product.find({}).populate("category");
    const outOfStock = products.filter((item) => item.stock === 0);
    res.status(200).json({
      success: true,
      products,
      outOfStock: outOfStock.length,
      inStock: products.length-outOfStock.length,
    });
  });

export const getProductDetails = asyncError(async (req, res, next) => {
  // search & category query
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) return next(new errorHanlder("Product not found", 404));

  res.status(200).json({
    success: true,
    product,
  });
});

export const addProduct = asyncError(async (req, res, next) => {
  const { name, description, category, price, stock } = req.body;
    if (!req.file) return next(new errorHanlder("Please upload a file", 400));
  const file = getDataUri( req.file);
  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await Product.create({
    name,
    description,
    category,
    price,
    stock,
    images : [image],
  });


  res.status(200).json({
    success: true,
    message : "Product added successfully",
  });
});

export const updateProduct = asyncError(async (req, res, next) => {
    const { name, description, category, price, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return next(new errorHanlder("Product not found", 404));
    
    await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        price,
        stock,
    });
    
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
    });
});

export const addProductImage = asyncError(async (req, res, next) => {
    // const { name, description, category, price, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return next(new errorHanlder("Product not found", 404));
    
    if (!req.file) return next(new errorHanlder("Please upload a file", 400));
  const file = getDataUri( req.file);
  const myCloud = await cloudinary.v2.uploader.upload(file.content);
  const image = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

    product.images.push(image);
    await product.save();
    res.status(200).json({
        success: true,
        message: "Image added successfully",
    });
});

export const deleteProductImage = asyncError(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);
    if (!product) return next(new errorHanlder("Product not found", 404));
    const id = req.query.id;

    if(!id) return next(new errorHanlder("Please provide image id", 400));

    let isExist=-1;
    product.images.forEach((item,index)=>{
        if(item._id.toString()===id){
            isExist=index;
        }
    });
    if(isExist<0) return next(new errorHanlder("Image not found", 404));

    await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
    product.images.splice(isExist,1);
    await product.save();

    res.status(200).json({
        success: true,
        message: "Image deleted successfully",
    });
});


export const deleteProduct = asyncError(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);
    if (!product) return next(new errorHanlder("Product not found", 404));

    for(let i=0;i<product.images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
});

export const addCategory = asyncError(async (req, res, next) => {
    // let user = await Category.findOne({Categories});
    // if(user) return next(new errorHanlder("Category already exists", 400));

    await Category.create(req.body);

    res.status(201).json({
        success:true,
        message:"Category added successfully"
    })
});

export const getAllCategories = asyncError(async (req, res, next) => {

    const categories = await Category.find({});

    res.status(200).json({
        success:true,
        categories,
    });

});
export const deleteCategory = asyncError(async (req, res, next) => {
    
        const category = await Category.findById(req.params.id);
        if(!category) return next(new errorHanlder("Category not found",404));

        const products = await Product.find({category:category._id});

        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            product.category=undefined;
            await product.save(); 
            
        }
        await Category.findByIdAndRemove(req.params.id);
    
        res.status(200).json({
            success:true,
            message:"Category deleted successfully"
        })

});

