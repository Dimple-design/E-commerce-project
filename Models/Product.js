const mongoose = require('mongoose');
const Review = require('./Review');


const productSchema = new mongoose.Schema({
    name:{type:String, trim:true, required:true},
    img:{
        type:String, 
        trim:true, 
        // default:true,
    },
    price:{type:Number, required:true},
    desc:{type:String, trim:true},

    avgRating:{
        type:Number,
        default:0
    },

    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }
    }
       
)

// middleware for mongoodb operations and has pre and post middlewares which are basically used for schema & before the model js class.

productSchema.post('findOneAndDelete', async function(product){
    if(product.reviews.length > 0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})



let Product = mongoose.model('Product', productSchema);

module.exports = Product;