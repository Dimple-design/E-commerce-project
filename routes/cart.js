const express = require('express');
const router = express.Router() 
const {isLoggedIn} = require('../views/users/middleware')
const Product = require('../Models/User');
const User = require('../Models/User');


// route to see the cart
router.get('/user/cart', isLoggedIn,  async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart'); 
    const totalAmount = user.cart.reduce((sum, curr)=> sum+curr.price, 0)
    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart', {user, totalAmount, productInfo});
})


// actually adding product to the cart
router.post('/user/:productId/add', isLoggedIn,  async(req, res)=>{
        let {productId} = req.params;
        let userId = req.user._id;
        let product = await Product.findById(productId);
        let user = await User.findById(userIdId);
        user.cart.push(product);
        await user.save();
        res.redirect('/user/cart');
        

}) 




module.exports = router;
