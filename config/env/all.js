'use strict';
var fs = require('fs')
var path = require('path');
var rootPath = path.normalize(__dirname + '/../..');
var hskey = fs.readFileSync(rootPath + '/config/certs/server_key.pem');
var hscert = fs.readFileSync(rootPath + '/config/certs/server_cert.pem');
module.exports = {
	root: rootPath,
	port: process.env.PORT || 3000,
	db: process.env.MONGOHQ_URL,
	templateEngine: 'swig',

	// The secret should be set to a non-guessable string that
	// is used to compute a session hash
	sessionSecret: 'MEAN',
	// The name of the MongoDB collection to store sessions in
	sessionCollection: 'sessions',
	httpsKeyOptions : {
		                key: hskey,
		                cert: hscert
		               }
};
