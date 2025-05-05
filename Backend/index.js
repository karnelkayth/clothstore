const express = require('express')
const cors = require('cors')
const signin = require('./route/Signup');
const bodyParser = require('body-parser');
const userproduct = require('./route/Product')
const handlequantity = require('./route/HandleQuantity')
const cart = require('./route/CartRoute')
const deleteproduct = require('./route/DeleteProduct')
const orderroute = require('./route/PlaceOrderRoute')
const GetUser = require('./route/GetUser')

const app = express();
app.use(express.urlencoded())
app.use(express.json())
app.use(cors());
app.use(bodyParser.json())

app.post('/signin', signin)
app.post('/product', userproduct)
app.post('/quantity', handlequantity)
app.get('/cart', cart)
app.post('/deleteproduct', deleteproduct)
app.post('/order', orderroute)
app.get('/getuser', GetUser)

// At the bottom, after all your API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
