// list dependencies
var express = require('express');
var router = express.Router();

// add db & model dependencies
var mongoose = require('mongoose');
var Buisness = require('../models/buisness');

var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');

// interpret GET /products - show product listing */
router.get('/companys', function (req, res, next) {

    // retrieve all products using the product model; returns either an error or list of products
    Buisness.find(function (err, companys) {
        // if we have an error
        if (err) {
            res.render('error', { error: err });
        }
        else {
            // no error, show the views/products.jade and pass the query results to that view
            res.render('companys', { companys: companys });
            console.log(companys);
        }
    });
});

// GET intepret GET /products/edit/:id - show single product edit form */
router.get('/companys/edit/:id', function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the product model to look up the product with this id    
    Buisness.findById(id, function (err, buisness) {
        if (err) {
            res.send('Buisness ' + id + ' not found');
        }
        else {
            res.render('edit', { buisness: buisness });
        }
    });
});

// POST /products/edit/:id - update selected product */
router.post('/companys/edit/:id', function (req, res, next) {
    var id = req.body.id;

    var buisness = {
        _id: req.body.id,
        company: req.body.company,
        category: req.body.category,
        number: req.body.number
    };

    Buisness.update({ _id: id}, buisness, function(err) {
        if (err) {
            res.send('Buisness ' + req.body.id + ' not updated. Error: ' + err);
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/companys');
            res.end();
        }
    });
});

// GET /products/add - show product input form
router.get('/companys/add', function (req, res, next) {
    res.render('add');
});

// POST /products/add - save new product
router.post('/companys/add', function (req, res, next) {

    // use the Product model to insert a new product
    Buisness.create({
        company: req.body.company,
        category: req.body.category,
        number: req.body.number
    }, function (err, Buisness) {
        if (err) {
            console.log(err);
            res.render('error', { error: err }) ;
        }
        else {
            console.log('Buisness saved ' + Buisness);
            res.render('added', { buisness: Buisness.company });
        }
    });
});

// API GET products request handler
router.get('/api/companys', function (req, res, next) {
    Buisness.find(function (err, companys) {
        if (err) {
            res.send(err);
        } 
        else {
            res.send(companys);
        }
    });
});

// API to GET individual buisness' based on their given id
router.get('/companys/indiv/:id', function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the product model to look up the product with this id    
    Buisness.findById(id, function (err, buisness) {
        if (err) {
            res.send('Buisness ' + id + ' not found');
        }
        else {
            res.render('indiv', { buisness: buisness });
        }
    });
});
  
/* GET product delete request - : indicates id is a variable */    
router.get('/companys/delete/:id', function (req, res, next) {
    //store the id from the url into a variable
    var id = req.params.id;

    //use our product model to delete
    Buisness.remove({ _id: id }, function (err, buisness) {
        if (err) {
            res.send('Buisness ' + id + ' not found');
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/companys');
            res.end();
        }
    });
});

// make controller public
module.exports = router;
