
const {productSchema, reviewSchmema} = require('./schema')

const validateProduct = (req,res,next)=>{
    const {name,img,price,desc} = req.body;
    const {error, value} =  productSchema.validate(name,img,price,desc)
    if(error){
        return res.sender('error');
    }
    next();

}


const validateReview = (req,res,next)=>{
    const {rating,comment} = req.body;
    const {error} =  reviewSchema.validate(rating, comment)
    if(error){
        return res.sender('error');
    }
    next();

}
const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error', 'please login first');
        return res.redirect('/login');
    }
    next();
}

const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error', 'you dont have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error', 'you dont have the permission to do that');
        return res.redirect('/products');

    }
    next();
}

const isProductAuthor = async (req,res,next)=>{
    let {id} = req.params; // product id
    let product = await Product.findById(id); // entire product
    if(!product.author.equals(req.user._id)){
        req.flash('error', 'you are not authorised user');
        return res.redirect('/products');


    }
    next();
}

module.exports = {isProductAuthor, isSeller, isLoggedIn, validateReview, validateProduct}