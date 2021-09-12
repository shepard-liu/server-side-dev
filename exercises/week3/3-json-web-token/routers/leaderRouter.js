const express = require('express');
const Leaders = require('../model/leaders');
const leaderRouter = express.Router();
const authenticate = require('../authenticate');

leaderRouter.route('/:leaderID')

    .get((req, res, next) => {
        Leaders.findById(req.params.leaderID).then((leader) => {
            console.log('Responding with leader:', leader);
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
            res.statusCode = 200;
        }).catch(err => {
            console.log(`Requested leader document not found (${req.params.leaderID})`);
            next(err);
        });
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST Operation Not Supported with leaderID');
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        Leaders.updateOne({ id: req.params.leaderID }, req.body).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }).catch((err) => {
            req.statusCode = 404;
            req.end('Leader not founmd')
        });
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Leaders.deleteOne({ id: req.params.leaderID }).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        })
    });

leaderRouter.route('/')

    .get((req, res, next) => {
        Leaders.find({}).then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promos);
        }).catch((err) => { next(err); });
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        Leaders.create(req.body).then((leader) => {
            console.log('Leader Posted:', leader);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        }).catch((err) => { next(err); });
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader("Content-Type", "text/plain");
        res.end('A leader ID must be specified to modify a leader');
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Leaders.deleteMany({}).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'applcation/json');
            res.json(result);
            console.log('Deleted All Leaders');
        }).catch((err) => { next(err); })
    });

module.exports = leaderRouter;