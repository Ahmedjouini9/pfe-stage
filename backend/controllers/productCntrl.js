const ProductModal= require ("../models/product.js");
const mongoose =require ("mongoose");

const ProductCntrl ={
    createProduct : async (req, res) => {
        const Product = req.body;
        const newProduct = new ProductModal({
        ...Product,
        creator: req.userId,
        createdAt: new Date().toISOString(),
  });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
    }
},

getProducts : async (req, res) => {
  const { page } = req.query;
  try {
      // const Products = await ProductModal.find();
      // res.status(200).json(Products);
      
      const limit = 6;
      const startIndex = (Number(page) - 1) * limit;
      const total = await ProductModal.countDocuments({});
      const Products = await ProductModal.find().limit(limit).skip(startIndex);
    res.json({
        data: Products,
        currentPage: Number(page),
        totalProducts: total,
        numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
  }
},

getProduct : async (req, res) => {
  const { id } = req.params;
  try {
      const Product = await ProductModal.findById(id);
    res.status(200).json(Product);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
}
},

getProductsByUser : async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User doesn't exist" });
  }
  const userProducts = await ProductModal.find({ creator: id });
  res.status(200).json(userProducts);
},

 deleteProduct : async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: `No Product exist with id: ${id}` });
        }
    await ProductModal.findByIdAndRemove(id);
    res.json({ message: "Product deleted successfully" });
} catch (error) {
    res.status(404).json({ message: "Something went wrong" });
}
},

updateProduct : async (req, res) => {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Product exist with id: ${id}` });
    }

    const updatedProduct = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await ProductModal.findByIdAndUpdate(id, updatedProduct, { new: true });
    res.json(updatedProduct);
} catch (error) {
    res.status(404).json({ message: "Something went wrong" });
}
},

getProductsBySearch : async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const ProductName = new RegExp(searchQuery, "i");
        const Products = await ProductModal.find({ ProductName });
        res.json(Products);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},
getProductsBySearchDomaines : async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const domaines = new RegExp(searchQuery, "i");
        const Products = await ProductModal.find({ domaines });
        res.json(Products);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},
getProductsBySearchPays : async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const pay = new RegExp(searchQuery, "i");
        const Products = await ProductModal.find({ pay });
        res.json(Products);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},

getProductsByDomaine : async (req, res) => {
    const { domaine } = req.params;
    try {
        const Products = await ProductModal.find({ domaines: { $in: domaine } });
        res.json(Products);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
  }
},
getProductsByPay : async (req, res) => {
    const { pay } = req.params;
    try {
        const Products = await ProductModal.find({ pays: { $in: pay } });
        res.json(Products);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
  }
},

getRelatedProducts : async (req, res) => {
    const tags = req.body;
  try {
      const Products = await ProductModal.find({ tags: { $in: tags } });
      res.json(Products);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
},

likeProduct : async (req, res) => {
    const { id } = req.params;
    try {
        if (!req.userId) {
            return res.json({ message: "User is not authenticated" });
        }
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No Product exist with id: ${id}` });
        }
        
        const Product = await ProductModal.findById(id);
        
        const index = Product.likes.findIndex((id) => id === String(req.userId));
        
        if (index === -1) {
            Product.likes.push(req.userId);
        } else {
            Product.likes = Product.likes.filter((id) => id !== String(req.userId));
        }
        
    const updatedProduct = await ProductModal.findByIdAndUpdate(id, Product, {
      new: true,
    });
    
    res.status(200).json(updatedProduct);
} catch (error) {
    res.status(404).json({ message: error.message });
}
}
};
module.exports = ProductCntrl
