'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    res.render('users/signin', {
        title: 'Signin',
        message: req.flash('error')
    });
};

/**
 * Show sign up form
 */
exports.signup = function(req, res) {
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;
    console.log(req.body);
    user.provider = 'local';
    user.group = 'guest';
    user.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('users/signup', {
                message: message,
                user: user
            });
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/');
        });
    });
};
/*exports.update = function(req, res) {
	console.log("Update");
 //   var user = req.user;
  //  console.log(req.body);
 //   user = _.extend(user, req.body);
//   console.log(req.body.user);
/*    user.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors
      //          article: article
            });
        } else {
            res.jsonp(user);
        }
    }); 
    res.jsonp(req.user);
}; */
exports.update = function(req, res) {
   /* User.findOne({"username" : req.body.username}).exec(function(err, user) {
       if (err) {
           res.render('error', {
               status: 500
           });
       } else {
    	   user = _.extend(user, req.body);
    	   user.save(function(err) {
    	        if (err) {
    	        	res.render('error', {
    	                status: 500
    	            });
    	        } else {
    	            res.jsonp(user);
    	        }
    	    }); 
       }
   }); */
	var query = {"username" : req.body.username};
	findUser(query, function(err, user) {
		if (err) {
	           res.render('error', {
	               status: 500
	           });
	       } else {
	    	   user = _.extend(user, req.body);
	    	   user.save(function(err) {
	    	        if (err) {
	    	        	res.render('error', {
	    	                status: 500
	    	            });
	    	        } else {
	    	            res.jsonp(user);
	    	        }
	    	    }); 
	       }
	});
 };
 exports.destroy = function(req, res) {
	//  console.log("Destroy");
	//  console.log(req.query.user);	  
	/*  User.findOne({"_id" : req.query.user}).exec(function(err, user) {
	       if (err) {
	           res.render('error', {
	               status: 500
	           });
	       } else {
	    	   user.remove(function(err) {
	    	        if (err) {
	    	        	res.render('error', {
	    	                status: 500
	    	            });
	    	        } else {
	    	            res.jsonp(user);
	    	        }
	    	    }); 
	       };
	  }); */
	 var query = {"_id" : req.query.user};
	 findUser(query, function(err, user) {
			if (err) {
		           res.render('error', {
		               status: 500
		           });
		       } else {
		    	   user = _.extend(user, req.body);
		    	   user.remove(function(err) {
		    	        if (err) {
		    	        	res.render('error', {
		    	                status: 500
		    	            });
		    	        } else {
		    	            res.jsonp(user);
		    	        }
		    	    }); 
		       }
		});
	};
/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};
exports.all = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};
/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};

var findUser = function(query, func)
{
	 User.findOne(query).exec(func);
};