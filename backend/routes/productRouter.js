const router = require('express').Router()
const productCtrl = require('../controllers/productCntrl')
const auth = require('../middleware/auth')


router.get("/search", productCtrl.getProductsBySearch);
router.get("/searchdomaines", productCtrl.getProductsBySearchDomaines);
router.get("/searchpays", productCtrl.getProductsBySearchPays);
router.get("/domaine/:domaine", productCtrl.getProductsByDomaine);
router.get("/pay/:pay", productCtrl.getProductsByPay);
router.post("/relatedproducts", productCtrl.getRelatedProducts);
router.get("/all-product", productCtrl.getProducts);
router.get("/:id", productCtrl.getProduct);

router.post("/add-product",  productCtrl.createProduct);
router.delete("/delete-product/:id", auth, productCtrl.deleteProduct);
router.patch("/edit-product/:id", auth, productCtrl.updateProduct);
router.get("/userproducts/:id", auth, productCtrl.getProductsByUser);
router.patch("/like/:id", auth, productCtrl.likeProduct);

module.exports = router


// const router = require('express').Router();
// const product = require('../../models/product')


// //update product's profile 
// router.put("/:id",async (req,res)=>{
//     if ( req.body.productId === req.params.id || req.body.isAdmin ){
//         if ( req.body.password){
//             try{
//                 const salt = await bcrypt.genSalt(10);
//                 req.body.password = await bcrypt.hash(req.body.password , salt)
//             }catch (err){
//                 return res.status(500).json(err)
//             }
//         }
//         try{
//             const product = await product.findByIdAndUpdate(req.params.id,{
//                 $set : req.body
//             })
//             res.status(200).json('account updated')
//         }catch(err){
//             return res.status(500).json(err)

            
//         }
//     }else {
//         return res.status(403).json('you can update only your account')
//     }

// })
// //delete product's profile
// router.delete("/:id", async (req, res) => {
//     if (req.body.productId === req.params.id || req.body.isAdmin) {
//       try {
//         await product.findByIdAndDelete(req.params.id);
//         res.status(200).json("Account has been deleted");
//       } catch (err) {
//         return res.status(500).json(err);
//       }
//     } else {
//       return res.status(403).json("You can delete only your account!");
//     }
//   });

// //admin
// //get product
// router.get("/admin:id", async (req, res) => {
//     const productId = req.query.productId;
//     const productName = req.query.productname;
//     try {
//       const product = productId
//         ? await product.findById(productId)
//         : await product.findOne({ productname: productName });
//       const { password, updatedAt, ...other } = product._doc;
//       res.status(200).json(other);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
// //get all product
// router.get('/admin/allproduct', async (req,res) => {
//     try{
//        await product.find().then(product => {
//             res.json(product);
//             console.log(product);
//         })
//     }catch{
//         res.status(500).json(err);
//     }
// })  
// //delete product
// router.delete("/admin:id", async (req, res) => {
//     if (req.body.productId === req.params.id) {
//       try {
//         await product.findByIdAndDelete(req.params.id);
//         res.status(200).json("product has been deleted");
//       } catch (err) {
//         return res.status(500).json(err);
//       }
//     }
    
//   });

// //update product 
// router.put("/admin:id" , async(req,res)=>{
//     if (req.body.productId === req.params.id) {
//     try{
//     const product = await product.findByIdAndUpdate(req.params.id,{
//         $set : req.body
//     })
//     res.status(200).json('product updated')
// }catch(err){
//     return res.status(500).json(err)
// }  
// }
// });

// module.exports = router;
