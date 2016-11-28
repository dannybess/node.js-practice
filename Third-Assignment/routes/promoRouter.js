var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Promotions = require('../models/promotions');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get(Verify.verifyOrdinaryUser, getPromos)
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, createPromo)
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, deletePromos);

promoRouter.route('/:promoId')
    .get(Verify.verifyOrdinaryUser, getPromo)
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, updatePromo)
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, deletePromo);

function getPromos(req, res, next) {
    Promotions.find({}, function (err, promo) {
        if (err) {
            return next(err);
        }
        res.json(promo);
    });
}

function createPromo(req, res, next) {
    Promotions.create(req.body, function (err, promo) {
        if (err) {
            return next(err);
        }
        console.log('Promo created!');
        var id = promo._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotion with id: ' + id);
    });
}

function deletePromos(req, res, next) {
    Promotions.remove({}, function (err, resp) {
        if (err) {
            return next(err);
        }
        res.json(resp);
    });
}

function getPromo(req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) {
            return next(err);
        }
        res.json(promo);
    });
}

function updatePromo(req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promo) {
        if (err) {
            return next(err);
        }
        res.json(promo);
    });
}

function deletePromo(req, res, next) {
    Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {
        if (err) {
            return next(err);
        }
        res.json(resp);
    });
}

module.exports = promoRouter;
