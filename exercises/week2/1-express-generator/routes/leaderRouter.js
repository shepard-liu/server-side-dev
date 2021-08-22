const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(express.json());

leaderRouter.route('/:leaderID')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will serve up leader ID: ' + req.params.leaderID);
    })

    .post((req, res, next) => {
        res.write('A new leader(ID: ' + req.params.leaderID + ') has been added\n');

        if (req.body.name)
            res.write('name of the leader: ' + req.body.name + '\n');
        if (req.body.description)
            res.write('description of the leader: ' + req.body.description + '\n');

        res.end();
    })

    .put((req, res, next) => {
        res.write('The leader(ID:' + req.params.leaderID + ') has been updated.\n');

        if (req.body.name)
            res.write('name of the leader has been updated as: ' + req.body.name + '\n');
        if (req.body.description)
            res.write('description of the leader has been updated as: ' + req.body.description + '\n');

        res.end();
    })

    .delete((req, res, next) => {
        res.end('The leader(ID:' + req.params.leaderID + ') has been deleted.');
    });

leaderRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');
        next();
    })

    .get((req, res, next) => {
        res.end('Will serve up all the leaders');
    })

    .post((req, res, next) => {
        res.statusCode = 400;
        res.end('A leader ID must be specified to create a new leader');
    })

    .put((req, res, next) => {
        res.statusCode = 400;
        res.end('Must explicitly specify the leader ID to update the leader\'s information');
    })

    .delete((req, res, next) => {
        res.statusCode = 400;
        res.end('You don\'t have the permission to delete the directory \'/leaders\'.');
    });

module.exports = leaderRouter;