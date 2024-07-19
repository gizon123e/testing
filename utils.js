require("./database/database")
const Pesanan = require("./models/pesanan/model-orders");
const Address = require('./models/model-address')
const Product = require("./models/model-product")

// Pesanan.find()
//     .populate('addressId')
//     .populate({
//         path: 'items.product.productId',
//         model: 'Product'
//     })
//     .then(data => {
//         console.log(JSON.stringify(data))
//     })
//     .catch(err => console.error(err));