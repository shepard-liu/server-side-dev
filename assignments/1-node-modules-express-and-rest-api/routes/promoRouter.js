const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(express.json());

promoRouter.route('/:promoID')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will serve up promotion ID: ' + req.params.promoID);
    })

    .post((req, res, next) => {
        res.write('A new promotion(ID: ' + req.params.promoID + ') has been added\n');

        if (req.body.name)
            res.write('name of the promotion: ' + req.body.name + '\n');
        if (req.body.description)
            res.write('description of the promotion: ' + req.body.description + '\n');

        res.end();
    })

    .put((req, res, next) => {
        res.write('The promotion(ID:' + req.params.promoID + ') has been updated.\n');

        if (req.body.name)
            res.write('name of the promotion has been updated as: ' + req.body.name + '\n');
        if (req.body.description)
            res.write('description of the promotion has been updated as: ' + req.body.description + '\n');

        res.end();
    })

    .delete((req, res, next) => {
        res.end('The promotion(ID:' + req.params.promoID + ') has been deleted.');
    });

promoRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will serve up all the promotions');
    })

    .post((req, res, next) => {
        res.statusCode = 400;
        res.end('A promotion ID must be specified to create a new promotion');
    })

    .put((req, res, next) => {
        res.statusCode = 400;
        res.end('Must explicitly specify the promotion ID to update the promotion\'s information');
    })

    .delete((req, res, next) => {
        res.statusCode = 400;
        res.end('You don\'t have the permission to delete the directory \'/promotions\'.');
    });

module.exports = promoRouter;