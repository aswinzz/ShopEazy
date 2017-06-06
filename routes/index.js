var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
var Product = require('../models/product');
router.use(csrfProtection);
/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    res.render('shop/index', { title: 'ShopEazy', products: docs });	
  });
  
});

router.get('/add-to-cart/:id',function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productId,function(err,product){
    	if(err){
    		return res.redirect('/');
    	}
    	cart.add(product,product.id);
    	req.session.cart = cart;
    	console.log(req.session.cart);
    	res.redirect('/');
    })
});
router.get('/reduce/:id',function(req,res,next){
	var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
})
router.get('/removeall/:id',function(req,res,next){
	var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.removeAll(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
})
router.get('/shopping-cart',function(req,res,next){
	if(!req.session.cart){
		return res.render('shop/shopping-cart',{products: null});
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice});
});
router.get('/checkout',isLoggedIn,function(req,res,next){
  if(!req.session.cart){
		return res.redirect('/shopping-cart');
	}
	var cart = new Cart(req.session.cart);
	res.render('shop/checkout',{total:cart.totalPrice});
});
module.exports = router;
function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/user/signin');
}
