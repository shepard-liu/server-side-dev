const express = require('express');
const Promotions = require('../model/promotions');
const promoRouter = express.Router();
const authenticate = require('../authenticate');

promoRouter.route('/:promoID')

    .get((req, res, next) => {
        Promotions.findById(req.params.promoID).then((promo) => {
            console.log('Responding with promotion:', promo);
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
            res.statusCode = 200;
        }).catch(err => {
            console.log(`Requested promotion document not found (${req.params.promoID})`);
            next(err);
        });
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST Operation Not Supported with promoID');
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        Promotions.updateOne({ id: req.params.promoID }, req.body).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(result);
        }).catch((err) => {
            req.statusCode = 404;
            req.end('Promotion not founmd')
        });
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.deleteOne({ id: req.params.promoID }).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        })
    });

promoRouter.route('/')

    .get((req, res, next) => {
        Promotions.find({}).then((promos) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promos);
        }).catch((err) => { next(err); });
    })

    .post(authenticate.verifyUser, (req, res, next) => {
        Promotions.create(req.body).then((promo) => {
            console.log('Promotion Posted:', promo);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }).catch((err) => { next(err); });
    })

    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader("Content-Type", "text/plain");
        res.end('A promotion ID must be specified to modify a promotion');
    })

    .delete(authenticate.verifyUser, (req, res, next) => {
        Promotions.deleteMany({}).then((result) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'applcation/json');
            res.json(result);
            console.log('Deleted All Promotions');
        }).catch((err) => { next(err); })
    });

module.exports = promoRouter;