var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var products = [
   new Product({
	imagePath: 'https://www.91-img.com/pictures/lenovo-k4-note-mobile-phone-large-1.jpg',
	title: 'Lenovo K4 Note',
	description: 'Lenovo k4 note is awsome phone by lenovo.it costs around 10k and it is an awsome phone',
	price: 10
  }),
  new Product({
	imagePath: 'http://cdn.ndtv.com/tech/xiaomi_redmi_note_3_dark_grey_small.jpg',
	title: 'Redmi Note 3',
	description: 'Yet Another Awsome Phone From Xiaomi.Costs Around 10k,Same Features As k4 Note!!',
	price: 10
  }),
  new Product({
	imagePath: 'https://www.motorola.in/sites/default/files/library/storage/products/smartphones/moto-g4-10003b5a6yku.jpg',
	title: 'Moto g4',
	description: 'Moto G4 from Lenovo,Cost Is Around 13k,Awsome Features,Good For gaming!!',
	price: 12
  }),
  new Product({
	imagePath: 'http://www.three.co.uk/static/images/device_pages/MobileVersion/Apple/iPhone_7_Plus/Black/desktop/1.jpg',
	title: 'Iphone 7 Plus',
	description: 'The Name Says It All',
	price: 20
  })
 ];
 var done = 0;
 for(var i=0;i < products.length;i++){
 	products[i].save(function(err,result){
 		done++;
 		if (done === products.length){
 			exit();
 		}
 	});
 }
function exit(){
	mongoose.disconnect();
}