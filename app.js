if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./Models/User');
const MongoStore = require('connect-mongo');

const dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/Dimple'

mongoose.set('strictQuery', true);
mongoose.connect(dbURL
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err))
)

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');
const paymentRoutes = require('./routes/payment');

let secret = process.env.SECRET || 'weneedabettersecretkey';

let store = MongoStore.create({
    secret:secret,
    mongoUrl:dbURL,
    touchAfter:24*60*60
})
 

mongoose.connect('mongodb://127.0.0.1:27017/Dimple')
.then(()=>{console.log('DB connected successfully')})
.catch(()=>{
    console.log('DB error');
    console.log(err);
})


let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 24*7*60*60*1000,
        maxAge:24*7*60*60*1000
    }
}


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//public folder

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})

//passport

passport.use(new LocalStrategy(User.authenticate()));

// seeding database
// seedDB()
 

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApi);
app.use(paymentRoutes); 




app.listen(8080, ()=>{
    console.log('server connected at port 8080')
})
