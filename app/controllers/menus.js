var mongoose = require('mongoose'),
    Menu = mongoose.model('Menu');
    
exports.all = function(req, res) {
	Menu.find({"groups" : req.user.group}, function(err, menus) {
	        if (err) {
	            res.render('error', {
	                status: 500
	            });
	        } else {
	        	console.log(menus);
	            res.jsonp(menus);
	        }
	    });
};