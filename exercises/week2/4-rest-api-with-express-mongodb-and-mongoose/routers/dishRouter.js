var express = require('express');
var Dishes = require('../model/dishes');
var dishRouter = express.Router();

dishRouter.route("/")

  .get((req, res, next) => {
    Dishes.find({}).then((dishes) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dishes);
    }).catch((err) => {
      console.log(err);
      next(err);
    })
  })

  .put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT Operation not supported');
  })

  .post((req, res, next) => {
    Dishes.create(req.body).then((dish) => {
      console.log('Dishes Created: ', dish);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dish);
    }).catch(err => {
      console.log(err);
      next(err);
    })
  })

  .delete((req, res, next) => {
    Dishes.remove({}).then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
    }).catch(err => next(err));
  });

dishRouter.route('/:dishId')

  .get((req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  })

  .post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
  })

  .put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishId, {
      $set: req.body
    }, { new: true })
      .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
      }, (err) => next(err))
      .catch((err) => next(err));
  })

  .delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

module.exports = dishRouter;