const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(express.json());

dishRouter.route('/:dishID')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will serve up dish ID: ' + req.params.dishID);
    })

    .post((req, res, next) => {
        res.write('A new dish(ID: ' + req.params.dishID + ') has been added\n');

        if (req.body.name)
            res.write('name of the dish: ' + req.body.name + '\n');
        if (req.body.description)
            res.write('description of the dish: ' + req.body.description + '\n');

        res.end();
    })

    .put((req, res, next) => {
        res.write('The dish(ID:' + req.params.dishID + ') has been updated.\n');

        if (req.body.name)
            res.write('name of the dish has been updated as: ' + req.body.name + '\n');
        if (req.body.description)
            res.write('description of the dish has been updated as: ' + req.body.description + '\n');

        res.end();
    })

    .delete((req, res, next) => {
        res.end('The dish(ID:' + req.params.dishID + ') has been deleted.');
    });

dishRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will serve up all the dishes');
    })

    .post((req, res, next) => {
        res.statusCode = 400;
        res.end('A dish ID must be specified to create a new dish');
    })

    .put((req, res, next) => {
        res.statusCode = 400;
        res.end('Must explicitly specify the dish ID to update the dish\'s information');
    })

    .delete((req, res, next) => {
        res.statusCode = 400;
        res.end('You don\'t have the permission to delete the directory \'/dishes\'.');
    });

module.exports = dishRouter;