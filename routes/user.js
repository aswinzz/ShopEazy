var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var csrf = require('csurf');
var passport = require('passport');
var csrfProtection = csrf();
var Product = require('../models/product');
router.use(csrfProtection);
router.get('/signup',notLoggedIn,function(req, res, next){
	var messages = req.flash('error');
	res.render('user/signup', {csrfToken: req.csrfToken(),messages: messages,hasErrors: messages.length > 0});
});
router.post('/signup',notLoggedIn,passport.authenticate('local.signup',{
  successRedirect: '/user/signin',
  failureRedirect: '/user/signup',
  failureFlash : true
}));
router.get('/logout',function(req,res,next){
  req.logout();
  res.redirect('/');
});
router.get('/profile',isLoggedIn,function(req,res,next){
  
  if(!req.session.cart){
    return res.render('user/profile',{products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('user/profile',{totalPrice:cart.totalPrice});
});
router.get('/signin',notLoggedIn,function(req,res,next){
	var messages = req.flash('error');
	res.render('user/signin', {csrfToken: req.csrfToken(),messages: messages,hasErrors: messages.length > 0});
});
router.post('/signin',notLoggedIn,passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash : true
}));

module.exports = router;

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req,res,next){
  if (!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}