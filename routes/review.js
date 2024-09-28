const express = require('express');
const router = express.Router() //mini instance
const Product = require('../Models/Product')
const Review = require('../Models/Review')
const {validateReview} = require('../views/users/middleware')


router.post('/products/id/review', async(req, res)=>{
    try{
    let {id} = req.params;
    let {rating, comment} = req.body;
    const product =  await Product.findById(id);
    const review = new Review({rating, comment});

    product.reviews.push(review);
    await review.save();
    await product.save();
    req.flash('success', 'Review added successfully')
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error', {err:e.message});
    }
})


  

module.exports = router;