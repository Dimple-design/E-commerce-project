const mongoose = require('mongoose');

const Product = require('./Models/Product');
 
const products = [
    {
        name: 'Iphone 14pro',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSClwHytjMX3eqRA7XQGCII70gImcTEuVxZIA&s',
        price: 140000,
        desc: 'costly',
    },

    {
        name: 'Macbook m2pro',
        img: 'https://images.unsplash.com/photo-1640721952964-d9547dfd6cc2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hY2Jvb2slMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D',
        price: 240000,
        desc: 'So costly',
    },

    {
        name: 'Iwatch',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgTG1Q2667I2WNiFn6TyXVDxh0fRim9abIaw&s',
        price: 51000,
        desc: 'So costly',
    },

    {
        name: 'Ipad pro',
        img: 'https://images.unsplash.com/photo-1713492527322-471061e52516?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aXBhZCUyMHBybyUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D',
        price: 51000,
        desc: 'So costly'
    },

    {
        name: 'Earpods',
        img: 'https://media.istockphoto.com/id/1438176361/photo/white-wireless-headphones-and-case-on-a-dark-background.webp?b=1&s=170667a&w=0&k=20&c=8HQxfhOsKMXK_30wFTYuYdeoVWVtAcLgAeLoU4f_yL0=',
        price: 51000,
        desc: 'So costly',
    },
]

async function seedDB() {
    await Product.insertMany(products);
    console.log('data seeded successfully');
}

module.exports = seedDB;